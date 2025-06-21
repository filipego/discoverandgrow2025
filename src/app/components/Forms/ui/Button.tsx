import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isValid?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, isValid, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={!isValid || disabled}
        className={cn(
          "group inline-flex items-center transition duration-300 rounded-full uppercase font-semibold",
          "gap-3 text-sm py-3 px-6",
          "bg-brand-green text-white",
          isValid ? "cursor-pointer" : "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }