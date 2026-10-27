import type { Metadata } from "next";
import { CalendarDays, Download, Plus, Trophy, TrendingUp, X } from "lucide-react";
import { PageHeading } from "@/components/ui/PageHeading";
import { Seg, SearchBox } from "@/components/ui/bits";
import { IconButton } from "@/components/ui/IconButton";
import { Avatar, AvatarStack } from "@/components/ui/Avatar";
import { MoreButton } from "@/components/ui/PanelHeader";
import { team } from "@/lib/team";
import { money } from "@/lib/format";
import { pipelineCols } from "@/lib/pages-data";

export const metadata: Metadata = { title: "Pipeline" };
const tone = {
  yellow: "bg-brand-yellow text-ink [--m:rgb(23_25_26/.7)]",
  green: "bg-brand-green text-white [--m:rgb(255_255_255/.75)]",
  hot: "bg-deal-hot text-white [--m:rgb(255_255_255/.8)]",
  neutral: "bg-deal text-deal-fg [--m:var(--deal-neutral-muted)]",
} as const;
const owners = [[team.sofia, team.amara, team.rohan], [team.hanna, team.theo, team.amara], [team.rohan, team.sofia, team.hanna]];

export default function PipelinePage() {
  return (
    <div className="flex flex-col gap-[18px]">
      <PageHeading title="Deal Pipeline" stats={[
        { icon: Trophy, value: "$1,139,100", label: "Open pipeline" },
        { icon: TrendingUp, value: "$713,157", label: "Weighted forecast" },
        { icon: CalendarDays, value: "1", label: "Deals closing this month", badge: { text: "$4.2K", tone: "yellow" } },
      ]} />
      <div className="flex flex-wrap items-center gap-2">
        <SearchBox placeholder="Search deals…" className="w-[260px]" />
        {[team.sofia, team.theo, team.amara, team.rohan, team.hanna].map((p) => (
          <button key={p.id} type="button" className="ctl h-[34px] gap-2 pr-3 pl-1 text-[13px] font-semibold"><Avatar person={p} size={26} />{p.first}</button>
        ))}
        <div className="ml-auto flex items-center gap-3">
          <Seg label="View" options={["Board", "List"]} />
          <IconButton label="Download" size={39}><Download size={16} aria-hidden /></IconButton>
          <button type="button" className="btn-primary h-[43px] px-5 text-[13.5px]"><Plus size={15} aria-hidden />New deal</button>
        </div>
      </div>
      <div className="grid gap-[14px] md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_118px]">
        {pipelineCols.map((c, ci) => (
          <section key={c.stage} aria-label={c.stage} className="panel rise flex flex-col gap-3 p-[10px] pb-0" style={{ "--i": ci } as React.CSSProperties}>
            <header className="flex items-center gap-2 px-2 pt-1 text-[13.5px] font-semibold">
              <span aria-hidden className="size-3 rounded-full" style={{ background: c.color }} />{c.stage}
              <span className="rounded-full bg-tile-strong px-2 py-0.5 text-[11px]">{c.count}</span>
              <span className="ml-auto">{c.total}</span>
              <IconButton label={`Add to ${c.stage}`} size={30}><Plus size={14} aria-hidden /></IconButton>
            </header>
            <ul className="t-scroll flex max-h-[470px] flex-col gap-[10px] overflow-y-auto pb-3">
              {c.deals.map(([d, t, co, amt], i) => (
                <li key={t + i} className={`flex min-h-[164px] flex-col rounded-[18px] p-3 ${tone[c.tone]}`}>
                  <div className="flex items-center justify-between text-[11.5px] text-[var(--m)]">Closes {d}
                    <span className="grid size-[28px] place-items-center rounded-full border border-current/25 opacity-80">···</span></div>
                  <h3 className="mt-3 text-[16px] leading-tight font-medium tracking-[-0.02em]">{t}</h3>
                  <p className="mt-1 text-[12px] text-[var(--m)]">{co}</p>
                  <div className="mt-auto flex items-end justify-between">
                    <p className="text-[18px] font-semibold tracking-[-0.03em]">{money(amt)}</p>
                    <AvatarStack people={owners[(ci + i) % 3]} size={24} ringClass="ring-transparent" />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <div className="hidden flex-col gap-[14px] xl:flex">
          <div className="flex flex-1 flex-col items-center justify-center rounded-[22px] border border-dashed border-line-strong text-center">
            <span className="grid size-[48px] place-items-center rounded-full bg-[#5ec39a] text-ink"><Trophy size={18} aria-hidden /></span>
            <p className="mt-3 text-[14px] font-semibold">Won</p><p className="text-[11px] text-muted">4 this month ·</p><p className="text-[11px] font-semibold">$112.6K</p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-[22px] border border-dashed border-line-strong text-center">
            <span className="grid size-[48px] place-items-center rounded-full bg-tile-strong"><X size={18} aria-hidden /></span>
            <p className="mt-3 text-[14px] font-semibold">Lost</p><p className="text-[11px] text-muted">15 closed lost</p>
          </div>
        </div>
      </div>
    </div>
  );
}
