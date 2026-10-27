import Link from "next/link";
import { Bell, Inbox } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { me } from "@/lib/team";
import { TopNav } from "./TopNav";

export function Header() {
  return (
    <header className="flex flex-wrap items-center gap-y-3 pt-4 lg:grid lg:grid-cols-[minmax(0,375px)_auto_1fr] lg:pt-[29px]">
      <Link href="/" aria-label="Rapport home" className="flex items-center gap-[11px] rounded-xl">
        <span
          aria-hidden
          className="grid size-[38px] place-items-center rounded-[11px] bg-[var(--brand-bg)] text-[22px] leading-none font-bold text-[var(--brand-fg)]"
        >
          R
        </span>
        <span className="text-[23px] leading-none font-bold tracking-[-0.045em]">rapport</span>
      </Link>

      <div className="order-last w-full lg:order-none lg:w-auto">
        <TopNav />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button type="button" aria-label="Inbox" className="ctl size-[38px]">
          <Inbox size={17} strokeWidth={1.6} aria-hidden />
        </button>
        <button type="button" aria-label="Notifications, 1 unread" className="ctl relative size-[38px]">
          <Bell size={17} strokeWidth={1.6} aria-hidden />
          <span aria-hidden className="absolute top-[7px] right-[9px] size-2 rounded-full bg-[#ff4f1f] ring-2 ring-[#1c1e1b]" />
        </button>
        <button type="button" aria-label="Account: Sofia Reyes" className="rounded-full ring-2 ring-line-strong">
          <Avatar person={me} size={40} priority />
        </button>
      </div>
    </header>
  );
}
