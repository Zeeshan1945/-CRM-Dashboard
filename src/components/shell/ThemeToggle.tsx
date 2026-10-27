"use client";

import { Moon, Sun } from "lucide-react";

/** Flips data-theme on <html> and persists it. Icons swap via CSS so SSR markup is theme-agnostic. */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("rapport-theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="group relative flex size-[44px] items-center justify-center rounded-full text-sidebar-fg transition-colors hover:bg-sidebar-hover"
    >
      <Sun size={18} strokeWidth={1.6} aria-hidden className="only-dark" />
      <Moon size={18} strokeWidth={1.6} aria-hidden className="only-light" />
      <span className="tip">
        <span className="only-dark">Light mode</span>
        <span className="only-light">Dark mode</span>
      </span>
    </button>
  );
}
