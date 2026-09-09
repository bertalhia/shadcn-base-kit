# Hover Card

<!-- notes -->
A preview that opens on hover. Hover does not exist on a touch screen, so whatever is inside has to be reachable another way.
<!-- /notes -->

**Source** `src/components/ui/hover-card.tsx` · **Upstream** [hover-card.md](https://ui.shadcn.com/docs/components/base/hover-card.md) · **Client component**

## Import

```tsx
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
```

## Exports

### `HoverCard` — component

```ts
HoverCard(props: PreviewCardPrimitive.Root.Props)
```

### `HoverCardTrigger` — component

```ts
HoverCardTrigger(props: PreviewCardPrimitive.Trigger.Props)
```

### `HoverCardContent` — component

```ts
HoverCardContent(props: PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="hover-card"]`, `[data-slot="hover-card-content"]`, `[data-slot="hover-card-portal"]`, `[data-slot="hover-card-trigger"]`.

## Depends on

- Packages: `@base-ui/react/preview-card`, `cn`

## Used by

[examples/product-gallery](../examples/product-gallery.md), [examples/revenue-dashboard](../examples/revenue-dashboard.md)
