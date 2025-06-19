import { forwardRef } from "react";

interface CustomTextareaProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
}

export const CustomTextarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ label, placeholder, required, error, rows = 4, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          ref={ref}
          rows={rows}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors resize-vertical ${
            error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
          }`}
          {...props}
        />
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>
    );
  }
);

CustomTextarea.displayName = 'CustomTextarea'; 