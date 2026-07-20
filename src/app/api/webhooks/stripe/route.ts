import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  formatDonationAmount,
  formatDonationDate,
  isEligibleInitialMonthlyInvoice,
  isEligibleOneTimeDonation,
} from "@/lib/donationAcknowledgment";
import { sendDonationThankYouEmail } from "@/lib/sendDonationThankYouEmail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

function getResourceId(
  resource: string | { id: string } | null | undefined,
): string | null {
  if (!resource) return null;
  return typeof resource === "string" ? resource : resource.id;
}

async function getCustomer(
  customerReference: string | Stripe.Customer | Stripe.DeletedCustomer | null,
): Promise<Stripe.Customer | null> {
  if (!customerReference) return null;

  const customer =
    typeof customerReference === "string"
      ? await stripe.customers.retrieve(customerReference)
      : customerReference;

  return customer.deleted ? null : customer;
}

function getFirstName(metadata: Stripe.Metadata, customer: Stripe.Customer | null) {
  return (
    metadata.donor_first_name ||
    customer?.name?.trim().split(/\s+/)[0] ||
    "Friend"
  );
}

async function acknowledgeOneTimeDonation(paymentIntentId: string) {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
    expand: ["latest_charge"],
  });

  if (!isEligibleOneTimeDonation(paymentIntent)) return;

  const customer = await getCustomer(paymentIntent.customer);
  const email = paymentIntent.metadata.donor_email || customer?.email;

  if (!email) {
    console.warn(
      `Donation acknowledgment skipped for ${paymentIntent.id}: no donor email`,
    );
    return;
  }

  const latestCharge =
    typeof paymentIntent.latest_charge === "string"
      ? null
      : paymentIntent.latest_charge;

  await sendDonationThankYouEmail(
    {
      firstName: getFirstName(paymentIntent.metadata, customer),
      email,
      amount: formatDonationAmount(
        paymentIntent.amount_received || paymentIntent.amount,
        paymentIntent.currency,
      ),
      date: formatDonationDate(paymentIntent.created),
      transactionId: paymentIntent.id,
      donationType: "one-time",
      receiptUrl: latestCharge?.receipt_url || undefined,
    },
    `donation-thank-you/payment-intent/${paymentIntent.id}`,
  );

  await stripe.paymentIntents.update(paymentIntent.id, {
    metadata: { donation_thank_you_email_sent: "true" },
  });
}

async function acknowledgeInitialMonthlyDonation(invoice: Stripe.Invoice) {
  if (invoice.billing_reason !== "subscription_create") return;

  const invoiceId = invoice.id;
  const subscriptionReference =
    invoice.parent?.subscription_details?.subscription;
  const subscriptionId = getResourceId(subscriptionReference);

  if (!invoiceId || !subscriptionId) return;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  if (!isEligibleInitialMonthlyInvoice(invoice, subscription)) return;

  const customer = await getCustomer(invoice.customer);
  const email =
    subscription.metadata.donor_email || invoice.customer_email || customer?.email;

  if (!email) {
    console.warn(
      `Donation acknowledgment skipped for ${invoiceId}: no donor email`,
    );
    return;
  }

  await sendDonationThankYouEmail(
    {
      firstName: getFirstName(subscription.metadata, customer),
      email,
      amount: formatDonationAmount(invoice.amount_paid, invoice.currency),
      date: formatDonationDate(
        invoice.status_transitions.paid_at || invoice.created,
      ),
      transactionId: invoiceId,
      donationType: "monthly",
      receiptUrl:
        invoice.hosted_invoice_url || invoice.invoice_pdf || undefined,
    },
    `donation-thank-you/invoice/${invoiceId}`,
  );

  await stripe.subscriptions.update(subscription.id, {
    metadata: { donation_thank_you_email_sent: "true" },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No signature found" },
        { status: 400 },
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
      console.error("Webhook signature verification failed:", error);
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 },
      );
    }

    switch (event.type) {
      case "payment_intent.succeeded": {
        await acknowledgeOneTimeDonation(event.data.object.id);
        break;
      }

      case "invoice.payment_succeeded": {
        await acknowledgeInitialMonthlyDonation(event.data.object);
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}
