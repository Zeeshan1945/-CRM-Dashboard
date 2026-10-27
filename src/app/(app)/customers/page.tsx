import type { Metadata } from "next";
import { ChartNoAxesColumn, Download, ListFilter, Mail, Phone, Plus, Star, Users } from "lucide-react";
import { PageHeading } from "@/components/ui/PageHeading";
import { Chips, Seg, SearchBox } from "@/components/ui/bits";
import { Face } from "@/components/ui/Person";
import { customers } from "@/lib/pages-data";
import { money } from "@/lib/format";

export const metadata: Metadata = { title: "Customers" };
const bar = (s: number) => (s >= 80 ? "var(--green)" : s >= 62 ? "var(--yellow)" : "var(--orange)");

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-[18px]">
      <PageHeading title="Customer Directory" stats={[
        { icon: Users, value: "24", label: "Customers in your book", badge: { text: "+4 this week", tone: "yellow" } },
        { icon: Phone, value: "18", label: "Contacted in the last 7 days", badge: { text: "75%", tone: "muted" } },
        { icon: ChartNoAxesColumn, value: "$1,125,237", label: "Open pipeline across the book" },
      ]} />
      <div className="flex flex-wrap items-center gap-2">
        <SearchBox placeholder="Search name, company, city…" className="w-[320px]" />
        <Chips label="Segment" options={["All", "Enterprise", "Mid-market", "SMB"]} />
        <div className="ml-auto flex items-center gap-3">
          <button type="button" className="ctl h-[39px] gap-2 px-4 text-[13px] font-semibold"><ListFilter size={15} aria-hidden />Last contacted</button>
          <Seg label="Layout" options={["Grid", "Table"]} />
          <button type="button" className="ctl h-[39px] gap-2 px-4 text-[13px] font-semibold"><Download size={15} aria-hidden />Export</button>
          <button type="button" className="btn-primary h-[43px] px-5 text-[13.5px]"><Plus size={15} aria-hidden />New customer</button>
        </div>
      </div>
      <ul className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {customers.map((c, i) => (
          <li key={c.name} className="panel rise flex flex-col p-[18px]" style={{ "--i": i % 10 } as React.CSSProperties}>
            <div className="flex items-start justify-between">
              <Face name={c.name} person={c.person} size={48} tone={i} />
              <button type="button" aria-label={c.star ? "Unstar" : "Star"} aria-pressed={!!c.star}
                className={`grid size-[32px] place-items-center rounded-full border border-line-strong ${c.star ? "border-transparent bg-brand-yellow text-ink" : ""}`}>
                <Star size={14} fill={c.star ? "currentColor" : "none"} aria-hidden /></button>
            </div>
            <h3 className="mt-3 text-[16.5px] font-semibold tracking-[-0.02em]">{c.name}</h3>
            <p className="mt-1 text-[13px] leading-snug text-muted">{c.role} · {c.org}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 rounded-[14px] bg-tile px-3 py-[10px]">
              <p className="text-[11.5px] text-muted">Open pipeline<b className="mt-0.5 block text-[14px] font-semibold text-text">{c.pipe ? money(c.pipe) : "—"}</b></p>
              <p className="text-[11.5px] text-muted">Last contact<b className="mt-0.5 block text-[14px] font-semibold text-text">{c.last}</b></p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[12px] font-semibold">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-track" role="progressbar" aria-label="Relationship score" aria-valuenow={c.score} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full rounded-full" style={{ width: `${c.score}%`, background: bar(c.score) }} /></div>{c.score}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-full bg-tile-strong px-3 py-[6px] text-[12px] font-semibold">{c.seg}</span>
              <span className="ml-auto" />
              <button type="button" aria-label={`Email ${c.name}`} className="ctl size-[32px]"><Mail size={14} aria-hidden /></button>
              <button type="button" aria-label={`Call ${c.name}`} className="ctl size-[32px]"><Phone size={14} aria-hidden /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
