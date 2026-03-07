import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-ink-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-lg border border-ink-300 bg-white px-4 py-2.5 text-ink-900",
            "placeholder:text-ink-500",
            "transition-colors duration-150",
            "focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-navy/20",
            error && "border-brand-red focus:border-brand-red focus:ring-brand-red/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-brand-red">{error}</p>}
        {hint && !error && <p className="text-xs text-ink-500">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
