import { FileText, Folder, Inbox, Mail, Phone, Trophy, type LucideIcon } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { ExpandButton, PanelTitle } from "@/components/ui/PanelHeader";
import { IconButton } from "@/components/ui/IconButton";
import type { ActivityIcon, activity as act } from "@/lib/data";

const icons: Record<ActivityIcon, LucideIcon> = {
  trophy: Trophy,
  mail: Mail,
  phone: Phone,
  receipt: FileText,
  folder: Folder,
};

export function RecentActivity({ items }: { items: typeof act }) {
  return (
    <section aria-labelledby="act-title" className="panel rise p-[18px] pt-[22px]" style={{ "--i": 6 } as React.CSSProperties}>
      <div className="flex items-center justify-between">
        <PanelTitle id="act-title">Recent activity</PanelTitle>
        <div className="flex items-center gap-2">
          <IconButton label="Open inbox">
            <Inbox size={15} strokeWidth={1.7} aria-hidden />
          </IconButton>
          <ExpandButton label="Open activity feed" />
        </div>
      </div>
      <ol className="mt-4">
        {items.map((a, i) => {
          const Icon = icons[a.icon];
          return (
            <li key={a.id} className={`flex items-start gap-3 py-[13px] ${i ? "border-t border-line" : ""}`}>
              <Avatar person={a.who} size={28} className="mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] leading-[1.3] font-medium tracking-[-0.01em]">
                  <b className="font-semibold">{a.who.first}</b> {a.text} · <span className="underline decoration-line-strong underline-offset-[3px]">{a.account}</span>
                </p>
                <p className="mt-1.5 text-[12px] leading-none text-muted">{a.ago}</p>
              </div>
              <Icon size={14} strokeWidth={1.6} aria-hidden className="mt-1 shrink-0 text-muted" />
            </li>
          );
        })}
      </ol>
    </section>
  );
}
