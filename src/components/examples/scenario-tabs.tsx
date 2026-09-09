"use client";

import type * as React from "react";

import { QueryTabs, QueryTabsList } from "@/components/shared/query-tabs";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";

export type ScenarioPanel = {
  value: string;
  label: string;
  content: React.ReactNode;
  /** Query keys this panel owns. Leaving it drops them. */
  queryKeys?: string[];
};

/**
 * The tab strip for the scenarios, with the active tab in the URL.
 *
 * Panels arrive as `content` rather than being rendered here, so a server
 * component like the release notes stays server-rendered inside a client tab
 * strip.
 */
export function ScenarioTabs({ panels }: { panels: ScenarioPanel[] }) {
  return (
    <QueryTabs
      queryKey="tab"
      values={panels.map((panel) => panel.value)}
      ownedKeys={Object.fromEntries(
        panels.map((panel) => [panel.value, panel.queryKeys ?? []]),
      )}
    >
      <QueryTabsList>
        {panels.map((panel) => (
          <TabsTrigger key={panel.value} value={panel.value}>
            {panel.label}
          </TabsTrigger>
        ))}
      </QueryTabsList>

      {panels.map((panel) => (
        <TabsContent key={panel.value} value={panel.value}>
          {panel.content}
        </TabsContent>
      ))}
    </QueryTabs>
  );
}
