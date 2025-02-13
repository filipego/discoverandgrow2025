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
          "group inline-block transition duration-300 rounded-full border border-solid uppercase text-[#29285D]",
          "gap-3 text-sm py-2 px-6",
          "bg-[#F1E1A7] hover:bg-[#e9d79d]",
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