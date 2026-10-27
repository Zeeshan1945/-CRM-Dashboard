import { team, type Person } from "./team";

/* ---------------------------------- revenue --------------------------------- */

export const MONTHLY_TARGET = 156_700;

export const revenueSeries = [
  { month: "Nov", won: 99_340 },
  { month: "Dec", won: 52_120 },
  { month: "Jan", won: 86_240 },
  { month: "Feb", won: 111_540 },
  { month: "Mar", won: 62_160 },
  { month: "Apr", won: 102_400 },
  { month: "May", won: 57_850 },
  { month: "Jun", won: 39_640 },
  { month: "Jul", won: 115_330 },
  { month: "Aug", won: 67_990 },
  { month: "Sep", won: 107_470 },
  { month: "Oct", won: 112_560 },
] as const;

export type RevenuePoint = (typeof revenueSeries)[number];

/* ---------------------------------- summary --------------------------------- */

export const overviewStats = {
  wonThisMonth: 112_560,
  vsLastMonth: "+5% vs last month",
  openPipeline: 1_139_100,
  winRate: "75%",
};

/* ------------------------------------ deals ---------------------------------- */

export type DealTone = "neutral" | "hot" | "yellow" | "green";

export type Deal = {
  id: string;
  title: string;
  company: string;
  closes: string;
  amount: number;
  stage: "Qualification" | "Proposal" | "Negotiation" | "Closing";
  probability: number;
  tone: DealTone;
  owners: Person[];
};

export const hotDeals: Deal[] = [
  { id: "d1", title: "Fleet licence expansion", company: "Kumo Retail", closes: "Nov 1", amount: 56_180, stage: "Closing", probability: 90, tone: "neutral", owners: [team.hanna, team.amara, team.rohan] },
  { id: "d2", title: "Integration build", company: "Aldercrest Hotels", closes: "Nov 20", amount: 54_940, stage: "Closing", probability: 90, tone: "neutral", owners: [team.hanna, team.amara, team.sofia] },
  { id: "d3", title: "Premium SLA", company: "Aldercrest Hotels", closes: "Nov 26", amount: 54_450, stage: "Closing", probability: 90, tone: "neutral", owners: [team.sofia, team.amara, team.rohan] },
  { id: "d4", title: "Annual renewal", company: "Sable Freight", closes: "Nov 26", amount: 47_100, stage: "Closing", probability: 90, tone: "neutral", owners: [team.theo, team.amara, team.rohan] },
  { id: "d5", title: "Seat true-up", company: "Aldercrest Hotels", closes: "Nov 1", amount: 55_430, stage: "Negotiation", probability: 70, tone: "hot", owners: [team.sofia, team.amara, team.rohan] },
  { id: "d6", title: "Regional expansion", company: "Sable Freight", closes: "Nov 5", amount: 49_040, stage: "Negotiation", probability: 70, tone: "hot", owners: [team.theo, team.hanna, team.rohan] },
];

/* ------------------------------------ quota ---------------------------------- */

export const quota = { won: 112_600, target: 470_000, daysLeft: 67, label: "Q4" };

/* ---------------------------------- stage mix -------------------------------- */

export const stageMix = [
  { stage: "Qualification", deals: 10, value: 277_600, share: 24, color: "var(--yellow)" },
  { stage: "Proposal", deals: 9, value: 117_000, share: 10, color: "var(--green)" },
  { stage: "Negotiation", deals: 12, value: 325_300, share: 29, color: "var(--orange)" },
  { stage: "Closing", deals: 16, value: 419_200, share: 37, color: "var(--seg-neutral)" },
] as const;

/* -------------------------------- leaderboard -------------------------------- */

export const leaderboard = [
  { person: team.sofia, won: 94_410, pct: 270, deals: 3 },
  { person: team.amara, won: 18_150, pct: 73, deals: 1 },
  { person: team.theo, won: 0, pct: 0, deals: 0 },
  { person: team.rohan, won: 0, pct: 0, deals: 0 },
  { person: team.hanna, won: 0, pct: 0, deals: 0 },
];

/* ------------------------------------ today ---------------------------------- */

export type TaskKind = "check" | "call" | "meeting";

export const todayTasks: { id: string; title: string; time: string; account: string; kind: TaskKind; owner: Person }[] = [
  { id: "t1", title: "Draft contract redlines", time: "10:00 AM", account: "Tidewater Freight", kind: "check", owner: team.hanna },
  { id: "t2", title: "Discovery call", time: "10:30 AM", account: "Tidewater Freight", kind: "call", owner: team.sofia },
  { id: "t3", title: "Kick-off workshop", time: "11:30 AM", account: "Orchard Row Bank", kind: "meeting", owner: team.rohan },
  { id: "t4", title: "Check in on pilot", time: "4:30 PM", account: "Fennick & Rowe", kind: "call", owner: team.theo },
];

export const comingUp = [
  { id: "c1", day: "Tue", date: "27", title: "Renewal conversation", time: "9:30 AM", account: "Brisa Travel" },
  { id: "c2", day: "Tue", date: "27", title: "Security walkthrough", time: "10:00 AM", account: "Nimbus Health" },
  { id: "c3", day: "Tue", date: "27", title: "Draft contract redlines", time: "2:00 PM", account: "Atlas Ceramics" },
];

/* ---------------------------------- activity --------------------------------- */

export type ActivityIcon = "trophy" | "mail" | "phone" | "receipt" | "folder";

export const activity: { id: string; who: Person; text: string; account: string; ago: string; icon: ActivityIcon }[] = [
  { id: "a1", who: team.sofia, text: "moved Pilot rollout, 3 sites to Closing", account: "Tidewater Freight", ago: "6 min ago", icon: "trophy" },
  { id: "a2", who: team.theo, text: "sent the revised proposal", account: "Brightmoor Clinics", ago: "53 min ago", icon: "mail" },
  { id: "a3", who: team.sofia, text: "logged a 24 min call", account: "Lumio Solar", ago: "2 h ago", icon: "phone" },
  { id: "a4", who: team.rohan, text: "marked invoice RP-2403 as paid", account: "Fennick & Rowe", ago: "2 h ago", icon: "receipt" },
  { id: "a5", who: team.hanna, text: "finished Data import", account: "Aldercrest Hotels", ago: "3 h ago", icon: "folder" },
  { id: "a6", who: team.amara, text: "won Annual renewal", account: "Orchard Row Bank", ago: "4 h ago", icon: "trophy" },
];
