import { cn } from "cn";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import type * as React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPercent } from "@/utils/number";

/**
 * One number, with the context that makes it mean something.
 *
 * A figure on its own says nothing; `change` is what turns it into a signal.
 * Direction is spelled out in the badge text rather than left to colour alone.
 */
export function StatCard({
  label,
  value,
  change,
  hint,
  className,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Fraction, not percent: 0.124 renders as 12.4%. */
  change?: number;
  hint?: React.ReactNode;
  className?: string;
}) {
  const rising = change !== undefined && change >= 0;

  return (
    <Card className={cn("gap-2", className)}>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-2xl tabular-nums">{value}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        {change !== undefined ? (
          <Badge variant={rising ? "secondary" : "destructive"}>
            {rising ? <TrendingUpIcon /> : <TrendingDownIcon />}
            {formatPercent(Math.abs(change))} {rising ? "up" : "down"}
          </Badge>
        ) : null}
        {hint ? (
          <span className="text-xs text-muted-foreground">{hint}</span>
        ) : null}
      </CardContent>
    </Card>
  );
}
