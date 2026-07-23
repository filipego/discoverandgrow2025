"use client";

import { FC, useCallback, useEffect, useRef, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { createDynamicSchema, sanitizeFieldKey, FormField } from "@/lib/dynamicValidation";
import { formatDynamicFormData } from "@/lib/dynamicFormSubmission";

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
import { Button } from "./ui/Button";

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

type DynamicFormValues = Record<string, string | boolean | string[]>;

const fillableFieldTypes = [
  "text",
  "email",
  "phone",
  "textarea",
  "select",
  "radio",
  "number",
  "url",
  "checkbox",
  "checkbox_group",
];

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
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileInstance | undefined>(undefined);
  const pendingSubmission = useRef<DynamicFormValues | null>(null);
  const isInvisibleCaptcha = enableCaptcha && !showCaptcha;

  // Generate schema dynamically
  const schema = useMemo(() => createDynamicSchema(formFields), [formFields]);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
    watch,
    control,
    setValue,
    trigger
  } = useForm<DynamicFormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit' // Only validate when form is submitted
  });

  // Watch all form values
  const watchedValues = watch();
  const hasExplicitRequiredFields = formFields.some((field) => field.is_required);
  const isFieldRequired = (field: FormField) =>
    field.is_required ||
    (!hasExplicitRequiredFields && fillableFieldTypes.includes(field.field_type));

  const syncAutofilledValues = useCallback(() => {
    const form = formRef.current;
    if (!form) return;

    formFields.forEach((field) => {
      const fieldKey = sanitizeFieldKey(field.field_label);
      const element = form.elements.namedItem(fieldKey);

      if (
        !(element instanceof HTMLInputElement) &&
        !(element instanceof HTMLTextAreaElement)
      ) {
        return;
      }

      if (element.value) {
        setValue(fieldKey, element.value, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    });
  }, [formFields, setValue]);

  useEffect(() => {
    const initialSync = window.setTimeout(syncAutofilledValues, 0);
    const autofillSync = window.setTimeout(syncAutofilledValues, 250);

    return () => {
      window.clearTimeout(initialSync);
      window.clearTimeout(autofillSync);
    };
  }, [syncAutofilledValues]);

  // If a slice does not mark any field required, preserve the existing form
  // behavior: all fillable fields are required and labels show that clearly.
  const areRequiredFieldsValid = useMemo(() => {
    const fieldsToCheck = formFields.filter(isFieldRequired);

    if (fieldsToCheck.length === 0) {
      return false;
    }

    return fieldsToCheck.every((field) => {
      const fieldKey = sanitizeFieldKey(field.field_label);
      const value = watchedValues[fieldKey];

      if (field.field_type === "checkbox") {
        return value === true;
      }

      if (field.field_type === "checkbox_group") {
        return Array.isArray(value) && value.length > 0;
      }

      return typeof value === "string"
        ? value.trim() !== ""
        : Boolean(value);
    });
  }, [watchedValues, formFields]);

  const submitForm = async (
    data: DynamicFormValues,
    captchaToken: string,
  ) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Transform data to match API format
      const formData = formatDynamicFormData(formFields, data);

      const response = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData,
          formTitle,
          notificationEmail,
          thankYouContent,
          turnstileToken: captchaToken,
          timestamp: formStartTime
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setTurnstileToken('');
        turnstileRef.current?.reset();
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

  const handleTurnstileSuccess = (token: string) => {
    setTurnstileToken(token);

    const pendingData = pendingSubmission.current;
    if (pendingData) {
      pendingSubmission.current = null;
      void submitForm(pendingData, token);
    }
  };

  const onSubmit = async (data: DynamicFormValues) => {
    // Honeypot check
    if (honeypot) {
      console.log('Bot detected via honeypot');
      return;
    }

    if (enableCaptcha && !turnstileToken) {
      if (isInvisibleCaptcha && turnstileRef.current) {
        pendingSubmission.current = data;
        turnstileRef.current.execute();
        return;
      }

      alert('Please complete the security verification');
      return;
    }

    await submitForm(data, turnstileToken);
  };

  const renderField = (field: FormField, index: number) => {
    const fieldKey = sanitizeFieldKey(field.field_label);
    const error = errors[fieldKey]?.message as string | undefined;
    const isHalfWidth = field.field_width === 'half';

    const commonProps = {
      label: field.field_label,
      placeholder: field.field_placeholder,
      required: isFieldRequired(field),
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
                  required={isFieldRequired(field)}
                  error={error}
                  options={selectOptions}
                  value={typeof controllerField.value === 'string' ? controllerField.value : ''}
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
                  required={isFieldRequired(field)}
                  error={error}
                  options={radioOptions}
                  value={typeof controllerField.value === 'string' ? controllerField.value : ''}
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
                  required={isFieldRequired(field)}
                  error={error}
                  checked={controllerField.value === true}
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
                  required={isFieldRequired(field)}
                  error={error}
                  value={Array.isArray(controllerField.value) ? controllerField.value : []}
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
          We&apos;ll get back to you within 2–3 business days.
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      onFocusCapture={syncAutofilledValues}
      className="space-y-6"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ 
          position: 'absolute', 
          left: '-9999px',
          opacity: 0,
          pointerEvents: 'none'
        }}
        tabIndex={-1}
        autoComplete="new-password"
      />

      {/* Dynamic form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map(renderField)}
      </div>

      {/* Captcha */}
      {enableCaptcha && (
        <div className={showCaptcha ? "flex justify-center" : undefined}>
          <Turnstile
            ref={turnstileRef}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={handleTurnstileSuccess}
            options={{
              size: showCaptcha ? "normal" : "invisible",
              execution: showCaptcha ? "render" : "execute",
              appearance: showCaptcha ? "always" : "interaction-only",
            }}
          />
        </div>
      )}

      {/* Error message */}
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="flex justify-start">
        <Button
          type="submit"
          isValid={
            !isSubmitting &&
            areRequiredFieldsValid &&
            (!enableCaptcha || !showCaptcha || Boolean(turnstileToken))
          }
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : submitButtonText}
        </Button>
      </div>
    </form>
  );
};

export default DynamicForm;
