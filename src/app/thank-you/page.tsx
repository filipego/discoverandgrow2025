import React from 'react';
import { Bounded } from '@/app/components/Bounded';
import { Heading } from '@/app/components/Heading';
import Link from 'next/link';

const ThankYouPage: React.FC = () => {
  return (
    <Bounded padding="bigger padding">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Thank You Message */}
        <Heading className="mb-6">Thank You for Your Donation!</Heading>
        
        <div className="space-y-4 text-lg text-gray-600 mb-8">
          <p>
            Your generous contribution helps us continue our mission to make a positive impact in our community.
          </p>
          <p>
            You should receive a confirmation email shortly with your donation receipt.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            Return Home
          </Link>
          <Link
            href="/what-we-do"
            className="border-2 border-black text-black px-8 py-3 rounded-lg hover:bg-black hover:text-white transition-colors font-semibold"
          >
            Learn More About Our Work
          </Link>
        </div>

        {/* Additional Information */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            What happens next?
          </h3>
          <div className="space-y-3 text-gray-600">
            <p>• You'll receive an email confirmation with your donation receipt</p>
            <p>• Your donation will be processed within 1-2 business days</p>
            <p>• If you signed up for monthly donations, you'll be charged on the same date each month</p>
            <p>• You can manage your recurring donations anytime through your Stripe customer portal</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Questions about your donation? Contact us at{' '}
            <a href="mailto:donations@discoverandgrow.org" className="text-black hover:underline">
              donations@discoverandgrow.org
            </a>
          </p>
        </div>
      </div>
    </Bounded>
  );
};

export default ThankYouPage;