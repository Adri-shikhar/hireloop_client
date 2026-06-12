import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const variants = {
  primary: "hl-btn hl-btn-primary",
  secondary: "hl-btn hl-btn-secondary",
  ghost: "hl-btn hl-btn-ghost",
};

/**
 * Accessible button with consistent focus ring and loading state.
 */
export default function Button({
  children,
  variant = "primary",
  href,
  isLoading = false,
  disabled,
  className,
  icon: Icon,
  ...props
}) {
  const classes = cn(variants[variant], className);
  const isDisabled = disabled || isLoading;

  const content = (
    <>
      {isLoading && (
        <span className="hl-btn-spinner" aria-hidden="true" />
      )}
      {Icon && !isLoading && <Icon size={16} aria-hidden="true" />}
      <span>{children}</span>
    </>
  );

  if (href && !isDisabled) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {content}
    </button>
  );
}
