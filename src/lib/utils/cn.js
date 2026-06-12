/**
 * Merges class names, filtering out falsy values.
 * Lightweight alternative to clsx for conditional Tailwind classes.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
