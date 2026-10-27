import { contacts, team, type Person } from "./team";

export type Seg = "Enterprise" | "Mid-market" | "SMB";
export const customers: { name: string; role: string; org: string; pipe: number | null; last: string; score: number; seg: Seg; star?: boolean; person?: Person }[] = [
  { name: "Daniel Osei", role: "VP Procurement", org: "Brightmoor Clinics", pipe: 18080, last: "22 h ago", score: 51, seg: "Enterprise", star: true, person: contacts.daniel },
  { name: "Clara Vos", role: "Head of Operations", org: "Tidewater Freight", pipe: 99070, last: "Oct 18", score: 86, seg: "Enterprise", star: true, person: contacts.clara },
  { name: "Grace Liu", role: "VP Sales", org: "Peakline Software", pipe: 30460, last: "in 2 h", score: 59, seg: "Mid-market" },
  { name: "Mei Tanaka", role: "IT Director", org: "Aldercrest Hotels", pipe: 181790, last: "just now", score: 91, seg: "Enterprise", person: contacts.mei },
  { name: "Priya Natarajan", role: "Head of Data", org: "Quillon Analytics", pipe: 33210, last: "2 h ago", score: 58, seg: "SMB" },
  { name: "Aisha Rahman", role: "Product Lead", org: "Nimbus Health", pipe: 3400, last: "6 h ago", score: 91, seg: "SMB" },
  { name: "Noah Fischer", role: "IT Manager", org: "Alpenrail", pipe: 54860, last: "1 d ago", score: 69, seg: "Enterprise" },
  { name: "Hugo Laurent", role: "Managing Director", org: "Maison Clair Hotels", pipe: null, last: "1 d ago", score: 59, seg: "Mid-market" },
  { name: "Karim Haddad", role: "Chief Operating Officer", org: "Orchard Row Bank", pipe: 64490, last: "2 d ago", score: 89, seg: "Enterprise" },
  { name: "Tomás Silva", role: "Chief Technology Officer", org: "Corvo Mobility", pipe: 42740, last: "2 d ago", score: 92, seg: "Mid-market" },
  { name: "Leo Martins", role: "Chief Executive", org: "Brisa Travel", pipe: 15090, last: "2 d ago", score: 78, seg: "SMB" },
  { name: "Sara Lindholm", role: "Operations Lead", org: "Fjord Outdoor", pipe: 2770, last: "2 d ago", score: 54, seg: "SMB" },
  { name: "Elena Rossi", role: "Marketing Director", org: "Vela Cosmetics", pipe: 29880, last: "3 d ago", score: 88, seg: "Mid-market" },
  { name: "Graham Whitley", role: "Chief Financial Officer", org: "Fennick & Rowe", pipe: 75670, last: "4 d ago", score: 74, seg: "Mid-market" },
  { name: "Oliver Grant", role: "General Manager", org: "Northgate Cinemas", pipe: 19940, last: "4 d ago", score: 50, seg: "SMB" },
  { name: "Isabel Cruz", role: "Head of Operations", org: "Verde Farms", pipe: 19320, last: "5 d ago", score: 56, seg: "SMB" },
  { name: "Yuki Mori", role: "Head of IT", org: "Kumo Retail", pipe: 112970, last: "5 d ago", score: 96, seg: "Enterprise" },
  { name: "Marcus Bell", role: "Owner", org: "Bell & Birch Joinery", pipe: 14710, last: "6 d ago", score: 59, seg: "SMB" },
  { name: "Fatima Zahra", role: "Procurement Manager", org: "Atlas Ceramics", pipe: null, last: "6 d ago", score: 64, seg: "Mid-market" },
  { name: "Ben Carter", role: "Founder", org: "Loop Coffee Co.", pipe: 9970, last: "Oct 18", score: 65, seg: "SMB" },
  { name: "Nadia Petrova", role: "Finance Director", org: "Sable Freight", pipe: 168390, last: "Oct 18", score: 97, seg: "Enterprise" },
  { name: "Lucía Moreno", role: "Purchasing Lead", org: "Copperline Foods", pipe: 29680, last: "Oct 18", score: 72, seg: "Mid-market" },
  { name: "Jonas Becker", role: "Operations Manager", org: "Hafenwerk", pipe: 61980, last: "Oct 17", score: 87, seg: "Mid-market" },
  { name: "Kenji Arai", role: "Founder & CEO", org: "Lumio Solar", pipe: 50630, last: "Oct 17", score: 93, seg: "Mid-market" },
];

export const pipelineCols = [
  { stage: "Qualification", color: "var(--yellow)", tone: "yellow", count: 10, total: "$277.6K", deals: [
    ["Dec 15", "Support plan upgrade", "Tidewater Freight", 53010], ["Dec 20", "API access tier", "Fennick & Rowe", 17970], ["Dec 26", "Integration build", "Fennick & Rowe", 22400], ["Jan 8", "Seat true-up", "Nimbus Health", 12600]] },
  { stage: "Proposal", color: "var(--green)", tone: "green", count: 9, total: "$117K", deals: [
    ["Jan 6", "Fleet licence expansion", "Tidewater Freight", 7710], ["Oct 31", "Analytics add-on", "Tidewater Freight", 4200], ["Nov 21", "Team training workshops", "Fennick & Rowe", 9800], ["Dec 2", "Premium SLA", "Corvo Mobility", 14300]] },
  { stage: "Negotiation", color: "var(--orange)", tone: "hot", count: 12, total: "$325.3K", deals: [
    ["Nov 15", "Annual renewal", "Tidewater Freight", 18190], ["Dec 11", "Analytics add-on", "Lumio Solar", 28680], ["Nov 1", "Seat true-up", "Aldercrest Hotels", 55430], ["Nov 5", "Regional expansion", "Sable Freight", 49040]] },
  { stage: "Closing", color: "var(--seg-neutral)", tone: "neutral", count: 16, total: "$419.2K", deals: [
    ["Dec 5", "Pilot rollout, 3 sites", "Tidewater Freight", 15960], ["Nov 20", "Support plan upgrade", "Brightmoor Clinics", 18080], ["Dec 23", "Team training workshops", "Lumio Solar", 21500], ["Nov 1", "Fleet licence expansion", "Kumo Retail", 56180]] },
] as const;

export const invoices = [
  ["RP-2400", "Tidewater Freight", "Clara Vos", "Oct 26", "Nov 25", "Paid Oct 26", 53070, "Paid", contacts.clara],
  ["RP-2444", "Tidewater Freight", "Clara Vos", "Oct 26", "Nov 25", "Not sent", 2000, "Draft", contacts.clara],
  ["RP-2445", "Brightmoor Clinics", "Daniel Osei", "Oct 26", "Nov 25", "Not sent", 3600, "Draft", contacts.daniel],
  ["RP-2446", "Lumio Solar", "Kenji Arai", "Oct 26", "Nov 25", "Not sent", 2900, "Draft", undefined],
  ["RP-2442", "Alpenrail", "Noah Fischer", "Oct 18", "Nov 17", "Paid Oct 26", 18150, "Paid", undefined],
  ["RP-2406", "Lumio Solar", "Kenji Arai", "Oct 3", "Nov 2", "in 6 d", 33300, "Due", undefined],
  ["RP-2423", "Corvo Mobility", "Tomás Silva", "Oct 3", "Nov 2", "in 6 d", 8040, "Due", undefined],
  ["RP-2427", "Kumo Retail", "Yuki Mori", "Oct 1", "Oct 31", "Paid Oct 15", 61790, "Paid", undefined],
  ["RP-2428", "Fjord Outdoor", "Sara Lindholm", "Oct 1", "Oct 31", "in 4 d", 4240, "Due", undefined],
  ["RP-2433", "Atlas Ceramics", "Fatima Zahra", "Sep 29", "Oct 29", "in 2 d", 14260, "Due", undefined],
] as const;

export const cashflow = {
  months: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  collected: [60, 58, 122, 8, 30, 138],
  invoiced: [78, 55, 118, 100, 48, 188],
};

export const aging = [
  { label: "0–30", days: "0–30 days", n: 4, amt: 59840, h: 0.52 },
  { label: "31–60", days: "31–60 days", n: 2, amt: 62120, h: 0.56 },
  { label: "61–90", days: "61–90 days", n: 1, amt: 11280, h: 0.1 },
  { label: "90+", days: "90+ days", n: 0, amt: 0, h: 0.02 },
];

export const projects = [
  ["Tidewater Freight", "Clara Vos", "Platform onboarding", "In progress", 3, 6, "Workflow setup", "Due in 8 days", contacts.clara],
  ["Quillon Analytics", "Priya Natarajan", "Platform onboarding", "In progress", 3, 5, "User testing", "Due in 11 days", undefined],
  ["Hafenwerk", "Jonas Becker", "Data migration", "In review", 4, 5, "Handover", "Due Nov 16", undefined],
  ["Fennick & Rowe", "Graham Whitley", "Warehouse integration", "In review", 5, 6, "Go-live review", "Due Nov 19", undefined],
  ["Lumio Solar", "Kenji Arai", "SSO rollout", "Planning", 1, 6, "Kick-off", "Due Dec 3", undefined],
  ["Aldercrest Hotels", "Mei Tanaka", "Team training programme", "In progress", 2, 4, "Workshop 2", "Due Nov 24", contacts.mei],
  ["Brightmoor Clinics", "Daniel Osei", "Data migration", "In progress", 3, 7, "Field mapping", "Due Dec 9", contacts.daniel],
  ["Orchard Row Bank", "Karim Haddad", "API integration", "Planning", 0, 5, "Scoping", "Due Dec 18", undefined],
] as const;

export const growthBars = {
  months: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  parts: [[28, 36, 22, 30, 34, 18], [40, 44, 36, 52, 58, 40], [38, 30, 48, 36, 44, 50]],
};
export const topCustomers = [
  ["Daniel Osei", "Brightmoor Clinics", "Enterprise", 2, 87820, contacts.daniel], ["Hugo Laurent", "Maison Clair Hotels", "Mid-market", 3, 67840, undefined],
  ["Yuki Mori", "Kumo Retail", "Enterprise", 1, 61790, undefined], ["Clara Vos", "Tidewater Freight", "Enterprise", 1, 53070, contacts.clara],
  ["Kenji Arai", "Lumio Solar", "Mid-market", 1, 33300, undefined], ["Nadia Petrova", "Sable Freight", "Enterprise", 1, 32180, undefined],
  ["Graham Whitley", "Fennick & Rowe", "Mid-market", 2, 30450, undefined], ["Fatima Zahra", "Atlas Ceramics", "Mid-market", 2, 29450, undefined],
] as const;
export const reps = [
  [team.sofia, 193510, 92, 6, 86], [team.hanna, 100250, 77, 4, 80], [team.rohan, 100020, 38, 4, 80], [team.amara, 79670, 53, 5, 63], [team.theo, 27390, 14, 3, 75],
] as const;
