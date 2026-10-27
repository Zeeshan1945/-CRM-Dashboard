"use client";

import { useId, useMemo, useState, type KeyboardEvent, type PointerEvent } from "react";
import { monotonePath, type Pt } from "@/lib/chart";
import { money, moneyShort } from "@/lib/format";
import { ExpandButton, MoreButton, PanelTitle } from "@/components/ui/PanelHeader";

type Point = { month: string; won: number };
type Range = 6 | 12;

// Geometry in CSS px; the SVG scales with its container via viewBox.
const W = 768;
const H = 253;
const PLOT = { left: 44, right: 756, top: 12, bottom: 227 };
const Y_MAX = 200_000;
const y = (v: number) => PLOT.bottom - (v / Y_MAX) * (PLOT.bottom - PLOT.top);

export function RevenueCard({ series, target }: { series: readonly Point[]; target: number }) {
  const [range, setRange] = useState<Range>(12);
  const [active, setActive] = useState<number | null>(null);
  const uid = useId().replace(/:/g, "");

  const data = useMemo(() => series.slice(series.length - range), [series, range]);
  const total = useMemo(() => data.reduce((s, d) => s + d.won, 0), [data]);
  const hitTarget = useMemo(() => data.filter((d) => d.won >= target).length, [data, target]);

  const pts: Pt[] = useMemo(
    () =>
      data.map((d, i) => ({
        x: PLOT.left + (i * (PLOT.right - PLOT.left)) / (data.length - 1),
        y: y(d.won),
      })),
    [data],
  );
  const line = useMemo(() => monotonePath(pts), [pts]);
  const area = `${line}L${PLOT.right},${PLOT.bottom}L${PLOT.left},${PLOT.bottom}Z`;
  const targetY = y(target);

  function indexFromX(clientX: number, el: Element) {
    const r = el.getBoundingClientRect();
    const px = ((clientX - r.left) / r.width) * W;
    const t = (px - PLOT.left) / (PLOT.right - PLOT.left);
    return Math.min(data.length - 1, Math.max(0, Math.round(t * (data.length - 1))));
  }

  function onMove(e: PointerEvent<HTMLDivElement>) {
    setActive(indexFromX(e.clientX, e.currentTarget));
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") setActive((a) => Math.min(data.length - 1, (a ?? -1) + 1));
    else if (e.key === "ArrowLeft") setActive((a) => Math.max(0, (a ?? data.length) - 1));
    else if (e.key === "Escape") setActive(null);
    else return;
    e.preventDefault();
  }

  const act = active !== null ? data[active] : null;
  const actPt = active !== null ? pts[active] : null;

  return (
    <section aria-labelledby="rev-title" className="panel rise flex flex-col px-[18px] pt-[22px] pb-[22px] md:col-span-2">
      <div className="flex items-center justify-between gap-3">
        <PanelTitle id="rev-title">Revenue</PanelTitle>
        <div className="flex items-center gap-2">
          <div role="group" aria-label="Date range" className="flex rounded-full bg-control p-[3px] ring-1 ring-line">
            {([6, 12] as const).map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={range === r}
                onClick={() => {
                  setRange(r);
                  setActive(null);
                }}
                className={`h-8 min-w-[47px] rounded-full px-[14px] text-[13px] font-semibold transition-colors duration-200 ${
                  range === r ? "bg-tile-strong text-text" : "text-muted hover:text-text"
                }`}
              >
                {r}M
              </button>
            ))}
          </div>
          <MoreButton />
          <ExpandButton />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="text-[43px] leading-[40px] font-semibold tracking-[-0.045em] tabular-nums">{money(total)}</p>
        <p className="text-[13px] text-muted">
          won in {range} months · <b className="font-semibold text-text">{hitTarget}</b> of {range} at target
        </p>
      </div>

      <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-muted" aria-label="Legend">
        <li className="flex items-center gap-2">
          <span aria-hidden className="size-2 rounded-full bg-[var(--chart-line)]" />
          Won revenue
        </li>
        <li className="flex items-center gap-2">
          <svg aria-hidden width="18" height="2" viewBox="0 0 18 2" className="text-[var(--chart-target)]">
            <line x1="0" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
          </svg>
          Monthly target · {moneyShort(target)}
        </li>
      </ul>

      <div
        className="relative mt-[9px] touch-pan-y outline-offset-4 select-none"
        tabIndex={0}
        role="group"
        aria-label="Revenue chart. Use left and right arrow keys to inspect each month."
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setActive(null)}
        onKeyDown={onKey}
        onBlur={() => setActive(null)}
      >
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id={`fill-${uid}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--chart-fill-top)" />
              <stop offset="1" stopColor="var(--chart-fill-top)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 100_000, 200_000].map((v) => (
            <g key={v}>
              <line
                x1={PLOT.left - 5}
                x2={PLOT.right}
                y1={y(v)}
                y2={y(v)}
                stroke="var(--chart-grid)"
                strokeWidth="1"
                strokeDasharray={v === 0 ? undefined : "1 4"}
                strokeLinecap="round"
              />
              <text x={36} y={y(v) + 4} textAnchor="end" className="fill-muted text-[11.5px]">
                {v === 0 ? "$0" : `$${v / 1000}K`}
              </text>
            </g>
          ))}

          <path d={area} fill={`url(#fill-${uid})`} />
          <path
            key={range}
            d={line}
            fill="none"
            stroke="var(--chart-line)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            className="[animation:draw_1100ms_cubic-bezier(.3,.7,.2,1)_both] [--len:1]"
          />
          <line
            x1={PLOT.left}
            x2={PLOT.right}
            y1={targetY}
            y2={targetY}
            stroke="var(--chart-target)"
            strokeWidth="1.6"
            strokeDasharray="8 6"
          />

          {pts.map((p, i) => (
            <text key={data[i].month} x={p.x} y={249} textAnchor="middle" className="fill-muted text-[11.5px]">
              {data[i].month}
            </text>
          ))}

          {actPt ? (
            <g>
              <line x1={actPt.x} x2={actPt.x} y1={PLOT.top} y2={PLOT.bottom} stroke="var(--chart-grid)" strokeWidth="1.2" />
              <circle cx={actPt.x} cy={actPt.y} r="4" fill="var(--chart-line)" stroke="var(--tooltip-bg)" strokeWidth="1.5" />
            </g>
          ) : null}
        </svg>

        {act && actPt ? (
          <div
            role="status"
            className="pointer-events-none absolute top-0 z-10 w-[127px] -translate-x-1/2 translate-y-0 rounded-[14px] border border-white/10 bg-[var(--tooltip-bg)] px-[12px] py-[12px] text-[#fbf8f2] shadow-[0_18px_30px_-12px_rgb(0_0_0/0.6)]"
            style={{ left: `clamp(64px, ${(actPt.x / W) * 100}%, calc(100% - 64px))` }}
          >
            <p className="text-[12.5px] font-semibold">{act.month}</p>
            <p className="mt-1 flex items-center justify-between gap-2 text-[12px]">
              <span className="flex items-center gap-1.5 text-[#fbf8f2]/70">
                <span aria-hidden className="size-[7px] rounded-full bg-[#e8532b]" />
                Won
              </span>
              <b className="font-semibold">{moneyShort(act.won)}</b>
            </p>
            <p className="mt-0.5 flex items-center justify-between gap-2 text-[12px]">
              <span className="flex items-center gap-1.5 text-[#fbf8f2]/70">
                <span aria-hidden className="size-[7px] rounded-full bg-[#f4f0e8]" />
                Target
              </span>
              <b className="font-semibold">{moneyShort(target)}</b>
            </p>
          </div>
        ) : null}

        <table className="sr-only">
          <caption>Revenue won per month against the monthly team target</caption>
          <thead>
            <tr>
              <th scope="col">Month</th>
              <th scope="col">Won</th>
              <th scope="col">Target</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.month}>
                <th scope="row">{d.month}</th>
                <td>{money(d.won)}</td>
                <td>{money(target)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
