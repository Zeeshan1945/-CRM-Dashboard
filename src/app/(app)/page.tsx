import type { Metadata } from "next";
import { ChartNoAxesColumn, ChartPie, Trophy } from "lucide-react";
import { PageHeading } from "@/components/ui/PageHeading";
import { RevenueCard } from "@/components/overview/RevenueCard";
import { HotDeals } from "@/components/overview/HotDeals";
import { TeamQuota } from "@/components/overview/TeamQuota";
import { StageMix } from "@/components/overview/StageMix";
import { Leaderboard } from "@/components/overview/Leaderboard";
import { TodayCard } from "@/components/overview/TodayCard";
import { RecentActivity } from "@/components/overview/RecentActivity";
import {
  MONTHLY_TARGET,
  activity,
  comingUp,
  hotDeals,
  leaderboard,
  overviewStats,
  quota,
  revenueSeries,
  stageMix,
  todayTasks,
} from "@/lib/data";
import { money } from "@/lib/format";

export const metadata: Metadata = { title: "Overview" };

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-[18px]">
      <PageHeading
        title="Sales Overview"
        stats={[
          { icon: Trophy, value: money(overviewStats.wonThisMonth), label: "Won this month", badge: { text: overviewStats.vsLastMonth } },
          { icon: ChartNoAxesColumn, value: money(overviewStats.openPipeline), label: "Open pipeline" },
          { icon: ChartPie, value: overviewStats.winRate, label: "Win rate, closed deals" },
        ]}
      />

      <div className="mt-[7px] grid gap-[18px] md:grid-cols-2 xl:grid-cols-[419fr_564fr_711fr]">
        <RevenueCard series={revenueSeries} target={MONTHLY_TARGET} />
        <HotDeals deals={hotDeals} />
        <TeamQuota {...quota} />
        <StageMix stages={stageMix} />
      </div>

      <div className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-[711fr_563fr_419fr]">
        <div className="md:col-span-2 xl:col-span-1 [&>section]:h-full">
          <Leaderboard rows={leaderboard} />
        </div>
        <TodayCard tasks={todayTasks} upcoming={comingUp} />
        <RecentActivity items={activity} />
      </div>
    </div>
  );
}
