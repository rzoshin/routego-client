"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(true);
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => {setIsDark(!isDark); setTheme(theme === "dark" ? "light" : "dark");}}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-primary transition-all duration-200 hover:bg-secondary cursor-pointer"
      aria-label="Toggle theme"
    >
      {isDark ? <FaSun size={15} /> : <FaMoon size={14} className="text-muted-foreground" />}
    </button>
  );
}