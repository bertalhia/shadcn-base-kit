# Scenario Tabs

<!-- notes -->
The strip that switches between the example screens. Panels arrive as `content` props rather than being rendered here, so a server component stays server-rendered inside a client tab.
<!-- /notes -->

**Source** `src/components/examples/scenario-tabs.tsx` · **Client component**

## Import

```tsx
import { ScenarioTabs } from "@/components/examples/scenario-tabs";
import type { ScenarioPanel } from "@/components/examples/scenario-tabs";
```

## Exports

### `ScenarioPanel` — type

```ts
type ScenarioPanel = {
  value: string;
  label: string;
  content: React.ReactNode;
  /** Query keys this panel owns. Leaving it drops them. */
  queryKeys?: string[];
}
```

### `ScenarioTabs` — component

The tab strip for the scenarios, with the active tab in the URL.

Panels arrive as `content` rather than being rendered here, so a server
component like the release notes stays server-rendered inside a client tab
strip.

```ts
ScenarioTabs(props: { panels: ScenarioPanel[] })
```

## Depends on

- Packages: `react`
- In this project: `@/components/shared/query-tabs`, `@/components/ui/tabs`
