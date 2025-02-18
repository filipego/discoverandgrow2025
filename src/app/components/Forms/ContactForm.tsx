'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/app/components/Forms/ui/Input";
import { Label } from "@/app/components/Forms/ui/Label";
import { Button } from "@/app/components/Forms/ui/Button";
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const { register, handleSubmit, formState: { errors, isValid, touchedFields }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched"  // Changed from "onChange" to "onTouched"
  });

  // ... then in the message field JSX:
  <div>
    <Label htmlFor="message">Message</Label>
    <Input
      {...register("message")}
      multiline
      rows={4}
      placeholder="Your message"
    />
    {touchedFields.message && errors.message && (
      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
    )}
  </div>

  // Add at the top after imports
  const FORM_MESSAGES = {
    SUCCESS: 'Thank you for your message. We will get back to you soon!'
  } as const;

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setMessage(null);
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          data
        }),
      });
      
      if (response.ok) {
        setMessage({ type: 'success', text: FORM_MESSAGES.SUCCESS });
        reset();
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md mx-auto">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          {...register("name")}
          type="text"
          placeholder="Your name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email")}
          type="email"
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          {...register("phone")}
          type="tel"
          placeholder="Your phone number"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Input
          {...register("message")}
          multiline
          rows={4}
          placeholder="Your message"
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
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
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </form>
  );
}