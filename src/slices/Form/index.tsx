import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { asHTML } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { Bounded } from "@/app/components/Bounded";
import { Heading } from "@/app/components/Heading";
import DynamicForm from "@/app/components/Forms/DynamicForm";
import { FormField } from "@/lib/dynamicValidation";
import { getDynamicThankYouContent } from "@/lib/dynamicFormSubmission";

/**
 * Props for `Form`.
 */
export type FormProps = SliceComponentProps<Content.FormSlice>;

/**
 * Component for "Form" Slices.
 */
const Form: FC<FormProps> = ({ slice }) => {
  const formFields: FormField[] = slice.primary.form_fields.map((field) => {
    return {
      field_type: field.field_type || 'text',
      field_label: field.field_label || 'Untitled Field',
      field_placeholder: field.field_placeholder || '',
      field_width: field.field_width || 'full',
      is_required: field.is_required || false,
      options: field.options.map((option) => ({
        option_label: option.option_label || ''
      }))
    };
  }).filter((field) => field.field_label && field.field_type);

  // Convert RichTextField to HTML string for email
  const thankYouContentHTML = getDynamicThankYouContent(
    slice.primary.thank_you_email_content
      ? asHTML(slice.primary.thank_you_email_content)
      : undefined,
  );
  
    const getPadding = () => {
      if ('padding' in slice.primary && slice.primary.padding) {
        return slice.primary.padding as "normal padding" | "smaller padding" | "no padding" | "no top padding" | "no bottom padding";
      }
      return "normal padding" as const;
    };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      padding={getPadding()}
    >
      <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left side - Heading and Text */}
        <div className="flex flex-col space-y-6 lg:justify-center">
          {slice.primary.heading && (
            <Heading as="h2" size="lg" className="text-black">
              {slice.primary.heading}
            </Heading>
          )}
          
          {slice.primary.body && (
            <div className="max-w-none">
              <PrismicRichText 
                field={slice.primary.body}
                components={{
                  heading2: ({ children }) => (
                    <Heading as="h2" size="xl" className="mb-5 font-semibold lg:mb-10">
                      {children}
                    </Heading>
                  ),
                  heading3: ({ children }) => (
                    <Heading as="h3" size="md" className="mb-3 mt-8 font-semibold">
                      {children}
                    </Heading>
                  ),
                  heading4: ({ children }) => (
                    <Heading as="h4" size="sm" className="mb-3 mt-6 font-semibold">
                      {children}
                    </Heading>
                  ),
                  list: ({ children }) => (
                    <ul className="mb-6 max-w-prose list-disc space-y-2 pl-14 text-brand-gray">
                      {children}
                    </ul>
                  ),
                  listItem: ({ children }) => (
                    <li className="leading-relaxed">{children}</li>
                  ),
                  paragraph: ({ children }) => (
                    <p className="mb-3 max-w-prose text-brand-gray leading-relaxed last:mb-0">
                      {children}
                    </p>
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
                  hyperlink: ({ node, children }) => (
                    <PrismicNextLink
                      field={node.data}
                      className="font-semibold text-brand-green transition-colors hover:text-brand-blue"
                    >
                      {children}
                    </PrismicNextLink>
                  ),
                }}
              />
            </div>
          )}
        </div>

        {/* Right side - Form */}
        <div className="bg-gray-50 p-8 rounded-2xl">
          {slice.primary.form_title && !slice.primary.hide_form_title && (
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
            notificationEmail={slice.primary.notification_email || 'info@discoverandgrow.org'}
            enableCaptcha={slice.primary.enable_captcha ?? true}
            showCaptcha={slice.primary.show_captcha ?? true}
          />
        </div>
      </div>
    </Bounded>
  );
};

export default Form;
