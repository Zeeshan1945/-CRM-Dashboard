import type { Metadata } from "next";
import { ChevronLeft, ChevronRight, Clock, Plus, Zap, CalendarDays } from "lucide-react";
import { PageHeading } from "@/components/ui/PageHeading";
import { Chips, Seg } from "@/components/ui/bits";
import { Avatar } from "@/components/ui/Avatar";
import { MoreButton } from "@/components/ui/PanelHeader";
import { team } from "@/lib/team";

export const metadata: Metadata = { title: "Schedule" };
const c = { call: "var(--mint)", meeting: "var(--orange)", task: "var(--cream)", email: "var(--yellow)" } as const;
type K = keyof typeof c;
const ev: Record<string, [string, string, K, boolean?][]> = {
  "10-16": [["11a", "Prepare pricing", "task", true], ["1:30p", "Prepare proposal", "task", true]],
  "10-17": [["9:30a", "Discovery call", "call"], ["12p", "Check in on pilot", "call"]],
  "10-19": [["12p", "Draft contract", "task", true]],
  "10-20": [["1p", "Discovery call", "call"], ["1:30p", "Renewal conv.", "call"]],
  "10-21": [["2p", "Security walkthrough", "meeting"]],
  "10-22": [["11:30a", "Send revised", "email", true]],
  "10-23": [["12:30p", "Discovery call", "call", true]],
  "10-24": [["1:30p", "Update account", "task", true]],
  "10-25": [["10:30a", "Renewal email", "email", true], ["12p", "Renewal conv.", "call", true]],
  "10-26": [["10a", "Draft contract", "task"], ["10:30a", "Discovery call", "call"]],
  "10-27": [["9:30a", "Renewal conv.", "call"], ["10a", "Security walkthrough", "meeting"]],
  "10-28": [["10:30a", "Draft contract", "task"], ["11:30a", "Product demo", "task"]],
  "10-29": [["9a", "Team stand-up", "meeting"], ["9a", "Coaching 1:1", "meeting"]],
  "10-30": [["9a", "Send revised", "email"], ["2p", "Prepare pricing", "task"]],
  "10-31": [["9a", "Team stand-up", "meeting"], ["9:30a", "Quarterly review", "meeting"]],
  "11-1": [["10a", "Forecast call", "meeting"], ["12p", "Prepare pricing", "task"]],
  "11-2": [["1:30p", "Check in on pilot", "call"], ["2p", "Send revised", "email"]],
  "11-3": [["9a", "Team stand-up", "meeting"], ["12:30p", "Draft contract", "task"]],
  "11-4": [["4p", "Draft contract", "task"], ["4p", "Discovery call", "call"]],
  "11-5": [["10a", "Share case study", "email"], ["10a", "Pipeline review", "meeting"]],
  "11-6": [["4:30p", "Update account", "task"]],
  "11-7": [["9a", "Kick-off workshop", "meeting"]],
  "11-8": [["9a", "Send revised", "email"], ["12p", "Quarterly review", "meeting"]],
};
const days = Array.from({ length: 42 }, (_, i) => { const d = new Date(2026, 8, 28 + i); return { d: d.getDate(), key: `${d.getMonth() + 1}-${d.getDate()}`.replace(/^9-/, "x-"), m: d.getMonth() }; });
const tasks = [["Draft contract redlines", "10:00 AM", "Task", "Tidewater Freight", team.hanna], ["Discovery call", "10:30 AM", "Call", "Tidewater Freight", team.sofia], ["Kick-off workshop", "11:30 AM", "Meeting", "Orchard Row Bank", team.rohan], ["Check in on pilot", "4:30 PM", "Call", "Fennick & Rowe", team.theo]] as const;
const overdue = [["Security walkthrough", "Wed, Oct 21, 2:00 PM", "Meeting", "Brisa Travel", team.theo], ["Renewal conversation", "Tue, Oct 20, 1:30 PM", "Call", "Lumio Solar", team.amara], ["Discovery call", "Tue, Oct 20, 1:00 PM", "Call", "Aldercrest Hotels", team.rohan], ["Check in on pilot", "Sat, Oct 17, 12:00 PM", "Call", "Bell & Birch Joinery", team.theo]] as const;

function Row({ t }: { t: readonly [string, string, string, string, typeof team.sofia] }) {
  return (
    <li className="flex items-center gap-3 rounded-[18px] bg-tile p-[14px]">
      <span aria-hidden className="size-[20px] shrink-0 rounded-[7px] border border-line-strong" />
      <div className="min-w-0 flex-1"><p className="truncate text-[14.5px] font-semibold">{t[0]}</p>
        <p className="mt-1 text-[12px] text-muted">{t[1]} · {t[2]}</p><p className="text-[12px] text-muted">{t[3]}</p></div>
      <Avatar person={t[4]} size={28} /><span aria-hidden className="text-muted">···</span>
    </li>
  );
}

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-[18px]">
      <PageHeading title="Team Schedule" stats={[
        { icon: CalendarDays, value: "4", label: "Tasks today" }, { icon: Clock, value: "22", label: "This week" }, { icon: Zap, value: "6", label: "Overdue, unfinished" }]} />
      <div className="flex flex-wrap items-center gap-2">
        <Chips label="Teammate" options={["Everyone", "Sofia", "Theo", "Amara", "Rohan", "Hanna"]} />
        <span aria-hidden className="mx-1 h-5 w-px bg-line-strong" />
        <Chips label="Type" options={["Calls", "Meetings", "Tasks", "Emails"]} initial={-1} />
        <button type="button" className="btn-primary ml-auto h-[43px] px-5 text-[13.5px]"><Plus size={15} aria-hidden />New task</button>
      </div>
      <div className="grid gap-[18px] xl:grid-cols-[1fr_340px]">
        <section aria-label="Calendar" className="panel rise p-[18px]">
          <div className="flex items-center justify-between"><h2 className="text-[19px] font-semibold tracking-[-0.02em]">October 2026</h2>
            <div className="flex items-center gap-2"><button type="button" aria-label="Previous" className="ctl size-[34px]"><ChevronLeft size={15} /></button>
              <button type="button" className="ctl h-[34px] px-4 text-[13px] font-semibold">Today</button>
              <button type="button" aria-label="Next" className="ctl size-[34px]"><ChevronRight size={15} /></button>
              <Seg label="Range" options={["Month", "Week"]} /><MoreButton /></div></div>
          <div className="mt-4 grid grid-cols-7 gap-[6px]" role="grid" aria-label="October 2026">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <div key={d} role="columnheader" className="px-3 pb-1 text-[12px] text-muted">{d}</div>)}
            {days.map((x, i) => {
              const k = x.m === 8 ? "" : `${x.m + 1}-${x.d}`; const e = ev[k] ?? []; const today = k === "10-26"; const out = x.m !== 9;
              return (
                <div key={i} role="gridcell" className={`min-h-[104px] rounded-[16px] border border-line p-2 text-[12px] ${today ? "bg-primary text-primary-fg" : e.length ? "bg-[rgb(230_190_90/.12)]" : "bg-tile"} ${out ? "opacity-60" : ""}`}>
                  <span className={`font-semibold ${today ? "inline-grid size-[24px] place-items-center rounded-full border-2 border-ink" : "pl-1"}`}>{x.d}</span>
                  <ul className="mt-1 flex flex-col gap-1">{e.slice(0, 2).map(([t, n, kind, dn]) => (
                    <li key={n + t} className={`flex items-center gap-1.5 truncate rounded-full px-2 py-[3px] text-[11px] ${today ? "bg-black/5" : "bg-black/25 text-text"} ${dn ? "line-through opacity-60" : ""}`}>
                      <i className="size-[7px] shrink-0 rounded-full" style={{ background: c[kind] }} />{t} {n}</li>))}</ul>
                  {e.length > 2 ? <p className="mt-1 pl-1 text-[11px] text-muted">+{e.length - 2} more</p> : null}
                </div>);
            })}
          </div>
        </section>
        <aside aria-label="Today" className="panel rise p-[18px]" style={{ "--i": 2 } as React.CSSProperties}>
          <div className="flex items-start justify-between"><div><h2 className="text-[19px] font-semibold">Today</h2><p className="text-[12.5px] text-muted">Monday, Oct 26 · 0/4 done</p></div>
            <button type="button" aria-label="Add task" className="ctl size-[36px]"><Plus size={15} /></button></div>
          <ul className="mt-4 flex flex-col gap-2">{tasks.map((t) => <Row key={t[0]} t={t} />)}</ul>
          <h3 className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-[14px] font-semibold"><Zap size={14} className="text-accent-text" aria-hidden />Overdue <span className="rounded-full bg-deal-hot px-2 py-0.5 text-[11px] text-white">6</span></h3>
          <ul className="mt-3 flex flex-col gap-2">{overdue.map((t) => <Row key={t[0] + t[1]} t={t} />)}</ul>
          <p className="mt-4 text-[12.5px] text-muted">+2 more — filter by teammate to see them all</p>
        </aside>
      </div>
    </div>
  );
}
