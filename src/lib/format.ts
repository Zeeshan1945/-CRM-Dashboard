const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** $1,014,640 */
export const money = (n: number) => usd.format(n);

/** $112.6K, $1.2M, $57.9K — one decimal, trailing .0 dropped */
export function moneyShort(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `$${trim(n / 1_000_000)}M`;
  if (abs >= 1_000) return `$${trim(n / 1_000)}K`;
  return `$${Math.round(n)}`;
}

const trim = (n: number) => n.toFixed(1).replace(/\.0$/, "");
