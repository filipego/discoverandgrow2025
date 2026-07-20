import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rateLimit";
import {
  getDynamicThankYouContent,
  type SubmittedFormField,
} from "@/lib/dynamicFormSubmission";
import DynamicFormEmail from "@/emails/DynamicFormEmail";
import DynamicThankYouEmail from "@/emails/DynamicThankYouEmail";
import { getEmailLogoUrl } from "@/lib/emailBranding";

const resend = new Resend(process.env.RESEND_API_KEY);
const DEFAULT_ADMIN_EMAIL = "info@discoverandgrow.org";
const DEFAULT_FROM = "Discover and Grow <onboarding@resend.dev>";

function getTestRecipient(): string | undefined {
  return (
    process.env.FORM_TEST_RECIPIENT ||
    (process.env.NODE_ENV === "production" ? undefined : DEFAULT_ADMIN_EMAIL)
  );
}

async function sendEmail(
  options: Parameters<typeof resend.emails.send>[0],
): Promise<void> {
  const { data, error } = await resend.emails.send(options);

  if (error || !data?.id) {
    throw new Error(error?.message || "Resend did not return an email ID");
  }
}

function findUserEmail(formData: SubmittedFormField[]): string | undefined {
  const emailField = formData.find(
    (field) =>
      field.type === "email" || field.label.toLowerCase().includes("email"),
  );

  return emailField?.value?.trim() || undefined;
}

export async function POST(request: NextRequest) {
  try {
    const {
      formData,
      formTitle,
      notificationEmail,
      thankYouContent,
      turnstileToken,
      timestamp,
    } = await request.json();

    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip.toString(), 5)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    if (turnstileToken) {
      const turnstileResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: turnstileToken,
            remoteip: ip,
          }),
        },
      );

      const result = await turnstileResponse.json();
      if (!result.success) {
        return NextResponse.json(
          { error: "Security verification failed. Please try again." },
          { status: 400 },
        );
      }
    }

    if (timestamp && Date.now() - timestamp < 2000) {
      return NextResponse.json(
        { error: "Form submitted too quickly. Please try again." },
        { status: 400 },
      );
    }

    if (
      !Array.isArray(formData) ||
      !formTitle ||
      !formData.every(
        (field) =>
          field &&
          typeof field.label === "string" &&
          typeof field.value === "string" &&
          typeof field.type === "string",
      )
    ) {
      return NextResponse.json(
        { error: "Invalid form data." },
        { status: 400 },
      );
    }

    const submittedAt = new Date().toLocaleString();
    const testRecipient = getTestRecipient();
    const adminRecipient = testRecipient || notificationEmail || DEFAULT_ADMIN_EMAIL;
    const logoUrl = getEmailLogoUrl(process.env.NEXT_PUBLIC_SITE_URL);

    await sendEmail({
      from: process.env.FORMS_EMAIL_FROM || DEFAULT_FROM,
      to: adminRecipient,
      replyTo: "info@discoverandgrow.org",
      subject: `New ${formTitle} Submission`,
      react: DynamicFormEmail({
        formTitle,
        formData,
        submittedAt,
        userIP: ip.toString(),
        logoUrl,
      }),
    });

    const userEmail = findUserEmail(formData);

    if (userEmail) {
      const nameField = formData.find((field) =>
        field.label.toLowerCase().includes("name"),
      );
      const thankYouRecipient = testRecipient || userEmail;

      await sendEmail({
        from: process.env.FORMS_EMAIL_FROM || DEFAULT_FROM,
        to: thankYouRecipient,
        replyTo: "info@discoverandgrow.org",
        subject: `Thank you for your ${formTitle.toLowerCase()} submission`,
        react: DynamicThankYouEmail({
          thankYouContent: getDynamicThankYouContent(thankYouContent),
          recipientName: nameField?.value,
          formTitle,
          logoUrl,
        }),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully!",
    });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}
