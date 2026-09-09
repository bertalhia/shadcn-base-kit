# Dialog

<!-- notes -->
A modal over the page. On a phone a dialog is worse than a sheet for anything taller than a couple of fields — `shared/responsive-dialog` picks between them for you.
<!-- /notes -->

**Source** `src/components/ui/dialog.tsx` · **Upstream** [dialog.md](https://ui.shadcn.com/docs/components/base/dialog.md) · **Client component**

## Import

```tsx
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
```

## Exports

### `Dialog` — component

```ts
Dialog(props: DialogPrimitive.Root.Props)
```

### `DialogClose` — component

```ts
DialogClose(props: DialogPrimitive.Close.Props)
```

### `DialogContent` — component

```ts
DialogContent(props: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
})
```

### `DialogDescription` — component

```ts
DialogDescription(props: DialogPrimitive.Description.Props)
```

### `DialogFooter` — component

```ts
DialogFooter(props: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
})
```

### `DialogHeader` — component

```ts
DialogHeader(props: React.ComponentProps<"div">)
```

### `DialogOverlay` — component

```ts
DialogOverlay(props: DialogPrimitive.Backdrop.Props)
```

### `DialogPortal` — component

```ts
DialogPortal(props: DialogPrimitive.Portal.Props)
```

### `DialogTitle` — component

```ts
DialogTitle(props: DialogPrimitive.Title.Props)
```

### `DialogTrigger` — component

```ts
DialogTrigger(props: DialogPrimitive.Trigger.Props)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="dialog"]`, `[data-slot="dialog-close"]`, `[data-slot="dialog-content"]`, `[data-slot="dialog-description"]`, `[data-slot="dialog-footer"]`, `[data-slot="dialog-header"]`, `[data-slot="dialog-overlay"]`, `[data-slot="dialog-portal"]`, `[data-slot="dialog-title"]`, `[data-slot="dialog-trigger"]`.

## Depends on

- Packages: `@base-ui/react/dialog`, `cn`, `lucide-react`, `react`
- In this project: `@/components/ui/button`

## Used by

[shared/responsive-dialog](../shared/responsive-dialog.md), [ui/command](../ui/command.md)
