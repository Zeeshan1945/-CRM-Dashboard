"use client";

import { useState } from "react";
import { Check, Phone, Plus, Users, type LucideIcon } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { PanelTitle } from "@/components/ui/PanelHeader";
import type { comingUp as cu, todayTasks as tt, TaskKind } from "@/lib/data";

const kindIcon: Record<TaskKind, LucideIcon> = { check: Check, call: Phone, meeting: Users };

export function TodayCard({ tasks, upcoming }: { tasks: typeof tt; upcoming: typeof cu }) {
  const [done, setDone] = useState<ReadonlySet<string>>(new Set());
  const pct = (done.size / tasks.length) * 100;

  function toggle(id: string) {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section aria-labelledby="today-title" className="panel rise flex flex-col p-[18px] pt-[22px] pb-5" style={{ "--i": 5 } as React.CSSProperties}>
      <div className="flex items-center justify-between">
        <PanelTitle id="today-title">Today</PanelTitle>
        <button type="button" className="btn-primary h-[37px] px-4 text-[13px]">
          <Plus size={15} strokeWidth={2} aria-hidden />
          Add
        </button>
      </div>

      <div className="mt-[18px] flex items-center gap-3">
        <p className="text-[13.5px] whitespace-nowrap text-muted" aria-live="polite">
          <b className="font-semibold text-text">{done.size}</b> of {tasks.length} done
        </p>
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-track"
          role="progressbar"
          aria-label="Tasks completed today"
          aria-valuemin={0}
          aria-valuemax={tasks.length}
          aria-valuenow={done.size}
        >
          <div className="h-full rounded-full bg-bar-fill transition-[width] duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <ul className="mt-[7px]">
        {tasks.map((t, i) => {
          const Icon = kindIcon[t.kind];
          const isDone = done.has(t.id);
          return (
            <li key={t.id} className={`flex items-center gap-3 py-[15px] ${i ? "border-t border-line" : ""}`}>
              <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggle(t.id)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className="grid size-[21px] shrink-0 place-items-center rounded-[7px] border border-line-strong text-primary-fg transition-colors peer-checked:border-transparent peer-checked:bg-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus"
                >
                  {isDone ? <Check size={13} strokeWidth={3} /> : null}
                </span>
                <span className="min-w-0">
                  <span className={`block truncate text-[14.5px] leading-tight font-semibold tracking-[-0.015em] ${isDone ? "text-muted line-through" : ""}`}>
                    {t.title}
                  </span>
                  <span className="mt-[3px] block truncate text-[12px] leading-none text-muted">
                    {t.time} · {t.account}
                  </span>
                </span>
              </label>
              <span aria-hidden className="grid size-[30px] place-items-center rounded-full bg-control text-muted">
                <Icon size={14} strokeWidth={1.8} />
              </span>
              <Avatar person={t.owner} size={24} />
            </li>
          );
        })}
      </ul>

      <div className="mt-[14px] flex items-center justify-between">
        <h3 className="text-[11.5px] font-semibold tracking-[0.1em] text-muted uppercase">Coming up</h3>
        <button type="button" className="ctl h-[35px] px-[14px] text-[12.5px] font-semibold">
          Open schedule
        </button>
      </div>

      <ul className="mt-3 flex flex-col gap-[10px]">
        {upcoming.map((u) => (
          <li key={u.id} className="flex items-center gap-[22px] rounded-[14px] bg-tile px-[11px] py-[11px]">
            <span className="w-8 text-[13px] leading-[1.15] font-semibold">
              {u.day}
              <br />
              {u.date}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13.5px] leading-tight font-semibold tracking-[-0.01em]">{u.title}</span>
              <span className="mt-[3px] block truncate text-[12px] leading-none text-muted">
                {u.time} · {u.account}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
