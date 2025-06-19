import { forwardRef } from "react";

interface RadioOption {
  label: string;
  value: string;
}

interface CustomRadioProps {
  label: string;
  required?: boolean;
  error?: string;
  options: RadioOption[];
}

export const CustomRadio = forwardRef<HTMLInputElement, CustomRadioProps>(
  ({ label, required, error, options, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="space-y-2">
          {options.map((option, index) => (
            <label key={index} className="flex items-center space-x-3 cursor-pointer">
              <input
                ref={index === 0 ? ref : undefined}
                type="radio"
                value={option.value}
                className="w-4 h-4 text-black border-gray-300 focus:ring-2 focus:ring-black"
                {...props}
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>
    );
  }
);

CustomRadio.displayName = 'CustomRadio'; 