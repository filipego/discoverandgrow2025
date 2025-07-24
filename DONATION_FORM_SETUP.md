# Donation Form Setup Guide

## 🎯 Overview

This guide covers the complete Stripe donation form implementation for the Discover and Grow website. The donation form supports both one-time and recurring monthly donations with preset amounts and custom amount options.

## 📁 Files Created/Modified

### Components
- `src/slices/DonationForm/DonateForm.tsx` - Main donation form component with Stripe Elements
- `src/slices/DonationForm/index.tsx` - Updated to include Prismic styling components

### API Routes
- `src/app/api/create-payment-intent/route.ts` - Handles one-time payment creation
- `src/app/api/create-subscription/route.ts` - Handles monthly subscription creation
- `src/app/api/customer-portal/route.ts` - Creates Stripe customer portal sessions
- `src/app/api/webhooks/stripe/route.ts` - Handles Stripe webhook events

### Pages
- `src/app/thank-you/page.tsx` - Thank you page for successful donations

### Configuration
- `.env.local` - Updated with correct Stripe environment variable names
- `package.json` - Added Stripe dependencies

## 🔧 Environment Variables

Make sure these environment variables are set in your `.env.local` file:

```env
# Stripe API Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_... # For webhook verification

# Optional: Site URL for customer portal return URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 🚀 Features Implemented

### ✅ Donation Form Features
- **One-time vs Monthly toggle** - Users can choose between one-time donations and monthly subscriptions
- **Preset amounts** - $25, $50, $100, $500, $1,000 buttons
- **Custom amount input** - Users can enter any amount
- **Fee coverage option** - Optional 5% fee coverage checkbox
- **Stripe Elements integration** - Secure card input with real-time validation
- **Success/Error handling** - Proper feedback for users
- **Responsive design** - Works on all device sizes

### ✅ Payment Processing
- **One-time payments** - Using Stripe Payment Intents
- **Recurring subscriptions** - Using Stripe Subscriptions
- **Secure payment processing** - All sensitive operations on server-side
- **Webhook handling** - Proper event processing for payment confirmations

### ✅ User Experience
- **In-form success state** - Thank you message within the form
- **Dedicated thank you page** - `/thank-you` route for post-payment experience
- **Error handling** - Clear error messages for failed payments
- **Loading states** - Visual feedback during processing

## 📋 Setup Instructions

### 1. Install Dependencies
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js stripe
```

### 2. Configure Stripe Dashboard
1. **Create/Configure Products**: Set up donation products in your Stripe dashboard
2. **Enable Customer Portal**: Configure the customer portal for subscription management
3. **Set up Webhooks**: Add webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Required events: `payment_intent.succeeded`, `invoice.payment_succeeded`, `customer.subscription.*`

### 3. Environment Variables
Update your `.env.local` file with the Stripe keys from your dashboard.

### 4. Test the Implementation
1. Use Stripe test cards for testing:
   - Success: `4242424242424242`
   - Decline: `4000000000000002`
2. Test both one-time and monthly donation flows
3. Verify webhook events are received

## 🎨 Design Implementation

The donation form matches the provided design with:
- **Header image** - Warm illustration of mother and child reading
- **Clean white card design** - Rounded corners with shadow
- **Toggle buttons** - One-time vs Monthly selection
- **Amount grid** - 3-column layout for preset amounts
- **Custom styling** - Matches brand colors and typography
- **Accessibility** - Proper ARIA labels and keyboard navigation

## 🔗 Payment Flow Pages

### Primary Flow
1. **Donation Form** - Embedded in Prismic slice (`/donate` or any page with DonationForm slice)
2. **In-form Success** - Success state within the form component
3. **Thank You Page** - `/thank-you` (optional redirect)

### Management Flow
1. **Customer Portal** - Stripe-hosted portal for subscription management
   - Accessible via API call to `/api/customer-portal`
   - Allows users to cancel subscriptions, update payment methods

## 🛡️ Security Considerations

- **Server-side processing** - All Stripe operations happen on the server
- **Webhook verification** - Stripe webhook signatures are verified
- **Environment variables** - Sensitive keys are stored securely
- **Input validation** - Amount and form data is validated
- **Error handling** - Graceful error handling without exposing sensitive data

## 📧 Email Integration

The current implementation uses Stripe's built-in email receipts. For custom emails:

1. **Webhook Integration** - Use the webhook handler to trigger custom emails
2. **Resend Integration** - Already available in the project for custom email sending
3. **Email Templates** - Create branded thank you email templates

## 🔄 Subscription Management

Users can manage their monthly donations through:

1. **Stripe Customer Portal** - Full-featured portal for subscription management
2. **API Integration** - Custom subscription management UI (future enhancement)

## 🧪 Testing

### Test Cards
- **Successful payment**: `4242424242424242`
- **Declined payment**: `4000000000000002`
- **Requires authentication**: `4000002500003155`

### Test Scenarios
1. One-time donation with preset amount
2. One-time donation with custom amount
3. Monthly subscription with fee coverage
4. Failed payment handling
5. Subscription cancellation via customer portal

## 🚀 Deployment Notes

1. **Environment Variables** - Ensure all Stripe keys are set in production
2. **Webhook Endpoint** - Configure webhook URL in Stripe dashboard
3. **HTTPS Required** - Stripe requires HTTPS in production
4. **Domain Verification** - Verify domain in Stripe dashboard if needed

## 📞 Support

For questions about donations, users can contact: `donations@discoverandgrow.org`

---

**Note**: Remember to switch from test keys to live keys when deploying to production!