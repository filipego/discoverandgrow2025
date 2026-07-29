'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/app/components/Forms/ui/Input";
import { Label } from "@/app/components/Forms/ui/Label";
import { Button } from "@/app/components/Forms/ui/Button";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState } from 'react';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const FORM_MESSAGES = {
  SUCCESS: 'Thank you for subscribing to our newsletter!',
  DUPLICATE: 'This email is already subscribed to our newsletter.',
  SUBSCRIPTION_ERROR: 'Unable to add your email to our newsletter. Please try again later.',
  EMAIL_ERROR: 'Unable to send confirmation email. Please try again later.',
  CAPTCHA_ERROR: 'We couldn\'t complete the security check. Please try again.'
} as const;

type FormData = z.infer<typeof formSchema>;

type NewsletterFormProps = {
  hideLabel?: boolean;
  inputId?: string;
};

export default function NewsletterForm({
  hideLabel = false,
  inputId,
}: NewsletterFormProps) {
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [isCaptchaVerifying, setIsCaptchaVerifying] = useState(false);
  const turnstileRef = useRef<TurnstileInstance | undefined>(undefined);
  const pendingSubmission = useRef<FormData | null>(null);
  
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  });

  const submitNewsletter = async (data: FormData, captchaToken: string) => {
    try {
      setIsLoading(true);
      setMessage(null);

      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'newsletter',
          data,
          turnstileToken: captchaToken,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        const text = response.status === 409
          ? FORM_MESSAGES.DUPLICATE
          : result?.error ?? FORM_MESSAGES.EMAIL_ERROR;

        setMessage({ type: 'error', text });
        return;
      }

      setMessage({ type: 'success', text: FORM_MESSAGES.SUCCESS });
      reset();
    } catch {
      setMessage({ type: 'error', text: FORM_MESSAGES.SUBSCRIPTION_ERROR });
    } finally {
      setIsLoading(false);
      setTurnstileToken('');
      turnstileRef.current?.reset();
    }
  };

  const handleTurnstileSuccess = (token: string) => {
    setTurnstileToken(token);
    setIsCaptchaVerifying(false);

    const pendingData = pendingSubmission.current;
    if (pendingData) {
      pendingSubmission.current = null;
      void submitNewsletter(pendingData, token);
    }
  };

  const handleTurnstileError = () => {
    pendingSubmission.current = null;
    setIsCaptchaVerifying(false);
    setTurnstileToken('');
    setMessage({ type: 'error', text: FORM_MESSAGES.CAPTCHA_ERROR });
  };

  const onSubmit = async (data: FormData) => {
    if (turnstileToken) {
      await submitNewsletter(data, turnstileToken);
      return;
    }

    if (turnstileRef.current && !isCaptchaVerifying) {
      pendingSubmission.current = data;
      setIsCaptchaVerifying(true);
      turnstileRef.current.execute();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md mx-auto relative">
      <div>
        {!hideLabel && <Label htmlFor={inputId ?? "email"}>Email</Label>}
        <Input
          {...register("email")}
          id={inputId ?? "email"}
          type="email"
          placeholder="your@email.com"
          className={
            inputId === "newsletter-email"
              ? "focus:ring-brand-green focus:ring-offset-2 focus:ring-offset-[#29285D]"
              : undefined
          }
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {message && (
        <div className="my-4">
          <p className={`text-sm font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
            {message.text}
          </p>
        </div>
      )}

      <Turnstile
        ref={turnstileRef}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={handleTurnstileSuccess}
        onError={handleTurnstileError}
        options={{
          size: 'invisible',
          execution: 'execute',
          appearance: 'interaction-only',
        }}
      />

      <div className="flex justify-start">
        <Button
          type="submit"
          isValid={isValid}
          disabled={isLoading || isCaptchaVerifying}
        >
          {isLoading ? 'Subscribing...' : isCaptchaVerifying ? 'Verifying...' : 'Subscribe'}
        </Button>
      </div>
    </form>
  );
}
