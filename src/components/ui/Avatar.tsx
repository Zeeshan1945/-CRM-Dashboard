import Image from "next/image";
import type { Person } from "@/lib/team";

type AvatarProps = {
  person: Person;
  size: number;
  className?: string;
  priority?: boolean;
};

export function Avatar({ person, size, className = "", priority }: AvatarProps) {
  return (
    <Image
      src={person.avatar}
      alt={person.name}
      width={size}
      height={size}
      sizes={`${size}px`}
      priority={priority}
      className={`shrink-0 rounded-full bg-tile-strong object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export function AvatarStack({
  people,
  size = 24,
  ringClass = "ring-deal",
}: {
  people: Person[];
  size?: number;
  ringClass?: string;
}) {
  return (
    <div className="flex items-center" role="img" aria-label={`Owners: ${people.map((p) => p.first).join(", ")}`}>
      {people.map((p, i) => (
        <Avatar
          key={p.id}
          person={p}
          size={size}
          className={`ring-2 ${ringClass} ${i ? "-ml-[10.5px]" : ""}`}
        />
      ))}
    </div>
  );
}
