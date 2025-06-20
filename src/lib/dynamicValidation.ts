import { z } from 'zod';

export interface FormFieldOption {
  option_label: string;
}

export interface FormField {
  field_type: string;
  field_label: string;
  field_placeholder?: string;
  field_width: 'full' | 'half';
  is_required: boolean;
  options?: FormFieldOption[];
}

export const createDynamicSchema = (formFields: FormField[]) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  formFields.forEach((field) => {
    // Skip fields without proper labels
    if (!field.field_label || !field.field_type) {
      return;
    }

    let fieldSchema: z.ZodTypeAny;

    switch (field.field_type) {
      case 'email':
        fieldSchema = z.string().email('Please enter a valid email address');
        break;
      
      case 'phone':
        fieldSchema = z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number');
        break;
      
      case 'number':
        fieldSchema = z.string().regex(/^\d+$/, 'Please enter a valid number');
        break;
      
      case 'url':
        if (field.is_required) {
          fieldSchema = z.string().min(1, 'URL is required').url('Please enter a valid URL');
        } else {
          fieldSchema = z.string().optional().refine((val) => {
            if (!val || val.trim() === '') return true; // Allow empty
            try {
              new URL(val);
              return true;
            } catch {
              return false;
            }
          }, { message: 'Please enter a valid URL' });
        }
        break;
      
      case 'text':
      case 'textarea':
        fieldSchema = z.string().min(1, `${field.field_label} is required`);
        break;
      
      case 'select':
      case 'radio':
        if (field.is_required) {
          fieldSchema = z.string().min(1, 'Please select an option');
        } else {
          fieldSchema = z.string();
        }
        break;
      
      case 'checkbox':
        fieldSchema = z.boolean().refine(val => val === true, {
          message: `You must agree to ${field.field_label}`
        });
        break;
      
      case 'checkbox_group':
        if (field.is_required) {
          fieldSchema = z.array(z.string()).min(1, 'Please select at least one option');
        } else {
          fieldSchema = z.array(z.string()).optional();
        }
        break;
      
      default:
        fieldSchema = z.string();
    }

    // Make optional if not required
    if (!field.is_required) {
      fieldSchema = fieldSchema.optional();
    }

    // Use field label as key (sanitized) - with proper null check
    const fieldKey = sanitizeFieldKey(field.field_label);
    schemaFields[fieldKey] = fieldSchema;
  });

  return z.object(schemaFields);
};

export const sanitizeFieldKey = (label: string): string => {
  if (!label || typeof label !== 'string') {
    return 'field';
  }
  return label.toLowerCase().replace(/[^a-z0-9]/g, '_');
}; 