'use client';

import React, { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ImageField, KeyTextField } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { Heading } from '@/app/components/Heading';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type DonationType = 'one-time' | 'monthly';
type FormStep = 'amount' | 'donor-info' | 'payment' | 'confirmation';

interface DonateFormProps {
  image?: ImageField;
  heading?: KeyTextField;
}

interface DonorInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  isAnonymous: boolean;
}

const PRESET_AMOUNTS = [25, 50, 100, 500, 1000];



const CheckoutForm: React.FC<DonateFormProps> = ({ image, heading }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [currentStep, setCurrentStep] = useState<FormStep>('amount');
  const [donationType, setDonationType] = useState<DonationType>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [coverFees, setCoverFees] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showCardElement, setShowCardElement] = useState(false);
  const [minContentHeight, setMinContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const [success, setSuccess] = useState<boolean>(false);
  const [donorInfo, setDonorInfo] = useState<DonorInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    isAnonymous: false
  });

  // Measure content heights and set minimum height to prevent layout shifts
  useEffect(() => {
    if (contentRef.current) {
      const currentHeight = contentRef.current.scrollHeight;
      if (currentHeight > minContentHeight) {
        setMinContentHeight(currentHeight);
      }
    }
  }, [currentStep, showCardElement, success, minContentHeight]);

  // Clear errors when entering payment step and delay CardElement rendering
  useEffect(() => {
    if (currentStep === 'payment') {
      // Immediately clear any existing errors
      setError(null);
      setShowCardElement(false);
      // Delay showing CardElement to prevent automatic focus
      setTimeout(() => {
        setShowCardElement(true);
      }, 200);
    } else {
      setShowCardElement(false);
    }
  }, [currentStep]);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(0);
    }
  };

  const handleDonorInfoChange = (field: keyof DonorInfo, value: string | boolean) => {
    setDonorInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep === 'amount') {
      if (!selectedAmount && !customAmount) {
        setError('Please select or enter an amount');
        return;
      }
      setError(null);
      setCurrentStep('donor-info');
    } else if (currentStep === 'donor-info') {
      if (!donorInfo.firstName || !donorInfo.lastName || !donorInfo.email) {
        setError('Please fill in all required fields');
        return;
      }
      setError(null);
      setCurrentStep('payment');
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 'donor-info') {
      setCurrentStep('amount');
    } else if (currentStep === 'payment') {
      setCurrentStep('donor-info');
    }
    setError(null);
  };



  const getFinalAmount = (): number => {
    const baseAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (coverFees) {
      return Math.round((baseAmount * 1.05) * 100) / 100; // Add 5% for fees
    }
    return baseAmount;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError('Payment system is not ready. Please try again.');
      return;
    }

    setIsProcessing(true);
    setError(null);


    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Payment form is not ready. Please wait a moment and try again.');
      setIsProcessing(false);
      return;
    }

    // Card validation will be handled by Stripe during payment method creation

    const finalAmount = getFinalAmount();
    
    try {
      if (donationType === 'monthly') {
        // Create payment method first for subscriptions
        const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (pmError) {
          setError(pmError.message || 'Failed to create payment method');
          setIsProcessing(false);
          return;
        }

        // Create subscription
        const response = await fetch('/api/create-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round(finalAmount * 100), // Convert to cents
            currency: 'usd',
            payment_method: paymentMethod.id,
            customer_email: donorInfo.email,
            customer_name: `${donorInfo.firstName} ${donorInfo.lastName}`,
            metadata: {
              donation_type: donationType,
              original_amount: customAmount ? parseFloat(customAmount) : selectedAmount,
              covers_fees: coverFees,
              donor_first_name: donorInfo.firstName,
              donor_name: `${donorInfo.firstName} ${donorInfo.lastName}`,
              donor_email: donorInfo.email,
              donor_phone: donorInfo.phone,
              donor_company: donorInfo.company,
              is_anonymous: donorInfo.isAnonymous,
            },
          }),
        });

        const { client_secret } = await response.json();

        // Confirm subscription payment
        const result = await stripe.confirmCardPayment(client_secret);

        if (result.error) {
          setError(result.error.message || 'An error occurred');
        } else {
          setCurrentStep('confirmation');
          setSuccess(true);
        }
      } else {
        // One-time payment
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round(finalAmount * 100), // Convert to cents
            currency: 'usd',
            customer_email: donorInfo.email,
            customer_name: `${donorInfo.firstName} ${donorInfo.lastName}`,
            metadata: {
              donation_type: donationType,
              original_amount: customAmount ? parseFloat(customAmount) : selectedAmount,
              covers_fees: coverFees,
              donor_first_name: donorInfo.firstName,
              donor_name: `${donorInfo.firstName} ${donorInfo.lastName}`,
              donor_email: donorInfo.email,
              donor_phone: donorInfo.phone,
              donor_company: donorInfo.company,
              is_anonymous: donorInfo.isAnonymous,
            },
          }),
        });

        const { client_secret } = await response.json();

        // Confirm payment
        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: cardElement,
          },
        });

        if (result.error) {
          setError(result.error.message || 'An error occurred');
        } else {
          setCurrentStep('confirmation');
          setSuccess(true);
        }
      }
    } catch {
      setError('An error occurred while processing your donation');
    }

    setIsProcessing(false);
  };

  const renderSuccessStep = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h3>
      <p className="text-gray-600 mb-6">Your donation has been processed successfully.</p>
      <button
        type="button"
        onClick={() => {
          setSuccess(false);
          setCurrentStep('amount');
          setSelectedAmount(50);
          setCustomAmount('');
          setCoverFees(true);
          setDonorInfo({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            isAnonymous: false
          });
        }}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Make Another Donation
      </button>
    </div>
  );

  const renderStepIndicator = () => (
    <div className="mb-6">
      <div className="flex items-center justify-center space-x-1 sm:space-x-2">
        {['amount', 'donor-info', 'payment', 'confirmation'].map((step, index) => {
          const stepNames = ['Amount', 'Info', 'Payment', 'Done'];
          const isActive = currentStep === step;
          const isCompleted = ['amount', 'donor-info', 'payment', 'confirmation'].indexOf(currentStep) > index;
          
          return (
            <div key={step} className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                isActive ? 'bg-blue-600 text-white' : 
                isCompleted ? 'bg-green-500 text-white' : 
                'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-1 text-xs font-medium hidden sm:inline ${
                isActive ? 'text-blue-600' : 
                isCompleted ? 'text-green-600' : 
                'text-gray-500'
              }`}>
                {stepNames[index]}
              </span>
              {index < 3 && (
                <ChevronRight className="w-3 h-3 text-gray-400 mx-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAmountStep = () => (
    <div className="space-y-6">
      {/* Donation Type Toggle */}
      <div className="flex justify-center">
        <div className="flex">
          <button
            type="button"
            onClick={() => setDonationType('one-time')}
            className={`rounded-l-lg border-2 px-3 py-1.5 text-[13px] transition-colors lg:px-6 lg:py-2 lg:text-base ${
              donationType === 'one-time'
                ? 'border-black bg-black text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            One time
          </button>
          <button
            type="button"
            onClick={() => setDonationType('monthly')}
            className={`rounded-r-lg border-2 px-3 py-1.5 text-[13px] transition-colors lg:px-6 lg:py-2 lg:text-base ${
              donationType === 'monthly'
                ? 'border-black bg-black text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Amounts Section */}
      <div>
        <h3 className="mb-3 text-base font-semibold text-gray-900 lg:mb-4 lg:text-lg">Amounts</h3>
        
        {/* Preset Amounts */}
        <div className="mb-4 grid grid-cols-5 gap-1.5 lg:gap-2">
          {PRESET_AMOUNTS.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handleAmountSelect(amount)}
              className={`rounded-lg border-2 px-0.5 py-1.5 text-[11px] transition-colors lg:px-2 lg:py-2 lg:text-sm ${
                selectedAmount === amount && !customAmount
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <input
          type="number"
          placeholder="$ Other amount"
          value={customAmount}
          onChange={handleCustomAmountChange}
          min="1"
          step="0.01"
          className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 text-[14px] transition-colors placeholder:text-[14px] focus:border-black focus:outline-none lg:px-4 lg:py-3 lg:text-base lg:placeholder:text-base"
        />
      </div>

      {/* Cover Fees Checkbox */}
      <div>
        <label className="flex cursor-pointer items-center space-x-3">
          <input
            type="checkbox"
            checked={coverFees}
            onChange={(e) => setCoverFees(e.target.checked)}
            className="h-5 w-5 rounded border-2 border-gray-300 text-black focus:ring-2 focus:ring-black"
          />
          <span className="text-sm text-gray-700 lg:text-base">
            Add 5% to help cover fees and administration
          </span>
        </label>
      </div>

      {/* Total Amount Display */}
      <div className="rounded-lg bg-gray-50 px-3 py-3.5 lg:p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-gray-700 lg:text-base">Total Amount:</span>
          <span className="text-lg font-bold text-gray-900 lg:text-xl">
            ${getFinalAmount().toFixed(2)}
          </span>
        </div>
        {coverFees && (
          <div className="text-sm text-gray-500 mt-1">
            Includes 5% to cover processing fees
          </div>
        )}
      </div>
    </div>
  );

  const renderDonorInfoStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={donorInfo.firstName}
            onChange={(e) => handleDonorInfoChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={donorInfo.lastName}
            onChange={(e) => handleDonorInfoChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          value={donorInfo.email}
          onChange={(e) => handleDonorInfoChange('email', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={donorInfo.phone}
            onChange={(e) => handleDonorInfoChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company (Optional)
          </label>
          <input
            type="text"
            value={donorInfo.company}
            onChange={(e) => handleDonorInfoChange('company', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>



      <div>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={donorInfo.isAnonymous}
            onChange={(e) => handleDonorInfoChange('isAnonymous', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">
            Make this donation anonymous
          </span>
        </label>
      </div>
    </div>
  );

  const renderPaymentStep = () => {
    if (!stripe || !elements) {
      return (
        <div className="space-y-6">
          <div className="text-center py-8">
            <div className="text-gray-600">Loading payment form...</div>
          </div>
        </div>
      );
    }
    
    return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Donation Summary</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Amount:</span>
            <span>${(customAmount ? parseFloat(customAmount) : selectedAmount).toFixed(2)}</span>
          </div>
          {coverFees && (
            <div className="flex justify-between">
              <span>Processing Fee:</span>
              <span>+${(getFinalAmount() - (customAmount ? parseFloat(customAmount) : selectedAmount)).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-medium border-t pt-1">
            <span>Total:</span>
            <span>${getFinalAmount().toFixed(2)} {donationType === 'monthly' ? 'per month' : ''}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
        <div className="border-2 border-gray-300 rounded-lg p-4">
          {showCardElement ? (
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#374151',
                    '::placeholder': {
                      color: '#9CA3AF',
                    },
                  },
                },
                hidePostalCode: false,
                disableLink: true,
              }}
              onChange={(event) => {
                // Only clear errors if the card becomes complete
                if (event.complete) {
                  setError(null);
                }
                // Never set any errors in onChange event
              }}
              onBlur={() => {
                // User has interacted with the card field
              }}
              onFocus={() => {
                // Clear any existing errors when user focuses on the field
                setError(null);
              }}
            />
          ) : (
            <div className="text-center py-4 text-gray-500">
              Loading payment form...
            </div>
          )}
        </div>
      </div>
    </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-lg mx-auto overflow-hidden">
      {/* Header Image */}
      {image && (
        <div className="w-full">
          <PrismicNextImage
            field={image}
            className="w-full h-[260px] object-cover"
          />
        </div>
      )}

      <div className="p-4 lg:p-8">
        {/* Title */}
        <Heading as='h3' size='sm' className="mb-6 text-center">
          {heading || 'Thank you for making a change'}
        </Heading>

        {/* Step Indicator */}
        {renderStepIndicator()}

        <form onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Step Content */}
          <div 
            ref={contentRef}
            className="mb-6"
            style={{ minHeight: minContentHeight > 0 ? `${minContentHeight}px` : 'auto' }}
          >
            {success ? renderSuccessStep() : (
              <>
                {currentStep === 'amount' && renderAmountStep()}
                {currentStep === 'donor-info' && renderDonorInfoStep()}
                {currentStep === 'payment' && renderPaymentStep()}
              </>
            )}
          </div>

          {/* Navigation Buttons */}
          {!success && (
            <div className="flex justify-between gap-3 space-x-0 lg:gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 'amount'}
                className={`flex cursor-pointer items-center rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase transition-colors lg:px-5 lg:py-2 lg:text-sm lg:normal-case lg:font-medium ${
                  currentStep === 'amount'
                    ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                    : 'bg-gray-200 text-gray-700 hover:cursor-pointer hover:bg-gray-300'
                }`}
              >
                <ChevronLeft className="mr-1 h-3.5 w-3.5 lg:h-4 lg:w-4" />
                Back
              </button>
              
              {currentStep === 'payment' ? (
                <button
                  type="submit"
                  disabled={isProcessing || !stripe || (!selectedAmount && !customAmount) || !showCardElement}
                  className="flex-1 rounded-full bg-black py-2.5 text-[12px] font-semibold text-white uppercase transition-colors hover:cursor-pointer hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 lg:py-3 lg:text-base lg:normal-case"
                >
                  {isProcessing ? 'Processing...' : !showCardElement ? 'Loading...' : `Donate $${getFinalAmount().toFixed(2)}`}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center rounded-full bg-black px-5 py-1.5 text-[12px] font-semibold text-white uppercase transition-colors hover:cursor-pointer hover:bg-gray-800 lg:px-6 lg:py-2 lg:text-sm lg:normal-case lg:font-medium"
                >
                  Continue
                  <ChevronRight className="ml-1 h-3.5 w-3.5 lg:h-4 lg:w-4" />
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const DonateForm: React.FC<DonateFormProps> = ({ image, heading }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm image={image} heading={heading} />
    </Elements>
  );
};

export default DonateForm;
