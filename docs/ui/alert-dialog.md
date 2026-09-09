# Alert Dialog

<!-- notes -->
A dialog that has to be answered — no dismissing by clicking outside or pressing Escape. Reach for it only when the action destroys something. `shared/confirm-dialog` already wraps it with the title, the description and the two buttons.
<!-- /notes -->

**Source** `src/components/ui/alert-dialog.tsx` · **Upstream** [alert-dialog.md](https://ui.shadcn.com/docs/components/base/alert-dialog.md) · **Client component**

## Import

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
```

## Exports

### `AlertDialog` — component

```ts
AlertDialog(props: AlertDialogPrimitive.Root.Props)
```

### `AlertDialogAction` — component

```ts
AlertDialogAction(props: React.ComponentProps<typeof Button>)
```

### `AlertDialogCancel` — component

```ts
AlertDialogCancel(props: AlertDialogPrimitive.Close.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">)
```

### `AlertDialogContent` — component

```ts
AlertDialogContent(props: AlertDialogPrimitive.Popup.Props & {
  size?: "default" | "sm";
})
```

### `AlertDialogDescription` — component

```ts
AlertDialogDescription(props: React.ComponentProps<typeof AlertDialogPrimitive.Description>)
```

### `AlertDialogFooter` — component

```ts
AlertDialogFooter(props: React.ComponentProps<"div">)
```

### `AlertDialogHeader` — component

```ts
AlertDialogHeader(props: React.ComponentProps<"div">)
```

### `AlertDialogMedia` — component

```ts
AlertDialogMedia(props: React.ComponentProps<"div">)
```

### `AlertDialogOverlay` — component

```ts
AlertDialogOverlay(props: AlertDialogPrimitive.Backdrop.Props)
```

### `AlertDialogPortal` — component

```ts
AlertDialogPortal(props: AlertDialogPrimitive.Portal.Props)
```

### `AlertDialogTitle` — component

```ts
AlertDialogTitle(props: React.ComponentProps<typeof AlertDialogPrimitive.Title>)
```

### `AlertDialogTrigger` — component

```ts
AlertDialogTrigger(props: AlertDialogPrimitive.Trigger.Props)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="alert-dialog"]`, `[data-slot="alert-dialog-action"]`, `[data-slot="alert-dialog-cancel"]`, `[data-slot="alert-dialog-content"]`, `[data-slot="alert-dialog-description"]`, `[data-slot="alert-dialog-footer"]`, `[data-slot="alert-dialog-header"]`, `[data-slot="alert-dialog-media"]`, `[data-slot="alert-dialog-overlay"]`, `[data-slot="alert-dialog-portal"]`, `[data-slot="alert-dialog-title"]`, `[data-slot="alert-dialog-trigger"]`.

## Depends on

- Packages: `@base-ui/react/alert-dialog`, `cn`, `react`
- In this project: `@/components/ui/button`

## Used by

[shared/confirm-dialog](../shared/confirm-dialog.md)
