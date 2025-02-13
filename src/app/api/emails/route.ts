import { NextResponse } from "next/server";
import { Resend } from 'resend';
import ContactFormEmail from '@/emails/ContactFormEmail';
import ContactFormNotificationEmail from '@/emails/ContactFormNotificationEmail';
import NewsletterFormEmail from '@/emails/NewsletterFormEmail';
import NewsletterFormNotificationEmail from '@/emails/NewsletterFormNotificationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (type === 'contact') {
      try {
        // Send thank you email to the user
        const userEmail = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'info@discoverandgrow.org', // Changed for testing
          subject: 'Thank you for contacting us',
          react: ContactFormEmail({ ...data })
        });

        // Send notification email to admin
        const adminEmail = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'info@discoverandgrow.org', // Changed for testing
          subject: 'New Contact Form Submission',
          react: ContactFormNotificationEmail({ ...data })
        });
        console.log('Admin email sent:', adminEmail);
      } catch (emailError) {
        console.error('Error sending contact emails:', emailError);
        return NextResponse.json({ error: emailError.message }, { status: 500 });
      }
    }

    if (type === 'newsletter') {
      // Send welcome email to subscriber
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'info@discoverandgrow.org', // Changed for testing
        subject: 'Welcome to our newsletter',
        react: NewsletterFormEmail({ ...data })
      });

      // Send notification email to admin
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'info@discoverandgrow.org', // Changed for testing
        subject: 'New Newsletter Subscription',
        react: NewsletterFormNotificationEmail({ ...data })
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Main error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}