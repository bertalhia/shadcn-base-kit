# Accordion

<!-- notes -->
Sections that fold away, stacked vertically. Base UI drives it, so the open/closed state reads as `data-open` on the item and the panel exposes its measured height as a CSS variable — a transition needs no JavaScript measuring.
<!-- /notes -->

**Source** `src/components/ui/accordion.tsx` · **Upstream** [accordion.md](https://ui.shadcn.com/docs/components/base/accordion.md)

## Import

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
```

## Exports

### `Accordion` — component

```ts
Accordion(props: AccordionPrimitive.Root.Props)
```

### `AccordionItem` — component

```ts
AccordionItem(props: AccordionPrimitive.Item.Props)
```

### `AccordionTrigger` — component

```ts
AccordionTrigger(props: AccordionPrimitive.Trigger.Props)
```

### `AccordionContent` — component

```ts
AccordionContent(props: AccordionPrimitive.Panel.Props)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="accordion"]`, `[data-slot="accordion-content"]`, `[data-slot="accordion-item"]`, `[data-slot="accordion-trigger"]`, `[data-slot="accordion-trigger-icon"]`.

## Depends on

- Packages: `@base-ui/react/accordion`, `cn`, `lucide-react`

## Used by

[examples/checkout-form](../examples/checkout-form.md), [examples/release-notes](../examples/release-notes.md)
