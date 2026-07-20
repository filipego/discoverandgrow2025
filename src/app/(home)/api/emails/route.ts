import { NextResponse } from "next/server";
import { Resend } from 'resend';
import ContactFormEmail from '@/emails/ContactFormEmail';
import ContactFormNotificationEmail from '@/emails/ContactFormNotificationEmail';
import NewsletterFormEmail from '@/emails/NewsletterFormEmail';
import NewsletterFormNotificationEmail from '@/emails/NewsletterFormNotificationEmail';
import DynamicFormEmail from '@/emails/DynamicFormEmail';
import DynamicThankYouEmail from '@/emails/DynamicThankYouEmail';
import { getEmailLogoUrl } from '@/lib/emailBranding';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body;
    const logoUrl = getEmailLogoUrl(process.env.NEXT_PUBLIC_SITE_URL);

    if (type === 'contact') {
      try {
        // Send thank you email to the user
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'info@discoverandgrow.org', // Changed for testing
          subject: 'Thank you for contacting us',
          react: ContactFormEmail()
        });

        // Send notification email to admin
        const adminEmail = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'info@discoverandgrow.org', // Changed for testing
          subject: 'New Contact Form Submission',
          react: ContactFormNotificationEmail({
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message
          })
        });
        console.log('Admin email sent:', adminEmail);
      } catch (emailError) {
        console.error('Error sending contact emails:', emailError);
        return NextResponse.json({ error: String(emailError) }, { status: 500 });
      }
    }

    if (type === 'newsletter') {
      // Send welcome email to subscriber
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'info@discoverandgrow.org', // Changed for testing
        subject: 'Welcome to our newsletter',
        react: NewsletterFormEmail({ logoUrl })
      });

      // Send notification email to admin
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'info@discoverandgrow.org', // Changed for testing
        subject: 'New Newsletter Subscription',
        react: NewsletterFormNotificationEmail({
          email: data.email,
          logoUrl,
        })
      });
    }

    if (type === 'dynamic-form') {
      try {
        // Send notification email to admin
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'info@discoverandgrow.org', // Changed for testing
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
            from: 'onboarding@resend.dev',
            to: 'info@discoverandgrow.org', // Changed for testing - in production would be userEmailField.value
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
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
