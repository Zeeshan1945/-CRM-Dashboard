import type { Metadata } from "next";
import { ArrowUpRight, ChevronDown, Clock, CreditCard, Plus, ReceiptText } from "lucide-react";
import { PageHeading } from "@/components/ui/PageHeading";
import { Chips, SearchBox, Seg } from "@/components/ui/bits";
import { Face } from "@/components/ui/Person";
import { ExpandButton, MoreButton, PanelTitle } from "@/components/ui/PanelHeader";
import { monotonePath } from "@/lib/chart";
import { aging, cashflow, invoices } from "@/lib/pages-data";
import { money } from "@/lib/format";

export const metadata: Metadata = { title: "Finance" };
const W = 780, H = 300, L = 44, R = 770, T = 20, B = 250;
const pt = (v: number, i: number, n: number) => ({ x: L + (i * (R - L)) / (n - 1), y: B - (v / 200) * (B - T) });
const st = { Paid: "var(--mint)", Draft: "var(--text-faint)", Due: "var(--yellow)" } as const;

export default function FinancePage() {
  const col = cashflow.collected.map((v, i) => pt(v, i, 6)), inv = cashflow.invoiced.map((v, i) => pt(v, i, 6));
  return (
    <div className="flex flex-col gap-[18px]">
      <PageHeading title={"Revenue\u00A0& Invoices"} stats={[
        { icon: CreditCard, value: "$133,010", label: "Collected this month" }, { icon: ReceiptText, value: "$59,840", label: "Outstanding, not yet due" },
        { icon: Clock, value: "$73,400", label: "Overdue", badge: { text: "3 late", tone: "green" } }]} />
      <div className="grid gap-[18px] xl:grid-cols-[1fr_430px]">
        <section aria-labelledby="cf" className="panel rise p-[18px] pt-[22px]">
          <div className="flex items-center justify-between"><PanelTitle id="cf">Cash flow</PanelTitle><div className="flex items-center gap-2"><Seg label="Range" options={["6M", "12M"]} /><MoreButton /><ExpandButton /></div></div>
          <p className="mt-5 flex flex-wrap items-baseline gap-3 text-[40px] leading-none font-semibold tracking-[-0.045em]">$371,790 <span className="text-[13px] font-medium tracking-normal text-muted">collected in 6 months · 74% of $500.8K invoiced</span></p>
          <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 h-auto w-full" role="img" aria-label="Collected versus invoiced over six months">
            {[0, 100, 200].map((v) => <g key={v}><line x1={L} x2={R} y1={B - (v / 200) * (B - T)} y2={B - (v / 200) * (B - T)} stroke="var(--chart-grid)" strokeDasharray="1 4" /><text x={36} y={B - (v / 200) * (B - T) + 4} textAnchor="end" className="fill-muted text-[11.5px]">{v ? `$${v}K` : "$0"}</text></g>)}
            <path d={monotonePath(inv)} fill="none" stroke="var(--chart-target)" strokeWidth="1.8" strokeDasharray="6 5" />
            <path d={monotonePath(col)} fill="none" stroke="var(--mint)" strokeWidth="2.4" strokeLinecap="round" />
            {cashflow.months.map((m, i) => <text key={m} x={col[i].x} y={272} textAnchor="middle" className="fill-muted text-[11.5px]">{m}</text>)}
          </svg>
          <ul className="mt-2 flex gap-5 text-[12.5px] text-muted"><li className="flex items-center gap-2"><i className="size-2 rounded-full bg-mint" />Collected</li><li>--- Invoiced</li></ul>
        </section>
        <section aria-labelledby="ag" className="panel rise p-[18px] pt-[22px]" style={{ "--i": 1 } as React.CSSProperties}>
          <div className="flex items-center justify-between"><PanelTitle id="ag">Aging</PanelTitle><div className="flex gap-2"><MoreButton /><ExpandButton /></div></div>
          <p className="mt-4 text-[12.5px] text-muted">Unpaid invoices by age since issue</p>
          <div className="mt-4 grid grid-cols-4 gap-3">{aging.map((a) => (
            <div key={a.label} className="text-center"><div className="flex h-[136px] items-end rounded-[16px] bg-tile"><div className="w-full rounded-[14px]" style={{ height: `${Math.max(a.h * 100, 4)}%`, background: a.label === "90+" ? "var(--orange)" : "var(--seg-neutral)", opacity: a.label === "61–90" ? 0.85 : 1 }} /></div>
              <p className="mt-2 text-[12px] text-muted">{a.label}</p></div>))}</div>
          <ul className="mt-4">{aging.map((a, i) => <li key={a.label} className={`flex items-center justify-between py-[10px] text-[14px] font-semibold ${i ? "border-t border-line" : ""}`}><span className="flex items-center gap-2.5"><i className="size-2.5 rounded-[3px]" style={{ background: a.label === "90+" ? "var(--orange)" : "var(--text)" }} />{a.days}</span><span><span className="mr-3 text-[12.5px] font-medium text-muted">{a.n} {a.n === 1 ? "invoice" : "invoices"}</span>{money(a.amt)}</span></li>)}</ul>
        </section>
      </div>
      <section aria-labelledby="inv" className="panel rise p-[18px] pt-[22px]" style={{ "--i": 2 } as React.CSSProperties}>
        <div className="flex items-center justify-between"><PanelTitle id="inv">Invoices</PanelTitle><div className="flex items-center gap-2"><button type="button" className="btn-primary h-[39px] px-4 text-[13px]"><Plus size={14} aria-hidden />New invoice</button><MoreButton /><ExpandButton /></div></div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><div className="rounded-full bg-control p-1 ring-1 ring-line"><Chips label="Status" options={["All", "Draft", "Due", "Overdue", "Paid"]} /></div><SearchBox placeholder="Number or customer" className="w-[300px]" /></div>
        <p className="mt-3 text-[12.5px] text-muted">47 invoices · $1,023,140</p>
        <div className="overflow-x-auto"><table className="mt-3 w-full min-w-[820px] text-left text-[14px]">
          <thead className="text-[12.5px] text-muted"><tr>{["Invoice", "Customer", "Issued", "Due", "Amount", "Status", ""].map((h, i) => <th key={i} scope="col" className={`pb-3 font-medium ${i === 4 ? "text-right" : ""}`}>{h}</th>)}</tr></thead>
          <tbody>{invoices.map(([n, co, who, iss, due, sub, amt, s, p], i) => (
            <tr key={n} className="border-t border-line transition-colors hover:bg-row-hover"><th scope="row" className="py-3 pl-1 font-semibold">{n}</th>
              <td><span className="flex items-center gap-3"><Face name={who} person={p} size={30} tone={i} /><span><b className="block text-[13.5px] font-semibold">{co}</b><span className="text-[12px] text-muted">{who}</span></span></span></td>
              <td className="font-semibold">{iss}</td><td><b className="block text-[13.5px] font-semibold">{due}</b><span className="text-[12px] text-muted">{sub}</span></td>
              <td className="text-right font-semibold tabular-nums">{money(amt)}</td>
              <td className="pl-5"><span className="inline-flex items-center gap-2 rounded-full bg-tile px-3 py-1 text-[12.5px] font-semibold"><i className="size-1.5 rounded-full" style={{ background: st[s] }} />{s}</span></td>
              <td className="text-right text-muted">···</td></tr>))}</tbody></table></div>
        <div className="mt-4 text-center"><button type="button" className="ctl h-[38px] gap-2 px-4 text-[13px] font-semibold">Show all 47 <ChevronDown size={14} aria-hidden /></button></div>
      </section>
    </div>
  );
}
