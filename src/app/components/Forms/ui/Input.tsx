import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  multiline?: boolean
  rows?: number
}

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, type, multiline, rows = 4, ...props }, ref) => {
    if (multiline) {
      return (
        <textarea
          className={cn(
            "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F1E1A7] outline-none",
            className
          )}
          rows={rows}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          {...props}
        />
      )
    }

    return (
      <input
        type={type}
        className={cn(
          "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F1E1A7] outline-none",
          className
        )}
        ref={ref as React.Ref<HTMLInputElement>}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }