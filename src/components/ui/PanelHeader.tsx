import { Ellipsis, ArrowUpRight } from "lucide-react";
import { IconButton } from "./IconButton";

export function MoreButton({ label = "More options" }: { label?: string }) {
  return (
    <IconButton label={label} size={39}>
      <Ellipsis size={16} strokeWidth={2.4} aria-hidden />
    </IconButton>
  );
}

export function ExpandButton({ label = "Open full view" }: { label?: string }) {
  return (
    <IconButton label={label} size={39}>
      <ArrowUpRight size={15} strokeWidth={2} aria-hidden />
    </IconButton>
  );
}

export function PanelTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-[15.5px] leading-none font-semibold tracking-[-0.015em]">
      {children}
    </h2>
  );
}
