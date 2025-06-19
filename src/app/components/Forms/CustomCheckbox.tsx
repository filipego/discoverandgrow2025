import { forwardRef } from "react";

interface CustomCheckboxProps {
  label: string;
  required?: boolean;
  error?: string;
}

export const CustomCheckbox = forwardRef<HTMLInputElement, CustomCheckboxProps>(
  ({ label, required, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            className="w-4 h-4 mt-0.5 text-black border-gray-300 rounded focus:ring-2 focus:ring-black"
            {...props}
          />
          <span className="text-sm text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        </label>
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>
    );
  }
);

CustomCheckbox.displayName = 'CustomCheckbox'; 