"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils/cn";

export default function ThemeToggle({ className, size = "md" }) {
  const { theme, toggleTheme, ready } = useTheme();

  if (!ready) {
    return (
      <div
        className={cn("theme-toggle skeleton-pulse", size === "sm" && "theme-toggle-sm", className)}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn("theme-toggle", size === "sm" && "theme-toggle-sm", className)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <Sun
        size={size === "sm" ? 15 : 17}
        className={cn("theme-toggle-icon", !isDark && "theme-toggle-icon-active")}
        aria-hidden="true"
      />
      <Moon
        size={size === "sm" ? 15 : 17}
        className={cn("theme-toggle-icon", isDark && "theme-toggle-icon-active")}
        aria-hidden="true"
      />
    </button>
  );
}
