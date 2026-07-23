import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isValid?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, isValid, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={!isValid || disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-brand-green text-[12px] font-semibold text-white uppercase transition duration-300 lg:text-sm",
          "px-5 py-2.5 lg:py-3",
          isValid ? "cursor-pointer" : "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
