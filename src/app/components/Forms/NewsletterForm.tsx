'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/app/components/Forms/ui/Input";
import { Label } from "@/app/components/Forms/ui/Label";
import { Button } from "@/app/components/Forms/ui/Button";

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof formSchema>;

export default function NewsletterForm() {
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
          type: 'newsletter',
          data
        }),
      });
      
      if (response.ok) {
        console.log('Newsletter subscription successful');
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md mx-auto">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email")}
          type="email"
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div className="flex justify-start">
        <Button
          type="submit"
          isValid={isValid}
        >
          Subscribe
        </Button>
      </div>
    </form>
  );
}