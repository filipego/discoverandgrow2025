import { forwardRef } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  options: SelectOption[];
}

export const CustomSelect = forwardRef<HTMLSelectElement, CustomSelectProps>(
  ({ label, placeholder, required, error, options, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="relative">
          <select
            ref={ref}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors appearance-none bg-white ${
              error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
            }`}
            {...props}
          >
            <option value="">{placeholder || `Select ${label}`}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>
    );
  }
);

CustomSelect.displayName = 'CustomSelect'; 