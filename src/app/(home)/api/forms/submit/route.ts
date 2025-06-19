import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit } from '@/lib/rateLimit';
import DynamicFormEmail from '@/emails/DynamicFormEmail';
import DynamicThankYouEmail from '@/emails/DynamicThankYouEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { 
      formData, 
      formTitle,
      notificationEmail,
      thankYouContent,
      turnstileToken,
      timestamp 
    } = await request.json();

    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // 1. Rate limiting check
    if (!checkRateLimit(ip.toString(), 5)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' }, 
        { status: 429 }
      );
    }

    // 2. Verify Turnstile if token provided
    if (turnstileToken) {
      const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: ip
        })
      });
      
      const result = await turnstileResponse.json();
      if (!result.success) {
        return NextResponse.json(
          { error: 'Security verification failed. Please try again.' }, 
          { status: 400 }
        );
      }
    }

    // 3. Time-based check (form filled too quickly = bot)
    if (timestamp) {
      const timeTaken = Date.now() - timestamp;
      if (timeTaken < 2000) { // Less than 2 seconds = suspicious
        return NextResponse.json(
          { error: 'Form submitted too quickly. Please try again.' }, 
          { status: 400 }
        );
      }
    }

    // 4. Basic validation
    if (!formData || !Array.isArray(formData) || !formTitle || !notificationEmail) {
      return NextResponse.json(
        { error: 'Invalid form data.' }, 
        { status: 400 }
      );
    }

    // 5. Store in Supabase (optional - you can add this later)
    // const { supabase } = await import('@/lib/supabase');
    // await supabase.from('form_submissions').insert({
    //   form_title: formTitle,
    //   form_data: formData,
    //   submitted_at: new Date().toISOString(),
    //   ip_address: ip
    // });

    // 6. Send notification email to admin
    const submittedAt = new Date().toLocaleString();
    
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'info@discoverandgrow.org', // Changed for testing
      subject: `New ${formTitle} Submission`,
      react: DynamicFormEmail({ 
        formTitle, 
        formData: formData.map((field: any) => ({ 
          label: field.label, 
          value: field.value, 
          type: field.type 
        })),
        submittedAt,
        userIP: ip.toString()
      })
    });

    // 7. Send thank you email to user (if email field exists)
    const userEmailField = formData.find((field: any) => 
      field.type === 'email' || 
      field.label.toLowerCase().includes('email')
    );
    
    if (userEmailField?.value && thankYouContent) {
      // Try to find name field for personalization
      const nameField = formData.find((field: any) => 
        field.label.toLowerCase().includes('name') ||
        field.label.toLowerCase().includes('first')
      );

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'info@discoverandgrow.org', // Changed for testing - in production would be userEmailField.value
        subject: `Thank you for your ${formTitle.toLowerCase()} submission`,
        react: DynamicThankYouEmail({ 
          thankYouContent,
          recipientName: nameField?.value,
          formTitle
        })
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully!' 
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' }, 
      { status: 500 }
    );
  }
} 