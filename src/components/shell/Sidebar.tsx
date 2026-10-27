import {
  CalendarDays,
  Plus,
  Search,
  Send,
  Settings,
  Share2,
  Smartphone,
  Star,
  Upload,
  type LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const top: { label: string; icon: LucideIcon }[] = [
  { label: "Search", icon: Search },
  { label: "Create", icon: Plus },
  { label: "Favourites", icon: Star },
  { label: "Calendar", icon: CalendarDays },
  { label: "Mobile app", icon: Smartphone },
  { label: "Send", icon: Send },
  { label: "Share", icon: Share2 },
  { label: "Export", icon: Upload },
];

const itemClass =
  "group relative flex size-[44px] items-center justify-center rounded-full text-sidebar-fg transition-colors hover:bg-sidebar-hover focus-visible:bg-sidebar-hover";

export function Sidebar() {
  return (
    <aside
      aria-label="Quick actions"
      className="fixed top-[78px] left-5 z-30 hidden h-[548px] w-[61px] flex-col items-center gap-2 rounded-full border border-sidebar-line bg-sidebar py-[14px] shadow-[0_20px_40px_-18px_rgb(0_0_0/0.45)] lg:flex"
    >
      {top.map(({ label, icon: Icon }) => (
        <button key={label} type="button" aria-label={label} className={itemClass}>
          <Icon size={18} strokeWidth={1.6} aria-hidden />
          <span className="tip" aria-hidden>
            {label}
          </span>
        </button>
      ))}
      <div className="my-[2.5px] h-px w-[22px] bg-sidebar-line" role="separator" />
      <button type="button" aria-label="Settings" className={itemClass}>
        <Settings size={18} strokeWidth={1.6} aria-hidden />
        <span className="tip" aria-hidden>
          Settings
        </span>
      </button>
      <ThemeToggle />
    </aside>
  );
}
