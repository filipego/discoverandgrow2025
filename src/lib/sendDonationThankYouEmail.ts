import { Resend } from "resend";
import DonationThankYouEmail from "@/emails/DonationThankYouEmail";
import { getEmailLogoUrl } from "@/lib/emailBranding";
import type { DonationAcknowledgmentDetails } from "./donationAcknowledgment";

const resend = new Resend(process.env.RESEND_API_KEY);

const DEFAULT_FROM = "Discover and Grow <info@discoverandgrow.org>";

export async function sendDonationThankYouEmail(
  details: DonationAcknowledgmentDetails,
  idempotencyKey: string,
): Promise<string> {
  const logoUrl = getEmailLogoUrl(process.env.NEXT_PUBLIC_SITE_URL);

  const { data, error } = await resend.emails.send(
    {
      from: process.env.DONATION_EMAIL_FROM || DEFAULT_FROM,
      to: details.email,
      replyTo: "info@discoverandgrow.org",
      subject: "Thank You for Supporting Discover and Grow 💛",
      react: DonationThankYouEmail({ ...details, logoUrl }),
    },
    { idempotencyKey },
  );

  if (error || !data?.id) {
    throw new Error(error?.message || "Resend did not return an email ID");
  }

  return data.id;
}
