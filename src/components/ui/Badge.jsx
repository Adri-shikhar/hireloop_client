import { cn } from "@/lib/utils/cn";

const variants = {
  success: "hl-badge-success",
  warning: "hl-badge-warning",
  neutral: "hl-badge-neutral",
  accent: "hl-badge-accent",
};

export default function Badge({ children, variant = "neutral", className }) {
  return (
    <span className={cn("hl-badge", variants[variant], className)}>
      {children}
    </span>
  );
}
