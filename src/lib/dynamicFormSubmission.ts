import { sanitizeFieldKey, type FormField } from "./dynamicValidation";

export type SubmittedFormField = {
  label: string;
  value: string;
  type: string;
};

export const DEFAULT_DYNAMIC_THANK_YOU_CONTENT =
  "<p>Thank you for contacting Discover and Grow. We’ve received your message and will get back to you within 2–3 business days.</p>";

export function getDynamicThankYouContent(content?: string | null): string {
  return content?.trim() || DEFAULT_DYNAMIC_THANK_YOU_CONTENT;
}

function getOptionLabel(field: FormField, value: string): string {
  return (
    field.options?.find(
      (option) => sanitizeFieldKey(option.option_label) === value,
    )?.option_label || value
  );
}

function formatFieldValue(field: FormField, value: unknown): string {
  if (field.field_type === "checkbox") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value.map((entry) => getOptionLabel(field, String(entry))).join(", ");
  }

  if (value === null || value === undefined || value === "") {
    return "";
  }

  if (field.field_type === "select" || field.field_type === "radio") {
    return getOptionLabel(field, String(value));
  }

  return String(value);
}

export function formatDynamicFormData(
  formFields: FormField[],
  values: Record<string, unknown>,
): SubmittedFormField[] {
  return formFields.map((field) => {
    const fieldKey = sanitizeFieldKey(field.field_label);

    return {
      label: field.field_label,
      value: formatFieldValue(field, values[fieldKey]),
      type: field.field_type,
    };
  });
}
