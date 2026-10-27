import { moneyShort } from "@/lib/format";
import { MoreButton, PanelTitle } from "@/components/ui/PanelHeader";

type Props = { won: number; target: number; daysLeft: number; label: string };

export function TeamQuota({ won, target, daysLeft, label }: Props) {
  const pct = Math.round((won / target) * 100);
  const perDay = (target - won) / daysLeft;
  const R = 71;
  const C = 2 * Math.PI * R;
  return (
    <section
      aria-labelledby="quota-title"
      className="rise flex min-h-[390px] flex-col rounded-[26px] bg-brand-green px-[18px] pt-[22px] pb-5 text-white"
      style={{ "--i": 2 } as React.CSSProperties}
    >
      <div className="flex items-center justify-between">
        <PanelTitle id="quota-title">Team quota</PanelTitle>
        <MoreButton />
      </div>

      <div className="relative mx-auto mt-6 size-[158px]" role="img" aria-label={`${pct}% of ${label} quota won`}>
        <svg viewBox="0 0 158 158" className="size-full -rotate-90">
          <circle cx="79" cy="79" r={R} fill="none" stroke="rgb(255 255 255 / 0.14)" strokeWidth="9" />
          <circle
            cx="79"
            cy="79"
            r={R}
            fill="none"
            stroke="var(--yellow)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={`${(C * pct) / 100} ${C}`}
          />
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <p className="text-[38px] leading-none font-semibold tracking-[-0.04em]">{pct}%</p>
          <p className="mt-[3px] text-[13px] text-white/75">of {label} quota</p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-3 text-center">
        {[
          ["Won", moneyShort(won)],
          ["Quota", moneyShort(target)],
          ["Days left", String(daysLeft)],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-[12px] text-white/70">{k}</dt>
            <dd className="mt-0.5 text-[16px] leading-none font-semibold tracking-[-0.02em]">{v}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-auto rounded-[16px] bg-white/10 py-[11px] text-center text-[13px]">
        Needs <b className="font-semibold">{moneyShort(perDay)}</b> a day to land it
      </p>
    </section>
  );
}
