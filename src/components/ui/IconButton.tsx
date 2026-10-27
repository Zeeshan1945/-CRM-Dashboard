import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button"> & {
  label: string;
  size?: number;
  tone?: "default" | "onLight";
};

/** Round icon-only control. `label` is mandatory (accessible name). */
export function IconButton({ label, size = 39, tone = "default", className = "", children, style, ...rest }: Props) {
  const tones =
    tone === "onLight"
      ? "border-deal-line bg-transparent text-current hover:bg-black/5"
      : "";
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`ctl ${tones} ${className}`}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
