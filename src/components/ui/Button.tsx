"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "whatsapp";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer rounded-lg";

    const variants = {
      primary:
        "bg-brand-navy text-brand-cream hover:bg-brand-dark active:scale-95 focus-visible:outline-brand-navy",
      secondary:
        "bg-brand-cream text-brand-navy border-2 border-brand-navy hover:bg-brand-navy hover:text-brand-cream active:scale-95",
      ghost:
        "bg-transparent text-brand-navy hover:bg-brand-cream active:scale-95",
      danger:
        "bg-brand-red text-white hover:opacity-90 active:scale-95",
      whatsapp:
        "bg-[#25D366] text-white hover:bg-[#1ebe57] active:scale-95 shadow-lg shadow-[#25D366]/30",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-7 py-3.5 text-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
