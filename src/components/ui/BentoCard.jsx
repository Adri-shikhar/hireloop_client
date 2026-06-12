import { cn } from "@/lib/utils/cn";

/**
 * Bento box card with optional glassmorphism and hover micro-interaction.
 *
 * @param {"sm"|"md"|"lg"|"wide"|"tall"|"hero"} span - Grid span preset
 * @param {boolean} glass - Enable frosted glass effect
 */
export default function BentoCard({
  children,
  className,
  span = "md",
  glass = true,
  as: Component = "article",
  ariaLabel,
  ...props
}) {
  return (
    <Component
      className={cn(
        "bento-card",
        glass && "bento-card-glass",
        span === "sm" && "bento-card-sm",
        span === "lg" && "bento-span-lg",
        span === "wide" && "bento-span-2",
        span === "tall" && "bento-span-tall",
        span === "hero" && "bento-span-hero",
        className
      )}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Component>
  );
}
