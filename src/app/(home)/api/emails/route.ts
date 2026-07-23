import { NextResponse } from "next/server";
import { Resend } from 'resend';
import NewsletterFormEmail from '@/emails/NewsletterFormEmail';
import NewsletterFormNotificationEmail from '@/emails/NewsletterFormNotificationEmail';
import DynamicFormEmail from '@/emails/DynamicFormEmail';
import DynamicThankYouEmail from '@/emails/DynamicThankYouEmail';
import { getEmailLogoUrl } from '@/lib/emailBranding';

const resend = new Resend(process.env.RESEND_API_KEY);
const DEFAULT_ADMIN_EMAIL = "info@discoverandgrow.org";
const DEFAULT_FROM = "Discover and Grow <info@discoverandgrow.org>";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

const isDuplicateContactError = (error: { message?: string; statusCode?: number | null }) =>
  error.statusCode === 409 || /already exists|duplicate/i.test(error.message ?? "");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body;
    const logoUrl = getEmailLogoUrl(process.env.NEXT_PUBLIC_SITE_URL);

    if (type === 'newsletter') {
      const email = typeof data?.email === 'string' ? data.email.trim().toLowerCase() : '';
      const newsletterSegmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;

      if (!EMAIL_PATTERN.test(email)) {
        return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
      }

      if (!newsletterSegmentId) {
        console.error('Missing RESEND_NEWSLETTER_SEGMENT_ID');
        return NextResponse.json(
          { error: 'Unable to add your email to our newsletter. Please try again later.' },
          { status: 500 },
        );
      }

      const { error: contactError } = await resend.contacts.create({
        email,
        segments: [{ id: newsletterSegmentId }],
      });

      if (contactError) {
        if (isDuplicateContactError(contactError)) {
          return NextResponse.json(
            { error: 'This email is already subscribed to our newsletter.' },
            { status: 409 },
          );
        }

        console.error('Unable to create newsletter contact:', contactError);
        return NextResponse.json(
          { error: 'Unable to add your email to our newsletter. Please try again later.' },
          { status: 502 },
        );
      }

      const { error: welcomeEmailError } = await resend.emails.send({
        from: DEFAULT_FROM,
        to: email,
        replyTo: DEFAULT_ADMIN_EMAIL,
        subject: 'Welcome to our newsletter',
        react: NewsletterFormEmail({ logoUrl })
      });

      if (welcomeEmailError) {
        console.error('Unable to send newsletter welcome email:', welcomeEmailError);
        return NextResponse.json(
          { error: 'Unable to send confirmation email. Please try again later.' },
          { status: 502 },
        );
      }

      const { error: notificationEmailError } = await resend.emails.send({
        from: DEFAULT_FROM,
        to: DEFAULT_ADMIN_EMAIL,
        replyTo: DEFAULT_ADMIN_EMAIL,
        subject: 'New Newsletter Subscription',
        react: NewsletterFormNotificationEmail({
          email,
          logoUrl,
        })
      });

      if (notificationEmailError) {
        console.error('Unable to send newsletter notification email:', notificationEmailError);
        return NextResponse.json(
          { error: 'Unable to send confirmation email. Please try again later.' },
          { status: 502 },
        );
      }
    }

    if (type === 'dynamic-form') {
      try {
        // Send notification email to admin
        await resend.emails.send({
          from: DEFAULT_FROM,
          to: DEFAULT_ADMIN_EMAIL,
          replyTo: DEFAULT_ADMIN_EMAIL,
          subject: `New ${data.formTitle} Submission`,
          react: DynamicFormEmail({ 
            formTitle: data.formTitle,
            formData: data.formData,
            submittedAt: new Date().toLocaleString(),
            userIP: data.userIP
          })
        });

        // Send thank you email to user (if email field exists)
        const userEmailField = data.formData.find((field: { type?: string; label?: string; value?: string }) =>
          field.type === 'email' || 
          field.label?.toLowerCase().includes('email')
        );
        
        if (userEmailField?.value && data.thankYouContent) {
          // Try to find name field for personalization
          const nameField = data.formData.find((field: { label?: string; value?: string }) =>
            field.label?.toLowerCase().includes('name') ||
            field.label?.toLowerCase().includes('first')
          );

          await resend.emails.send({
            from: DEFAULT_FROM,
            to: userEmailField.value,
            replyTo: DEFAULT_ADMIN_EMAIL,
            subject: `Thank you for your ${data.formTitle.toLowerCase()} submission`,
            react: DynamicThankYouEmail({ 
              thankYouContent: data.thankYouContent,
              recipientName: nameField?.value,
              formTitle: data.formTitle
            })
          });
        }
      } catch (emailError) {
        console.error('Error sending dynamic form emails:', emailError);
        return NextResponse.json({ error: String(emailError) }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Main error:', error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
