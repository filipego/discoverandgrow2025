export type DonationType = "one-time" | "monthly";

export interface DonationAcknowledgmentDetails {
  firstName: string;
  email: string;
  amount: string;
  date: string;
  transactionId: string;
  donationType: DonationType;
  receiptUrl?: string;
}

type MetadataOwner = {
  metadata?: Record<string, string> | null;
};

type InvoiceSummary = {
  billing_reason?: string | null;
};

const SENT_MARKER = "donation_thank_you_email_sent";

export function isEligibleOneTimeDonation(
  paymentIntent: MetadataOwner,
): boolean {
  return (
    paymentIntent.metadata?.donation_type === "one-time" &&
    paymentIntent.metadata?.[SENT_MARKER] !== "true"
  );
}

export function isEligibleInitialMonthlyInvoice(
  invoice: InvoiceSummary,
  subscription: MetadataOwner,
): boolean {
  return (
    invoice.billing_reason === "subscription_create" &&
    subscription.metadata?.[SENT_MARKER] !== "true"
  );
}

export function formatDonationAmount(
  amountInSmallestUnit: number,
  currency: string,
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amountInSmallestUnit / 100);
}

export function formatDonationDate(unixSeconds: number): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(unixSeconds * 1000));
}
