# Collapsible

<!-- notes -->
One region that opens and closes. `accordion` is this with several regions and a shared rule about how many stay open.
<!-- /notes -->

**Source** `src/components/ui/collapsible.tsx` · **Upstream** [collapsible.md](https://ui.shadcn.com/docs/components/base/collapsible.md) · **Client component**

## Import

```tsx
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
```

## Exports

### `Collapsible` — component

```ts
Collapsible(props: CollapsiblePrimitive.Root.Props)
```

### `CollapsibleTrigger` — component

```ts
CollapsibleTrigger(props: CollapsiblePrimitive.Trigger.Props)
```

### `CollapsibleContent` — component

```ts
CollapsibleContent(props: CollapsiblePrimitive.Panel.Props)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="collapsible"]`, `[data-slot="collapsible-content"]`, `[data-slot="collapsible-trigger"]`.

## Depends on

- Packages: `@base-ui/react/collapsible`

## Used by

[examples/app-sidebar](../examples/app-sidebar.md), [examples/release-notes](../examples/release-notes.md)
