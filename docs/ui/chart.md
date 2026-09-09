# Chart

<!-- notes -->
The Recharts wrapper: `ChartContainer` carries the config, `ChartStyle` turns each series colour into a CSS variable. Side-by-side panels leave about 190px each on a phone, which is not a chart any more — stack them.
<!-- /notes -->

**Source** `src/components/ui/chart.tsx` · **Upstream** [chart.md](https://ui.shadcn.com/docs/components/base/chart.md) · **Client component**

## Import

```tsx
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
```

## Exports

### `ChartConfig` — type

```ts
type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>
```

### `ChartContainer` — component

```ts
ChartContainer(props: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
  initialDimension?: {
    width: number;
    height: number;
  };
})
```

### `ChartTooltip` — const

```ts
const ChartTooltip
```

### `ChartTooltipContent` — component

```ts
ChartTooltipContent(props: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  } & Omit<
    RechartsPrimitive.DefaultTooltipContentProps<
      TooltipValueType,
      TooltipNameType
    >,
    "accessibilityLayer"
  >)
```

### `ChartLegend` — const

```ts
const ChartLegend
```

### `ChartLegendContent` — component

```ts
ChartLegendContent(props: React.ComponentProps<"div"> & {
  hideIcon?: boolean;
  nameKey?: string;
} & RechartsPrimitive.DefaultLegendContentProps)
```

### `ChartStyle` — component

```ts
ChartStyle(props: { id: string; config: ChartConfig })
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="chart"]`.

## Depends on

- Packages: `cn`, `react`, `recharts`

## Used by

[examples/revenue-dashboard](../examples/revenue-dashboard.md)
