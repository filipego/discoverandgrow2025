import { forwardRef } from "react";

interface CustomInputProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  type?: string;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, placeholder, required, error, type = "text", ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors ${
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

CustomInput.displayName = 'CustomInput'; 