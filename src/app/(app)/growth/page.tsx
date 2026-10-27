import type { Metadata } from "next";
import { ChartNoAxesColumn, Target, TrendingUp } from "lucide-react";
import { PageHeading } from "@/components/ui/PageHeading";
import { Chips } from "@/components/ui/bits";
import { Face } from "@/components/ui/Person";
import { Avatar } from "@/components/ui/Avatar";
import { ExpandButton, PanelTitle } from "@/components/ui/PanelHeader";
import { monotonePath } from "@/lib/chart";
import { growthBars, reps, topCustomers } from "@/lib/pages-data";
import { money } from "@/lib/format";

export const metadata: Metadata = { title: "Growth" };
const cols = ["var(--yellow)", "var(--orange)", "var(--green)"];
const spark = (i: number) => { const v = [0.2 + (i % 3) * 0.1, 0.1, 0.9 - (i % 4) * 0.2, 0.15, 0.2 + (i % 2) * 0.5, 0.1]; return monotonePath(v.map((y, k) => ({ x: 4 + k * 20, y: 30 - y * 24 }))); };

export default function GrowthPage() {
  const seg = [43, 31, 26]; let acc = 0;
  return (
    <div className="flex flex-col gap-[18px]">
      <PageHeading title="Growth Reports" stats={[
        { icon: ChartNoAxesColumn, value: "$500,840", label: "Revenue, last 6 months" }, { icon: TrendingUp, value: "$32,766", label: "Average deal size" }, { icon: Target, value: "76%", label: "Win rate" }]} />
      <div className="flex"><div className="rounded-full bg-control p-1 ring-1 ring-line"><Chips label="Range" options={["Last 6 months", "Last 12 months", "Year to date"]} /></div></div>
      <div className="grid gap-[18px] xl:grid-cols-[1fr_400px]">
        <section aria-labelledby="rv" className="panel rise p-[18px] pt-[22px]">
          <div className="flex items-center justify-between"><PanelTitle id="rv">Revenue by segment</PanelTitle><ExpandButton /></div>
          <p className="mt-4 text-[40px] leading-none font-semibold tracking-[-0.045em]">$500,840</p>
          <svg viewBox="0 0 760 270" className="mt-5 h-auto w-full" role="img" aria-label="Stacked monthly revenue by segment">
            {growthBars.months.map((m, i) => { let y = 230; return <g key={m}>{growthBars.parts.map((p, k) => { const h = p[i] * 1.55; y -= h; return <rect key={k} x={40 + i * 118} y={y} width={92} height={h} rx={k === 2 ? 8 : 2} fill={cols[k]} />; })}<text x={86 + i * 118} y={256} textAnchor="middle" className="fill-muted text-[12px]">{m}</text></g>; })}
          </svg>
          <ul className="mt-2 flex gap-5 text-[12.5px] text-muted">{["SMB", "Mid-market", "Enterprise"].map((s, k) => <li key={s} className="flex items-center gap-2"><i className="size-2 rounded-full" style={{ background: cols[k] }} />{s}</li>)}</ul>
        </section>
        <section aria-labelledby="mx" className="panel rise p-[18px] pt-[22px]" style={{ "--i": 1 } as React.CSSProperties}>
          <PanelTitle id="mx">Segment mix</PanelTitle>
          <svg viewBox="0 0 120 120" className="mx-auto mt-6 size-[190px] -rotate-90" role="img" aria-label="Segment share of revenue">
            {seg.map((s, k) => { const el = <circle key={k} cx="60" cy="60" r="46" fill="none" stroke={cols[k]} strokeWidth="12" strokeDasharray={`${(289 * s) / 100 - 3} 289`} strokeDashoffset={-(289 * acc) / 100} />; acc += s; return el; })}
          </svg>
          <ul className="mt-6">{["SMB", "Mid-market", "Enterprise"].map((s, k) => <li key={s} className="flex items-center justify-between border-t border-line py-[10px] text-[14px] font-semibold first:border-0"><span className="flex items-center gap-2.5"><i className="size-2.5 rounded-full" style={{ background: cols[k] }} />{s}</span>{seg[k]}%</li>)}</ul>
        </section>
      </div>
      <div className="grid gap-[18px] xl:grid-cols-[1fr_711px]">
        <section aria-labelledby="tc" className="panel rise p-[18px] pt-[22px]">
          <div className="flex items-center justify-between"><PanelTitle id="tc">Top customers by revenue won</PanelTitle><ExpandButton /></div>
          <div className="overflow-x-auto"><table className="mt-4 w-full min-w-[560px] text-left text-[14px]">
            <thead className="text-[12.5px] text-muted"><tr><th className="pb-3 font-medium">Customer</th><th className="font-medium">Segment</th><th className="text-right font-medium">Deals</th><th className="text-right font-medium">Revenue</th><th className="pl-6 font-medium">Trend</th></tr></thead>
            <tbody>{topCustomers.map(([n, o, sg, d, r, p], i) => (
              <tr key={n} className="border-t border-line"><td className="py-[10px]"><span className="flex items-center gap-3"><Face name={n} person={p} size={34} tone={i} /><span><b className="block text-[14px] font-semibold">{n}</b><span className="text-[12px] text-muted">{o}</span></span></span></td>
                <td className="font-semibold"><i className="mr-2 inline-block size-[7px] rounded-full" style={{ background: sg === "Enterprise" ? "var(--green)" : "var(--orange)" }} />{sg}</td>
                <td className="text-right">{d}</td><td className="text-right font-semibold tabular-nums">{money(r)}</td>
                <td className="pl-6"><svg viewBox="0 0 108 34" className="h-[30px] w-[88px]" aria-hidden><path d={spark(i)} fill="none" stroke="var(--mint)" strokeWidth="2" strokeLinecap="round" /></svg></td></tr>))}</tbody></table></div>
        </section>
        <section aria-labelledby="rp" className="panel rise p-[18px] pt-[22px]" style={{ "--i": 1 } as React.CSSProperties}>
          <div className="flex items-center justify-between"><PanelTitle id="rp">Rep performance</PanelTitle><ExpandButton /></div>
          <ul className="mt-4">{reps.map(([p, won, q, d, w]) => (
            <li key={p.id} className="grid grid-cols-[1fr_90px_44px_52px] items-center gap-3 border-t border-line py-[13px]">
              <span className="flex items-center gap-3"><Avatar person={p} size={36} /><span className="min-w-0 flex-1"><b className="block text-[14px] font-semibold">{p.name}</b><span className="my-1 block h-1.5 max-w-[200px] rounded-full bg-track"><span className="block h-full rounded-full bg-mint" style={{ width: `${q}%` }} /></span><span className="text-[12px] text-muted">{q}% of 6-month quota</span></span></span>
              <b className="text-right font-semibold tabular-nums">{money(won)}</b><span className="text-center">{d}</span><b className="text-right font-semibold">{w}%</b></li>))}</ul>
        </section>
      </div>
    </div>
  );
}
