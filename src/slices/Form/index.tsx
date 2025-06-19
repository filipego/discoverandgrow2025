import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { asHTML } from "@prismicio/client";
import { Bounded } from "@/app/components/Bounded";
import { Heading } from "@/app/components/Heading";
import DynamicForm from "@/app/components/Forms/DynamicForm";
import { FormField } from "@/lib/dynamicValidation";

/**
 * Props for `Form`.
 */
export type FormProps = SliceComponentProps<Content.FormSlice>;

/**
 * Component for "Form" Slices.
 */
const Form: FC<FormProps> = ({ slice }) => {
  // Transform slice primary form_fields to FormField format (reverting to working version)
  // @ts-ignore - form_fields exists in actual Prismic data structure
  const formFields: FormField[] = slice.primary.form_fields?.map((field: any) => {
    // Add logging to debug the field structure
    console.log('Processing form field:', field);
    
    return {
      field_type: field.field_type || 'text',
      field_label: field.field_label || 'Untitled Field',
      field_placeholder: field.field_placeholder || '',
      field_width: field.field_width || 'full',
      is_required: field.is_required || false,
      options: field.options?.map((option: any) => ({
        option_label: option.option_label || ''
      })) || []
    };
  }).filter((field: FormField) => field.field_label && field.field_type) || [];

  // Log the final formFields array
  console.log('Final formFields:', formFields);

  // Convert RichTextField to HTML string for email
  const thankYouContentHTML = slice.primary.thank_you_email_content 
    ? asHTML(slice.primary.thank_you_email_content)
    : 'Thank you for contacting us. We will get back to you soon.';

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      padding="no top padding"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left side - Heading and Text */}
        <div className="space-y-6">
          {slice.primary.heading && (
            <Heading as="h2" size="lg" className="text-black">
              {slice.primary.heading}
            </Heading>
          )}
          
          {slice.primary.body && (
            <div className="prose prose-gray max-w-none">
              <PrismicRichText 
                field={slice.primary.body}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-gray-600 text-lg leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  heading3: ({ children }) => (
                    <Heading as="h3" size="md" className="text-black mb-3 mt-8">
                      {children}
                    </Heading>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-black font-semibold">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-gray-700">
                      {children}
                    </em>
                  ),
                }}
              />
            </div>
          )}
        </div>

        {/* Right side - Form */}
        <div className="bg-gray-50 p-8 rounded-2xl">
          {slice.primary.form_title && (
            <Heading as="h3" size="md" className="text-black mb-6">
              {slice.primary.form_title}
            </Heading>
          )}
          
          <DynamicForm
            formFields={formFields}
            formTitle={slice.primary.form_title || 'Contact Form'}
            submitButtonText={slice.primary.submit_button_text || 'Send Message'}
            successMessage={slice.primary.success_message || 'Thank you for your message!'}
            thankYouContent={thankYouContentHTML}
            notificationEmail={slice.primary.notification_email || 'hello@discoverandgrow.ca'}
            enableCaptcha={slice.primary.enable_captcha ?? true}
          />
        </div>
      </div>
    </Bounded>
  );
};

export default Form;
