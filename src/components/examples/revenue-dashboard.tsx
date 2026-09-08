"use client";

import { InfoIcon } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { Section } from "@/components/shared/section";
import { StatCard } from "@/components/shared/stat-card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatCents, formatCompact } from "@/utils/number";

const monthly = [
  { month: "Sep", revenue: 412_00 },
  { month: "Oct", revenue: 468_00 },
  { month: "Nov", revenue: 521_00 },
  { month: "Dec", revenue: 734_00 },
  { month: "Jan", revenue: 498_00 },
  { month: "Feb", revenue: 543_00 },
  { month: "Mar", revenue: 611_00 },
  { month: "Apr", revenue: 598_00 },
  { month: "May", revenue: 672_00 },
  { month: "Jun", revenue: 705_00 },
  { month: "Jul", revenue: 758_00 },
  { month: "Aug", revenue: 812_00 },
];

const byChannel = [
  { channel: "Direct", revenue: 289_00 },
  { channel: "Search", revenue: 231_00 },
  { channel: "Email", revenue: 154_00 },
  { channel: "Affiliate", revenue: 88_00 },
  { channel: "Social", revenue: 50_00 },
];

/**
 * Both charts carry a single series each, and that is a decision the theme
 * makes for us: `--chart-1` through `--chart-5` are a zinc ramp — one hue,
 * chroma under 0.02 — so they read as a sequential scale, not as five
 * identities. Running them through a categorical check fails the chroma floor
 * and puts adjacent steps below the normal-vision separation floor.
 *
 * With one series per chart the title names it, so no legend is needed and no
 * meaning rests on colour alone.
 */
const revenueConfig = {
  revenue: { label: "Revenue", color: "var(--chart-2)" },
} satisfies ChartConfig;

const channelConfig = {
  revenue: { label: "Revenue", color: "var(--chart-3)" },
} satisfies ChartConfig;

const goal = 1_000_00;
const current = 812_00;

export function RevenueDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Revenue this month"
          value={formatCents(current)}
          change={0.072}
          hint="vs. July"
        />
        <StatCard
          label="Orders"
          value={formatCompact(1284)}
          change={0.031}
          hint="vs. July"
        />
        <StatCard
          label="Average order"
          value={formatCents(6320)}
          change={-0.014}
          hint="vs. July"
        />
        <StatCard label="Refund rate" value="1.8%" change={-0.004} />
      </div>

      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-96 rounded-xl border"
      >
        <ResizablePanel defaultSize={62}>
          <Card className="h-full rounded-none border-0 shadow-none">
            <CardHeader>
              <CardTitle>Revenue by month</CardTitle>
              <CardDescription>Last 12 months, net of refunds.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={revenueConfig}
                className="min-h-64 w-full"
              >
                <AreaChart accessibilityLayer data={monthly}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={56}
                    tickFormatter={(value: number) => formatCents(value)}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCents(Number(value))}
                      />
                    }
                  />
                  <Area
                    dataKey="revenue"
                    type="monotone"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    fill="var(--color-revenue)"
                    fillOpacity={0.12}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={38}>
          <Card className="h-full rounded-none border-0 shadow-none">
            <CardHeader>
              <CardTitle>Revenue by channel</CardTitle>
              <CardDescription>August, all markets.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={channelConfig}
                className="min-h-64 w-full"
              >
                <BarChart accessibilityLayer data={byChannel} layout="vertical">
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="channel"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={72}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCents(Number(value))}
                      />
                    }
                  />
                  <Bar
                    dataKey="revenue"
                    fill="var(--color-revenue)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Section title="Recent activity">
          <ScrollArea className="h-64 rounded-xl border">
            <div className="flex flex-col p-4">
              {monthly
                .slice()
                .reverse()
                .map((entry, index) => (
                  <div key={entry.month}>
                    {index > 0 ? <Separator className="my-3" /> : null}
                    <div className="flex items-center justify-between text-sm">
                      <span>{entry.month} closed</span>
                      <span className="tabular-nums text-muted-foreground">
                        {formatCents(entry.revenue)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </Section>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Quarterly goal
                <HoverCard>
                  <HoverCardTrigger
                    render={
                      <button
                        type="button"
                        aria-label="How the goal is calculated"
                        className="text-muted-foreground"
                      />
                    }
                  >
                    <InfoIcon className="size-4" />
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm">
                    Net revenue against the target set at the start of the
                    quarter. Refunds are subtracted on the day they clear.
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
              <CardDescription>
                {formatCents(current)} of {formatCents(goal)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={Math.round((current / goal) * 100)} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <AvatarGroup>
                <Avatar>
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>RO</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+4</AvatarGroupCount>
              </AvatarGroup>
              <AspectRatio
                ratio={16 / 9}
                className="rounded-lg bg-muted"
                aria-label="Storefront preview"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
