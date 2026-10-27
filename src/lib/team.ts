import type { StaticImageData } from "next/image";
import sofia from "@/assets/avatars/sofia.webp";
import amara from "@/assets/avatars/amara.webp";
import theo from "@/assets/avatars/theo.webp";
import rohan from "@/assets/avatars/rohan.webp";
import hanna from "@/assets/avatars/hanna.webp";
import daniel from "@/assets/avatars/daniel.webp";
import clara from "@/assets/avatars/clara.webp";
import mei from "@/assets/avatars/mei.webp";

export type Person = { id: string; name: string; first: string; avatar: StaticImageData };

export const team = {
  sofia: { id: "sofia", name: "Sofia Reyes", first: "Sofia", avatar: sofia },
  amara: { id: "amara", name: "Amara Okafor", first: "Amara", avatar: amara },
  theo: { id: "theo", name: "Theo Adeyemi", first: "Theo", avatar: theo },
  rohan: { id: "rohan", name: "Rohan Mehta", first: "Rohan", avatar: rohan },
  hanna: { id: "hanna", name: "Hanna Lindqvist", first: "Hanna", avatar: hanna },
} satisfies Record<string, Person>;

export const contacts = {
  daniel: { id: "daniel", name: "Daniel Osei", first: "Daniel", avatar: daniel },
  clara: { id: "clara", name: "Clara Vos", first: "Clara", avatar: clara },
  mei: { id: "mei", name: "Mei Tanaka", first: "Mei", avatar: mei },
} satisfies Record<string, Person>;

export const me = team.sofia;
