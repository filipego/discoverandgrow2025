"use client";

import { forwardRef, useState } from "react";

interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface CustomCheckboxGroupProps {
  label: string;
  options: CheckboxOption[];
  required?: boolean;
  error?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
}

export const CustomCheckboxGroup = forwardRef<HTMLDivElement, CustomCheckboxGroupProps>(
  ({ label, options, required, error, value = [], onChange, disabled, ...props }, ref) => {
    
    const handleCheckboxChange = (optionValue: string, checked: boolean) => {
      if (!onChange || disabled) return;
      
      let newValue: string[];
      if (checked) {
        // Add the value if checked
        newValue = [...value, optionValue];
      } else {
        // Remove the value if unchecked
        newValue = value.filter(v => v !== optionValue);
      }
      
      onChange(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent, optionValue: string, optionDisabled?: boolean) => {
      if (e.key === " ") {
        e.preventDefault();
        if (!disabled && !optionDisabled) {
          const isCurrentlyChecked = value.includes(optionValue);
          handleCheckboxChange(optionValue, !isCurrentlyChecked);
        }
      }
    };

    return (
      <div ref={ref} className="space-y-3">
        <div className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </div>
        
        <div className="space-y-3">
          {options.map((option, index) => {
            const isChecked = value.includes(option.value);
            const isDisabled = disabled || option.disabled;
            
            return (
              <label
                key={option.value}
                className={`flex items-start space-x-3 cursor-pointer group ${
                  isDisabled ? 'cursor-not-allowed opacity-50' : ''
                }`}
              >
                <div className="relative flex items-center">
                  {/* Hidden native checkbox for form submission */}
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isChecked}
                    onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                    disabled={isDisabled}
                    className="sr-only"
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
                      !isDisabled && 'group-focus-within:ring-2 group-focus-within:ring-black group-focus-within:ring-offset-2'
                    }`}
                    tabIndex={isDisabled ? -1 : 0}
                    onKeyDown={(e) => handleKeyDown(e, option.value, option.disabled)}
                    role="checkbox"
                    aria-checked={isChecked}
                    aria-disabled={isDisabled}
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
                  } ${isDisabled ? 'text-gray-400' : ''}`}>
                    {option.label}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
        
        {error && (
          <p className="text-red-500 text-sm flex items-center gap-1">
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

CustomCheckboxGroup.displayName = 'CustomCheckboxGroup'; 