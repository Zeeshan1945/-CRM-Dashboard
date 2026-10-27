import type { Metadata } from "next";
import { Check, Clock, Folder, Plus } from "lucide-react";
import { PageHeading } from "@/components/ui/PageHeading";
import { Chips, SearchBox } from "@/components/ui/bits";
import { Face } from "@/components/ui/Person";
import { AvatarStack } from "@/components/ui/Avatar";
import { team } from "@/lib/team";
import { projects } from "@/lib/pages-data";

export const metadata: Metadata = { title: "Projects" };
const dot = { "In progress": "var(--yellow)", "In review": "var(--mint)", Planning: "var(--text-faint)" } as const;

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-[18px]">
      <PageHeading title="Customer Projects" stats={[
        { icon: Folder, value: "8", label: "Active projects" },
        { icon: Check, value: "52%", label: "Steps complete overall" },
        { icon: Clock, value: "2", label: "Due in the next 14 days" },
      ]} />
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-full bg-control p-1 ring-1 ring-line"><Chips label="Status" options={["All", "Planning", "In progress", "In review", "Done"]} /></div>
        <div className="ml-auto flex items-center gap-3">
          <SearchBox placeholder="Search projects…" className="w-[240px]" />
          <button type="button" className="btn-primary h-[43px] px-5 text-[13.5px]"><Plus size={15} aria-hidden />New project</button>
        </div>
      </div>
      <ul className="grid gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        {projects.map(([org, who, name, status, done, total, next, due, person], i) => {
          const pct = Math.round((done / total) * 100);
          const col = status === "In review" ? "var(--mint)" : "var(--yellow)";
          return (
            <li key={org + name} className="panel rise p-[18px]" style={{ "--i": i } as React.CSSProperties}>
              <div className="flex items-center gap-3">
                <Face name={who} person={person} size={36} tone={i} />
                <div className="min-w-0 flex-1"><p className="truncate text-[14px] font-semibold">{org}</p><p className="truncate text-[12.5px] text-muted">{who}</p></div>
                <span className="flex items-center gap-1.5 rounded-full bg-tile-strong px-3 py-1.5 text-[12px] font-semibold"><i className="size-1.5 rounded-full" style={{ background: dot[status] }} />{status}</span>
              </div>
              <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.03em]">{name}</h3>
              <div className="mt-4 flex items-center gap-4 rounded-[18px] bg-tile p-[14px]">
                <svg viewBox="0 0 64 64" className="size-[64px] -rotate-90 shrink-0" role="img" aria-label={`${pct}% complete`}>
                  <circle cx="32" cy="32" r="27" fill="none" stroke="var(--track)" strokeWidth="4.5" />
                  <circle cx="32" cy="32" r="27" fill="none" stroke={col} strokeWidth="4.5" strokeLinecap="round" strokeDasharray={`${(169.6 * pct) / 100} 170`} />
                  <text x="32" y="32" transform="rotate(90 32 32)" textAnchor="middle" dominantBaseline="central" className="fill-text text-[15px] font-semibold">{pct}%</text>
                </svg>
                <div className="min-w-0 flex-1"><p className="text-[15px] font-semibold">{done} of {total} steps</p><p className="mt-0.5 truncate text-[12.5px] text-muted">Next: {next}</p>
                  <div className="mt-2 h-1.5 rounded-full bg-track"><div className="h-full rounded-full" style={{ width: `${pct}%`, background: col }} /></div></div>
              </div>
              <div className="mt-4 flex items-center justify-between text-[12.5px] text-muted">
                <span className="flex items-center gap-2"><Clock size={14} aria-hidden />{due}</span>
                <AvatarStack people={[team.sofia, team.theo, team.rohan]} size={24} ringClass="ring-transparent" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
