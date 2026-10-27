import { Ellipsis, Plus } from "lucide-react";
import { AvatarStack } from "@/components/ui/Avatar";
import { ExpandButton, PanelTitle } from "@/components/ui/PanelHeader";
import { IconButton } from "@/components/ui/IconButton";
import { money } from "@/lib/format";
import type { Deal } from "@/lib/data";

const tones = {
  neutral: { card: "bg-deal text-deal-fg", muted: "text-deal-muted", ring: "ring-deal", line: "border-deal-line hover:bg-black/5" },
  hot: { card: "bg-deal-hot text-white", muted: "text-white/80", ring: "ring-deal-hot", line: "border-white/35 hover:bg-white/10" },
  yellow: { card: "bg-brand-yellow text-ink", muted: "text-ink/70", ring: "ring-brand-yellow", line: "border-ink/20 hover:bg-black/5" },
  green: { card: "bg-brand-green text-white", muted: "text-white/75", ring: "ring-brand-green", line: "border-white/30 hover:bg-white/10" },
} as const;

export function DealCard({ deal }: { deal: Deal }) {
  const t = tones[deal.tone];
  return (
    <article className={`flex min-h-[242px] flex-col rounded-[22px] px-4 pt-[14px] pb-4 ${t.card}`}>
      <header className="flex items-center justify-between">
        <p className={`text-[12px] ${t.muted}`}>Closes {deal.closes}</p>
        <button
          type="button"
          aria-label={`More options for ${deal.title}`}
          className={`grid size-8 place-items-center rounded-full border transition-colors ${t.line}`}
        >
          <Ellipsis size={15} strokeWidth={2.4} aria-hidden />
        </button>
      </header>
      <div className="mt-[14px]">
        <h3 className="text-[19px] leading-[1.2] font-medium tracking-[-0.02em]">{deal.title}</h3>
        <p className={`mt-[5px] text-[12.5px] ${t.muted}`}>{deal.company}</p>
      </div>
      <footer className="mt-auto flex items-end justify-between">
        <div>
          <p className="text-[22px] leading-none font-semibold tracking-[-0.03em] tabular-nums">{money(deal.amount)}</p>
          <p className="mt-[7px] text-[12px] leading-none">
            {deal.stage} · {deal.probability}%
          </p>
        </div>
        <AvatarStack people={deal.owners} size={24} ringClass={t.ring} />
      </footer>
    </article>
  );
}

export function HotDeals({ deals }: { deals: Deal[] }) {
  return (
    <section aria-labelledby="hot-title" className="panel rise p-[18px] pt-[22px] md:col-span-2 xl:col-span-1 xl:row-span-2" style={{ "--i": 1 } as React.CSSProperties}>
      <div className="flex items-center justify-between gap-3">
        <PanelTitle id="hot-title">Hot deals</PanelTitle>
        <div className="flex items-center gap-2">
          <span className="mr-1 text-[12.5px] text-muted">by weighted value</span>
          <IconButton label="Add deal">
            <Plus size={16} strokeWidth={1.8} aria-hidden />
          </IconButton>
          <ExpandButton label="Open pipeline" />
        </div>
      </div>
      <ul className="mt-[18px] grid grid-cols-1 gap-[13px] sm:grid-cols-2">
        {deals.map((d) => (
          <li key={d.id} className="contents">
            <DealCard deal={d} />
          </li>
        ))}
      </ul>
    </section>
  );
}
