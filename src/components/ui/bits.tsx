"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export function Seg({ options, initial = 0, label, className = "" }: { options: string[]; initial?: number; label: string; className?: string }) {
  const [i, setI] = useState(initial);
  return (
    <div role="group" aria-label={label} className={`flex rounded-full bg-control p-[3px] ring-1 ring-line ${className}`}>
      {options.map((o, k) => (
        <button key={o} type="button" aria-pressed={i === k} onClick={() => setI(k)}
          className={`h-8 rounded-full px-[14px] text-[13px] font-semibold transition-colors ${i === k ? "bg-tile-strong text-text" : "text-muted hover:text-text"}`}>
          {o}
        </button>
      ))}
    </div>
  );
}

export function Chips({ options, label, initial = 0 }: { options: string[]; label: string; initial?: number }) {
  const [i, setI] = useState(initial);
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o, k) => (
        <button key={o} type="button" aria-pressed={i === k} onClick={() => setI(k)}
          className={`h-[34px] rounded-full border border-line px-4 text-[13px] font-semibold transition-colors ${i === k ? "bg-primary text-primary-fg" : "bg-control hover:bg-control-hover"}`}>
          {o}
        </button>
      ))}
    </div>
  );
}

export function SearchBox({ placeholder, className = "" }: { placeholder: string; className?: string }) {
  return (
    <label className={`flex h-[46px] items-center gap-3 rounded-full border border-line-strong bg-control px-4 ${className}`}>
      <Search size={16} strokeWidth={1.6} aria-hidden className="text-muted" />
      <input type="search" placeholder={placeholder} aria-label={placeholder} className="w-full bg-transparent text-[13.5px] outline-none placeholder:text-faint" />
    </label>
  );
}
