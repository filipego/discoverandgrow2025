"use client";

import { FC, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { createDynamicSchema, sanitizeFieldKey, FormField } from "@/lib/dynamicValidation";

// Auto-generate clean values from labels
const generateValue = (label: string): string => {
  return label.toLowerCase().replace(/[^a-z0-9]/g, '_');
};
import { CustomInput } from "./CustomInput";
import { CustomSelect } from "./CustomSelect";
import { CustomRadio } from "./CustomRadio";
import { CustomCheckbox } from "./CustomCheckbox";
import { CustomCheckboxGroup } from "./CustomCheckboxGroup";
import { CustomTextarea } from "./CustomTextarea";

interface DynamicFormProps {
  formFields: FormField[];
  formTitle: string;
  submitButtonText: string;
  successMessage: string;
  thankYouContent: string;
  notificationEmail: string;
  enableCaptcha: boolean;
  showCaptcha?: boolean;
  onSuccess?: () => void;
}

const DynamicForm: FC<DynamicFormProps> = ({
  formFields,
  formTitle,
  submitButtonText,
  successMessage,
  thankYouContent,
  notificationEmail,
  enableCaptcha,
  showCaptcha = true,
  onSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formStartTime] = useState(Date.now());

  // Generate schema dynamically
  const schema = useMemo(() => createDynamicSchema(formFields), [formFields]);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
    watch,
    control,
    trigger
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit' // Only validate when form is submitted
  });

  // Watch all form values
  const watchedValues = watch();

  // Check if required fields are valid
  const areRequiredFieldsValid = useMemo(() => {
    const requiredFields = formFields.filter(field => field.is_required);
    
    return requiredFields.every(field => {
      const fieldKey = sanitizeFieldKey(field.field_label);
      const value = watchedValues[fieldKey];
      
      // Check if field has a value and no errors
      if (field.field_type === 'checkbox') {
        return value === true;
      } else if (field.field_type === 'checkbox_group') {
        return Array.isArray(value) && value.length > 0;
      } else {
        return value && value.toString().trim() !== '';
      }
    });
  }, [watchedValues, formFields, errors]);

  const onSubmit = async (data: any) => {
    // Honeypot check
    if (honeypot) {
      console.log('Bot detected via honeypot');
      return;
    }

    // Captcha check
    if (enableCaptcha && !turnstileToken) {
      alert('Please complete the security verification');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Transform data to match API format
      const formData = formFields.map(field => {
        const fieldKey = sanitizeFieldKey(field.field_label);
        return {
          label: field.field_label,
          value: data[fieldKey] || '',
          type: field.field_type
        };
      });

      const response = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData,
          formTitle,
          notificationEmail,
          thankYouContent,
          turnstileToken,
          timestamp: formStartTime
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setTurnstileToken('');
        onSuccess?.();
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField, index: number) => {
    const fieldKey = sanitizeFieldKey(field.field_label);
    const error = errors[fieldKey]?.message as string | undefined;
    const isHalfWidth = field.field_width === 'half';

    const commonProps = {
      label: field.field_label,
      placeholder: field.field_placeholder,
      required: field.is_required,
      error,
      ...register(fieldKey)
    };

    switch (field.field_type) {
      case 'textarea':
        return (
          <div key={index} className={isHalfWidth ? 'col-span-1' : 'col-span-full'}>
            <CustomTextarea {...commonProps} />
          </div>
        );

      case 'select':
        const selectOptions = field.options?.map(opt => ({
          label: opt.option_label,
          value: generateValue(opt.option_label)
        })) || [];
        return (
          <div key={index} className={isHalfWidth ? 'col-span-1' : 'col-span-full'}>
            <Controller
              name={fieldKey}
              control={control}
              defaultValue=""
              render={({ field: controllerField }) => (
                <CustomSelect 
                  label={field.field_label}
                  placeholder={field.field_placeholder}
                  required={field.is_required}
                  error={error}
                  options={selectOptions}
                  value={controllerField.value}
                  onChange={controllerField.onChange}
                  name={controllerField.name}
                />
              )}
            />
          </div>
        );

      case 'radio':
        const radioOptions = field.options?.map(opt => ({
          label: opt.option_label,
          value: generateValue(opt.option_label)
        })) || [];
        return (
          <div key={index} className={isHalfWidth ? 'col-span-1' : 'col-span-full'}>
            <Controller
              name={fieldKey}
              control={control}
              defaultValue=""
              render={({ field: controllerField }) => (
                <CustomRadio 
                  label={field.field_label}
                  required={field.is_required}
                  error={error}
                  options={radioOptions}
                  value={controllerField.value}
                  onChange={controllerField.onChange}
                  name={controllerField.name}
                />
              )}
            />
          </div>
        );

      case 'checkbox':
        return (
          <div key={index} className={isHalfWidth ? 'col-span-1' : 'col-span-full'}>
            <Controller
              name={fieldKey}
              control={control}
              defaultValue={false}
              render={({ field: controllerField }) => (
                <CustomCheckbox 
                  label={field.field_label}
                  required={field.is_required}
                  error={error}
                  checked={controllerField.value}
                  onChange={controllerField.onChange}
                  name={controllerField.name}
                />
              )}
            />
          </div>
        );

      case 'checkbox_group':
        const checkboxOptions = field.options?.map(opt => ({
          label: opt.option_label,
          value: generateValue(opt.option_label)
        })) || [];
        return (
          <div key={index} className={isHalfWidth ? 'col-span-1' : 'col-span-full'}>
            <Controller
              name={fieldKey}
              control={control}
              defaultValue={[]}
              render={({ field: controllerField }) => (
                <CustomCheckboxGroup 
                  label={field.field_label}
                  options={checkboxOptions}
                  required={field.is_required}
                  error={error}
                  value={controllerField.value || []}
                  onChange={controllerField.onChange}
                />
              )}
            />
          </div>
        );

      default:
        // For email fields, add onBlur validation
        const emailProps = field.field_type === 'email' ? {
          ...commonProps,
          onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
            commonProps.onBlur?.(e);
            // Trigger validation for email field on blur
            if (e.target.value.trim() !== '') {
              trigger(fieldKey);
            }
          }
        } : commonProps;

        return (
          <div key={index} className={isHalfWidth ? 'col-span-1' : 'col-span-full'}>
            <CustomInput {...emailProps} type={field.field_type} />
          </div>
        );
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-lg font-medium mb-2">
          {successMessage}
        </div>
        <div className="text-green-600 text-sm">
          We'll get back to you soon!
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ 
          position: 'absolute', 
          left: '-9999px',
          opacity: 0,
          pointerEvents: 'none'
        }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Dynamic form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map(renderField)}
      </div>

      {/* Captcha */}
      {enableCaptcha && (
        <div className={showCaptcha ? "flex justify-center" : "hidden"}>
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={setTurnstileToken}
          />
        </div>
      )}

      {/* Error message */}
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
          Something went wrong. Please try again.
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting || (enableCaptcha && !turnstileToken) || !areRequiredFieldsValid}
        className="w-full bg-brand-green text-white py-3 px-6 rounded-lg font-medium hover:bg-brand-green/80 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 uppercase"
      >
        {isSubmitting ? 'Submitting...' : submitButtonText}
      </button>
    </form>
  );
};

export default DynamicForm; 