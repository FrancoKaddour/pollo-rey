import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "red" | "cream" | "green";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-brand-navy text-brand-cream",
    gold:    "bg-brand-gold text-white",
    red:     "bg-brand-red text-white",
    cream:   "bg-brand-cream text-brand-navy border border-brand-navy/20",
    green:   "bg-emerald-600 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
