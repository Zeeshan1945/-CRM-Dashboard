import type { LucideIcon } from "lucide-react";

export type HeadingStat = {
  icon: LucideIcon;
  value: string;
  label: string;
  badge?: { text: string; tone?: "green" | "yellow" | "muted" };
};

const badgeTone = {
  green: "bg-[var(--badge-green-bg)] text-[var(--badge-green-fg)]",
  yellow: "bg-brand-yellow text-ink",
  muted: "bg-tile-strong text-text",
} as const;

export function PageHeading({ title, stats }: { title: string; stats: HeadingStat[] }) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-[61px]">
      <h1 className="text-[34px] leading-[1.08] font-medium tracking-[-0.035em] lg:w-min lg:shrink-0 lg:text-display">
        {title}
      </h1>
      <ul className="flex flex-wrap gap-x-[50px] gap-y-4">
        {stats.map(({ icon: Icon, value, label, badge }) => (
          <li key={label} className="flex items-center gap-[13px]">
            <span aria-hidden className="grid size-[46px] shrink-0 place-items-center rounded-full border border-line bg-control">
              <Icon size={17} strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-stat leading-[1.2] font-semibold tracking-[-0.025em]">
                {value}
                {badge ? (
                  <span
                    className={`rounded-full px-[9px] py-[3px] text-[11.5px] leading-none font-semibold tracking-normal ${badgeTone[badge.tone ?? "green"]}`}
                  >
                    {badge.text}
                  </span>
                ) : null}
              </p>
              <p className="mt-px max-w-[170px] text-[12.5px] leading-[1.25] text-muted">{label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
