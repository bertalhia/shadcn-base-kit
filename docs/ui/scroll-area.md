# Scroll Area

<!-- notes -->
A box that scrolls with a styled bar. The page itself never scrolls sideways; this is how a genuinely wide element scrolls inside its own edges.
<!-- /notes -->

**Source** `src/components/ui/scroll-area.tsx` · **Upstream** [scroll-area.md](https://ui.shadcn.com/docs/components/base/scroll-area.md) · **Client component**

## Import

```tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
```

## Exports

### `ScrollArea` — component

```ts
ScrollArea(props: ScrollAreaPrimitive.Root.Props)
```

### `ScrollBar` — component

```ts
ScrollBar(props: ScrollAreaPrimitive.Scrollbar.Props)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="scroll-area"]`, `[data-slot="scroll-area-scrollbar"]`, `[data-slot="scroll-area-thumb"]`, `[data-slot="scroll-area-viewport"]`.

## Depends on

- Packages: `@base-ui/react/scroll-area`, `cn`

## Used by

[examples/revenue-dashboard](../examples/revenue-dashboard.md)
