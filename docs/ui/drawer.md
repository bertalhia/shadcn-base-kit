# Drawer

<!-- notes -->
The sheet that slides from the bottom and answers to a swipe. `DrawerSwipeHandle` is the grab bar that tells a thumb it can be dragged.
<!-- /notes -->

**Source** `src/components/ui/drawer.tsx` · **Upstream** [drawer.md](https://ui.shadcn.com/docs/components/base/drawer.md) · **Client component**

## Import

```tsx
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
```

## Exports

### `Drawer` — component

```ts
Drawer(props: DrawerPrimitive.Root.Props & {
  showSwipeHandle?: boolean;
})
```

### `DrawerPortal` — component

```ts
DrawerPortal(props: DrawerPrimitive.Portal.Props)
```

### `DrawerOverlay` — component

```ts
DrawerOverlay(props: DrawerPrimitive.Backdrop.Props)
```

### `DrawerSwipeHandle` — component

```ts
DrawerSwipeHandle(props: React.ComponentProps<"div">)
```

### `DrawerTrigger` — component

```ts
DrawerTrigger(props: DrawerPrimitive.Trigger.Props)
```

### `DrawerClose` — component

```ts
DrawerClose(props: DrawerPrimitive.Close.Props)
```

### `DrawerContent` — component

```ts
DrawerContent(props: DrawerPrimitive.Popup.Props)
```

### `DrawerHeader` — component

```ts
DrawerHeader(props: React.ComponentProps<"div">)
```

### `DrawerFooter` — component

```ts
DrawerFooter(props: React.ComponentProps<"div">)
```

### `DrawerTitle` — component

```ts
DrawerTitle(props: DrawerPrimitive.Title.Props)
```

### `DrawerDescription` — component

```ts
DrawerDescription(props: DrawerPrimitive.Description.Props)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="drawer"]`, `[data-slot="drawer-close"]`, `[data-slot="drawer-content"]`, `[data-slot="drawer-description"]`, `[data-slot="drawer-footer"]`, `[data-slot="drawer-header"]`, `[data-slot="drawer-overlay"]`, `[data-slot="drawer-popup"]`, `[data-slot="drawer-portal"]`, `[data-slot="drawer-swipe-handle"]`, `[data-slot="drawer-title"]`, `[data-slot="drawer-trigger"]`, `[data-slot="drawer-viewport"]`.

## Depends on

- Packages: `@base-ui/react/drawer`, `cn`, `react`

## Used by

[shared/confirm-dialog](../shared/confirm-dialog.md), [shared/responsive-dialog](../shared/responsive-dialog.md)
