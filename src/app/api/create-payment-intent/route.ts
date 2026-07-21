import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, metadata, customer_email, customer_name } = await request.json();

    // Validate amount
    if (!amount || amount < 50) { // Minimum $0.50
      return NextResponse.json(
        { error: 'Amount must be at least $0.50' },
        { status: 400 }
      );
    }

    // Create or retrieve customer if email is provided
    let customer;
    if (customer_email) {
      const existingCustomers = await stripe.customers.list({
        email: customer_email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
        customer = await stripe.customers.update(customer.id, {
          ...(customer_name ? { name: customer_name } : {}),
          metadata: {
            source: 'donation_form',
            ...metadata,
          },
        });
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
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency || 'usd',
      customer: customer?.id,
      receipt_email: customer_email,
      metadata: {
        ...metadata,
        source: 'donation_form',
      },
    });

    return NextResponse.json({
      client_secret: paymentIntent.client_secret,
      customer_id: customer?.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
