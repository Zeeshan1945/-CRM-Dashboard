"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./nav";

export function TopNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary" className="t-scroll -mx-4 overflow-x-auto px-4 lg:mx-0 lg:overflow-visible lg:px-0">
      <ul className="flex items-center gap-0.5">
        {navItems.map(({ href, label }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex h-[42px] items-center rounded-full px-[18px] text-[13.4px] font-medium whitespace-nowrap transition-colors duration-200 ${
                  active ? "bg-nav-active text-nav-active-fg" : "text-text hover:bg-control"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
