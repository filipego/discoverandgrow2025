'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/app/components/Forms/ui/Input";
import { Label } from "@/app/components/Forms/ui/Label";
import { Button } from "@/app/components/Forms/ui/Button";
import { supabase } from "@/lib/supabase";
import { useState } from 'react';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof formSchema>;

export default function NewsletterForm() {
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setMessage(null);

      // First try to insert into Newsletter table
      const { error: insertError } = await supabase
        .from('Newsletter')
        .insert([{ email: data.email }]);

      // If we get a unique constraint error, it means email already exists
      const FORM_MESSAGES = {
        SUCCESS: 'Thank you for subscribing to our newsletter!',
        DUPLICATE: 'This email is already subscribed to our newsletter.',
        DATABASE_ERROR: 'Unable to add your email to our newsletter. Please try again later.',
        EMAIL_ERROR: 'Unable to send confirmation email. Please try again later.'
      } as const;

      if (insertError?.code === '23505') {
        setMessage({ type: 'error', text: FORM_MESSAGES.DUPLICATE });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setIsLoading(false);
        return;
      }

      if (insertError) {
        setMessage({ type: 'error', text: FORM_MESSAGES.DATABASE_ERROR });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setIsLoading(false);
        return;
      }

      // If insert successful, send welcome email
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'newsletter',
          data
        }),
      });
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Thank you for subscribing to our newsletter!' });
        reset();
        // Auto-hide message after 5 seconds
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md mx-auto relative">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email")}
          type="email"
          placeholder="your@email.com"
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

      <div className="flex justify-start">
        <Button
          type="submit"
          isValid={isValid}
          disabled={isLoading}
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
    </form>
  );
}