# Sheet

<!-- notes -->
The panel that slides in from an edge. It is the phone answer to a dialog with more than a couple of fields, and `shared/responsive-dialog` swaps to it automatically.
<!-- /notes -->

**Source** `src/components/ui/sheet.tsx` · **Upstream** [sheet.md](https://ui.shadcn.com/docs/components/base/sheet.md) · **Client component**

## Import

```tsx
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
```

## Exports

### `Sheet` — component

```ts
Sheet(props: SheetPrimitive.Root.Props)
```

### `SheetTrigger` — component

```ts
SheetTrigger(props: SheetPrimitive.Trigger.Props)
```

### `SheetClose` — component

```ts
SheetClose(props: SheetPrimitive.Close.Props)
```

### `SheetContent` — component

```ts
SheetContent(props: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
})
```

### `SheetHeader` — component

```ts
SheetHeader(props: React.ComponentProps<"div">)
```

### `SheetFooter` — component

```ts
SheetFooter(props: React.ComponentProps<"div">)
```

### `SheetTitle` — component

```ts
SheetTitle(props: SheetPrimitive.Title.Props)
```

### `SheetDescription` — component

```ts
SheetDescription(props: SheetPrimitive.Description.Props)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="sheet"]`, `[data-slot="sheet-close"]`, `[data-slot="sheet-content"]`, `[data-slot="sheet-description"]`, `[data-slot="sheet-footer"]`, `[data-slot="sheet-header"]`, `[data-slot="sheet-overlay"]`, `[data-slot="sheet-portal"]`, `[data-slot="sheet-title"]`, `[data-slot="sheet-trigger"]`.

## Depends on

- Packages: `@base-ui/react/dialog`, `cn`, `lucide-react`, `react`
- In this project: `@/components/ui/button`

## Used by

[examples/orders-table](../examples/orders-table.md), [ui/sidebar](../ui/sidebar.md)
