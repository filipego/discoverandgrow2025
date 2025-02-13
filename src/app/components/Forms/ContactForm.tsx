'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/app/components/Forms/ui/Input";
import { Label } from "@/app/components/Forms/ui/Label";
import { Button } from "@/app/components/Forms/ui/Button";

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  });

  const onSubmit = async (data: FormData) => {
    try {
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
        console.log('Form submitted successfully');
        reset();
      }
    } catch (error) {
      console.error(error);
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

      <div className="flex justify-start">
        <Button
          type="submit"
          isValid={isValid}
        >
          Send
        </Button>
      </div>
    </form>
  );
}