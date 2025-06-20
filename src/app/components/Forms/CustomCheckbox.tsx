"use client";

import { forwardRef, useState } from "react";

interface CustomCheckboxProps {
  label: string;
  required?: boolean;
  error?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  disabled?: boolean;
}

export const CustomCheckbox = forwardRef<HTMLInputElement, CustomCheckboxProps>(
  ({ label, required, error, checked, onChange, name, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked || false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      setIsChecked(newChecked);
      onChange?.(newChecked);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        if (!disabled) {
          const newChecked = !isChecked;
          setIsChecked(newChecked);
          onChange?.(newChecked);
        }
      }
    };

    return (
      <div className="space-y-2">
        <label 
          className={`flex items-start space-x-3 cursor-pointer group ${
            disabled ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <div className="relative flex items-center">
            {/* Hidden native checkbox for form submission */}
            <input
              ref={ref}
              type="checkbox"
              name={name}
              checked={isChecked}
              onChange={handleChange}
              disabled={disabled}
              className="sr-only"
              {...props}
            />
            
            {/* Custom checkbox */}
            <div
              className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                isChecked
                  ? 'bg-black border-black'
                  : error
                  ? 'border-red-300 group-hover:border-red-400'
                  : 'border-gray-300 group-hover:border-gray-400'
              } ${
                !disabled && 'group-focus-within:ring-2 group-focus-within:ring-black group-focus-within:ring-offset-2'
              }`}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={handleKeyDown}
              role="checkbox"
              aria-checked={isChecked}
              aria-disabled={disabled}
            >
              {/* Checkmark */}
              <svg
                className={`w-3 h-3 text-white transition-all duration-200 ${
                  isChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          
          <div className="flex-1">
            <span className={`text-sm ${
              error ? 'text-red-700' : 'text-gray-700'
            } ${disabled ? 'text-gray-400' : ''}`}>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </span>
          </div>
        </label>
        
        {error && (
          <p className="text-red-500 text-sm flex items-center gap-1 ml-8">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

CustomCheckbox.displayName = 'CustomCheckbox'; 