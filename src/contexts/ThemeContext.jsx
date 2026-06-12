"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "hireloop-theme";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
  ready: false,
});

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial = saved === "light" ? "light" : "dark";
    setTheme(initial);
    applyTheme(initial);
    setReady(true);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, ready }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
