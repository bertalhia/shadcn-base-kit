# Tabs

<!-- notes -->
Sections behind one strip. `TabsList` is `h-8` under a `group-data-horizontal` variant, so a plain `h-auto` does not override it and a wrapped second row spills over what is below — nine tabs come to 600px. Wrap the list, do not scroll it. The active tab belongs in the URL; `shared/query-tabs` does that.
<!-- /notes -->

**Source** `src/components/ui/tabs.tsx` · **Upstream** [tabs.md](https://ui.shadcn.com/docs/components/base/tabs.md) · **Client component**

## Import

```tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
} from "@/components/ui/tabs";
```

## Exports

### `Tabs` — component

```ts
Tabs(props: TabsPrimitive.Root.Props)
```

### `TabsList` — component

```ts
TabsList(props: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>)
```

### `TabsTrigger` — component

```ts
TabsTrigger(props: TabsPrimitive.Tab.Props)
```

### `TabsContent` — component

```ts
TabsContent(props: TabsPrimitive.Panel.Props)
```

### `tabsListVariants` — variants

```ts
const tabsListVariants
```

| Variant | Options | Default |
| --- | --- | --- |
| `variant` | `default` `line` | `default` |

## Data slots

Style against these rather than adding a class of your own: `[data-slot="tabs"]`, `[data-slot="tabs-content"]`, `[data-slot="tabs-list"]`, `[data-slot="tabs-trigger"]`.

## Depends on

- Packages: `@base-ui/react/tabs`, `class-variance-authority`, `cn`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/scenario-tabs](../examples/scenario-tabs.md), [shared/query-tabs](../shared/query-tabs.md)
