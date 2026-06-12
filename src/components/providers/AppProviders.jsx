"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";

/**
 * Root client providers for HireLoop.
 * Wraps theme context and future global providers (toasts, etc.).
 */
export default function AppProviders({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
