import { ExpandButton, PanelTitle } from "@/components/ui/PanelHeader";
import { money, moneyShort } from "@/lib/format";
import type { stageMix as stageMixData } from "@/lib/data";

type Stage = (typeof stageMixData)[number];

export function StageMix({ stages }: { stages: readonly Stage[] }) {
  const total = stages.reduce((s, x) => s + x.value, 0);
  const deals = stages.reduce((s, x) => s + x.deals, 0);
  return (
    <section aria-labelledby="stage-title" className="panel rise min-h-[390px] px-[18px] pt-[22px] pb-4" style={{ "--i": 3 } as React.CSSProperties}>
      <div className="flex items-center justify-between">
        <PanelTitle id="stage-title">Stage mix</PanelTitle>
        <ExpandButton label="Open pipeline" />
      </div>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-3">
        <p className="text-[27px] leading-[1.2] font-medium tracking-[-0.035em] tabular-nums">{money(total)}</p>
        <p className="text-[12.5px] text-muted">open across {deals} deals</p>
      </div>

      <div className="mt-[19px] flex h-12 gap-[5px]" role="img" aria-label="Share of open pipeline value by stage">
        {stages.map((s) => (
          <div key={s.stage} className="rounded-[14px]" style={{ flexGrow: s.value, flexBasis: 0, background: s.color }} />
        ))}
      </div>

      <table className="mt-6 w-full border-separate border-spacing-0 text-[13.5px]">
        <thead className="sr-only">
          <tr>
            <th>Stage</th>
            <th>Deals</th>
            <th>Value</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {stages.map((s, i) => (
            <tr key={s.stage}>
              <th scope="row" className={`h-[38px] text-left font-medium ${i ? "border-t border-line" : ""}`}>
                <span className="flex items-center gap-2.5">
                  <span aria-hidden className="size-2.5 rounded-full" style={{ background: s.color }} />
                  {s.stage}
                </span>
              </th>
              <td className={`text-right font-semibold tabular-nums ${i ? "border-t border-line" : ""}`}>{s.deals}</td>
              <td className={`w-[74px] text-right text-[13px] tabular-nums ${i ? "border-t border-line" : ""}`}>{moneyShort(s.value)}</td>
              <td className={`w-[52px] text-right text-[13px] text-muted tabular-nums ${i ? "border-t border-line" : ""}`}>{s.share}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
