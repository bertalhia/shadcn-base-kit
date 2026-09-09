# Popover

<!-- notes -->
A panel anchored to a trigger, for content that is not a menu and not a form. Its open state is transient: `useState`, not nuqs, or a reload reopens it and the Back button fills with noise.
<!-- /notes -->

**Source** `src/components/ui/popover.tsx` · **Upstream** [popover.md](https://ui.shadcn.com/docs/components/base/popover.md) · **Client component**

## Import

```tsx
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
```

## Exports

### `Popover` — component

```ts
Popover(props: PopoverPrimitive.Root.Props)
```

### `PopoverContent` — component

```ts
PopoverContent(props: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >)
```

### `PopoverDescription` — component

```ts
PopoverDescription(props: PopoverPrimitive.Description.Props)
```

### `PopoverHeader` — component

```ts
PopoverHeader(props: React.ComponentProps<"div">)
```

### `PopoverTitle` — component

```ts
PopoverTitle(props: PopoverPrimitive.Title.Props)
```

### `PopoverTrigger` — component

```ts
PopoverTrigger(props: PopoverPrimitive.Trigger.Props)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="popover"]`, `[data-slot="popover-content"]`, `[data-slot="popover-description"]`, `[data-slot="popover-header"]`, `[data-slot="popover-title"]`, `[data-slot="popover-trigger"]`.

## Depends on

- Packages: `@base-ui/react/popover`, `cn`, `react`

## Used by

[examples/feedback-playground](../examples/feedback-playground.md), [ui/date-picker](../ui/date-picker.md)
