import { Avatar } from "@/components/ui/Avatar";
import { ExpandButton, MoreButton, PanelTitle } from "@/components/ui/PanelHeader";
import { money } from "@/lib/format";
import type { leaderboard as lb } from "@/lib/data";

type Row = (typeof lb)[number];

export function Leaderboard({ rows }: { rows: Row[] }) {
  return (
    <section aria-labelledby="lb-title" className="panel rise p-[18px] pt-[22px]" style={{ "--i": 4 } as React.CSSProperties}>
      <div className="flex items-center justify-between gap-3">
        <PanelTitle id="lb-title">Team leaderboard</PanelTitle>
        <div className="flex items-center gap-2">
          <span className="mr-1 text-[13px] text-muted">Won this month</span>
          <MoreButton />
          <ExpandButton />
        </div>
      </div>
      <ol className="mt-[18px] flex flex-col gap-1">
        {rows.map((r, i) => (
          <li
            key={r.person.id}
            className={`grid grid-cols-[16px_35px_1fr] items-center gap-x-3 rounded-[18px] px-2 py-[11px] ${i === 0 ? "bg-row-active" : ""}`}
          >
            <span className="text-center text-[13px] font-semibold">{i + 1}</span>
            <Avatar person={r.person} size={35} />
            <div className="min-w-0">
              <div className="flex items-baseline justify-between gap-3">
                <p className="truncate text-[14.5px] leading-tight font-semibold tracking-[-0.015em]">{r.person.name}</p>
                <p className="text-[14.5px] font-semibold tabular-nums">{money(r.won)}</p>
              </div>
              <div
                className="mt-[7px] h-1.5 overflow-hidden rounded-full bg-track"
                role="progressbar"
                aria-label={`${r.person.name} monthly quota`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.min(100, r.pct)}
              >
                <div
                  className={`h-full rounded-full ${i === 0 ? "bg-accent" : "bg-bar-fill"}`}
                  style={{ width: `${Math.min(100, r.pct)}%` }}
                />
              </div>
              <p className="mt-[6px] text-[12px] leading-none text-muted">
                {r.pct}% of monthly quota · {r.deals} {r.deals === 1 ? "deal" : "deals"}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
