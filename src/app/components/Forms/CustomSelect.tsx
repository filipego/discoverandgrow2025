"use client";

import { forwardRef, useState, useRef, useEffect } from "react";

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
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

export const CustomSelect = forwardRef<HTMLInputElement, CustomSelectProps>(
  ({ label, placeholder, required, error, options, value, onChange, name, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || "");
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const selectedOption = options.find(option => option.value === selectedValue);

    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: SelectOption) => {
      setSelectedValue(option.value);
      onChange?.(option.value);
      setIsOpen(false);
      setFocusedIndex(-1);
      buttonRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          setIsOpen(true);
          setFocusedIndex(0);
        }
        return;
      }

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          buttonRef.current?.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex(prev => (prev < options.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : options.length - 1));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedIndex >= 0) {
            handleSelect(options[focusedIndex]);
          }
          break;
        case "Tab":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    };

    return (
      <div className="space-y-2" ref={dropdownRef}>
        {/* Hidden input for form submission */}
        <input
          ref={ref}
          type="hidden"
          name={name}
          value={selectedValue}
          {...props}
        />
        
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            className={`relative w-full cursor-pointer rounded-lg border px-4 py-3 text-left text-[14px] shadow-sm transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black focus:outline-none lg:text-base ${
              error 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 hover:border-gray-400'
            } ${isOpen ? 'border-black ring-2 ring-black' : ''}`}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className={`block truncate ${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}>
              {selectedOption ? selectedOption.label : (placeholder || `Select ${label}`)}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          {isOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 duration-100">
              <ul
                className="py-1 max-h-60 overflow-auto focus:outline-none"
                role="listbox"
                tabIndex={-1}
              >
                {options.map((option, index) => (
                  <li
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className={`relative cursor-pointer select-none px-4 py-2 text-[14px] transition-colors duration-150 lg:text-base ${
                      index === focusedIndex
                        ? 'bg-black text-white'
                        : selectedValue === option.value
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                    role="option"
                    aria-selected={selectedValue === option.value}
                  >
                    <span className="block truncate">{option.label}</span>
                    {selectedValue === option.value && (
                      <span className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
                        index === focusedIndex ? 'text-white' : 'text-black'
                      }`}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
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

CustomSelect.displayName = 'CustomSelect'; 