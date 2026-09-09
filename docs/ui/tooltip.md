# Tooltip

<!-- notes -->
A label for a control that shows only an icon. It never carries information that is not repeated elsewhere: there is no hover on a touch screen.
<!-- /notes -->

**Source** `src/components/ui/tooltip.tsx` · **Upstream** [tooltip.md](https://ui.shadcn.com/docs/components/base/tooltip.md) · **Client component**

## Import

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
```

## Exports

### `Tooltip` — component

```ts
Tooltip(props: TooltipPrimitive.Root.Props)
```

### `TooltipTrigger` — component

```ts
TooltipTrigger(props: TooltipPrimitive.Trigger.Props)
```

### `TooltipContent` — component

```ts
TooltipContent(props: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >)
```

### `TooltipProvider` — component

```ts
TooltipProvider(props: TooltipPrimitive.Provider.Props)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="tooltip"]`, `[data-slot="tooltip-content"]`, `[data-slot="tooltip-provider"]`, `[data-slot="tooltip-trigger"]`.

## Depends on

- Packages: `@base-ui/react/tooltip`, `cn`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/product-gallery](../examples/product-gallery.md), [examples/site-header](../examples/site-header.md), [shared/copy-button](../shared/copy-button.md), [ui/sidebar](../ui/sidebar.md)
