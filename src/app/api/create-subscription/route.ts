import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, payment_method, customer_email, customer_name, metadata } = await request.json();

    // Validate amount
    if (!amount || amount < 50) { // Minimum $0.50
      return NextResponse.json(
        { error: 'Amount must be at least $0.50' },
        { status: 400 }
      );
    }

    // Create or retrieve customer
    let customer;
    if (customer_email) {
      const existingCustomers = await stripe.customers.list({
        email: customer_email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
        // Update customer name if provided and different
        if (customer_name && customer.name !== customer_name) {
          customer = await stripe.customers.update(customer.id, {
            name: customer_name,
          });
        }
      } else {
        customer = await stripe.customers.create({
          email: customer_email,
          name: customer_name,
          metadata: {
            source: 'donation_form',
            ...metadata,
          },
        });
      }
    } else {
      customer = await stripe.customers.create({
        name: customer_name,
        metadata: {
          source: 'donation_form',
          ...metadata,
        },
      });
    }

    // Attach payment method to customer
    await stripe.paymentMethods.attach(payment_method, {
      customer: customer.id,
    });

    // Set as default payment method
    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: payment_method,
      },
    });

    // Create product for donation
    const product = await stripe.products.create({
      name: 'Monthly Donation',
      description: 'Recurring monthly donation to Discover and Grow',
    });

    // Create price for the subscription
    const price = await stripe.prices.create({
      unit_amount: amount,
      currency: currency || 'usd',
      recurring: {
        interval: 'month',
      },
      product: product.id,
    });

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: price.id,
        },
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        ...metadata,
        source: 'donation_form',
        donation_type: 'monthly',
      },
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice & {
      payment_intent: Stripe.PaymentIntent;
    };
    const paymentIntent = invoice.payment_intent;

    return NextResponse.json({
      subscription_id: subscription.id,
      client_secret: paymentIntent?.client_secret,
      customer_id: customer.id,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}