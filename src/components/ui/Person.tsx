import { Avatar } from "./Avatar";
import type { Person } from "@/lib/team";

const tones = ["#cfe8dc", "#f4c9b8", "#d9d3f0", "#f3dfa6"];

/** Photo when we have one, initials disc otherwise. */
export function Face({ name, person, size = 30, tone = 0 }: { name: string; person?: Person; size?: number; tone?: number }) {
  if (person) return <Avatar person={person} size={size} />;
  const ini = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <span aria-hidden className="grid shrink-0 place-items-center rounded-full font-semibold text-[#17191a]"
      style={{ width: size, height: size, background: tones[tone % 4], fontSize: size * 0.36 }}>{ini}</span>
  );
}
