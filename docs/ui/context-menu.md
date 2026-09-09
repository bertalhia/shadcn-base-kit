# Context Menu

<!-- notes -->
The menu on right-click. It has no touch equivalent, so anything that lives only here is unreachable on a phone; repeat it in a `dropdown-menu` or a row action.
<!-- /notes -->

**Source** `src/components/ui/context-menu.tsx` · **Upstream** [context-menu.md](https://ui.shadcn.com/docs/components/base/context-menu.md) · **Client component**

## Import

```tsx
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from "@/components/ui/context-menu";
```

## Exports

### `ContextMenu` — component

```ts
ContextMenu(props: ContextMenuPrimitive.Root.Props)
```

### `ContextMenuTrigger` — component

```ts
ContextMenuTrigger(props: ContextMenuPrimitive.Trigger.Props)
```

### `ContextMenuContent` — component

```ts
ContextMenuContent(props: ContextMenuPrimitive.Popup.Props &
  Pick<
    ContextMenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >)
```

### `ContextMenuItem` — component

```ts
ContextMenuItem(props: ContextMenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
})
```

### `ContextMenuCheckboxItem` — component

```ts
ContextMenuCheckboxItem(props: ContextMenuPrimitive.CheckboxItem.Props & {
  inset?: boolean;
})
```

### `ContextMenuRadioItem` — component

```ts
ContextMenuRadioItem(props: ContextMenuPrimitive.RadioItem.Props & {
  inset?: boolean;
})
```

### `ContextMenuLabel` — component

```ts
ContextMenuLabel(props: ContextMenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
})
```

### `ContextMenuSeparator` — component

```ts
ContextMenuSeparator(props: ContextMenuPrimitive.Separator.Props)
```

### `ContextMenuShortcut` — component

```ts
ContextMenuShortcut(props: React.ComponentProps<"span">)
```

### `ContextMenuGroup` — component

```ts
ContextMenuGroup(props: ContextMenuPrimitive.Group.Props)
```

### `ContextMenuPortal` — component

```ts
ContextMenuPortal(props: ContextMenuPrimitive.Portal.Props)
```

### `ContextMenuSub` — component

```ts
ContextMenuSub(props: ContextMenuPrimitive.SubmenuRoot.Props)
```

### `ContextMenuSubContent` — component

```ts
ContextMenuSubContent(props: React.ComponentProps<typeof ContextMenuContent>)
```

### `ContextMenuSubTrigger` — component

```ts
ContextMenuSubTrigger(props: ContextMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
})
```

### `ContextMenuRadioGroup` — component

```ts
ContextMenuRadioGroup(props: ContextMenuPrimitive.RadioGroup.Props)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="context-menu"]`, `[data-slot="context-menu-checkbox-item"]`, `[data-slot="context-menu-content"]`, `[data-slot="context-menu-group"]`, `[data-slot="context-menu-item"]`, `[data-slot="context-menu-label"]`, `[data-slot="context-menu-portal"]`, `[data-slot="context-menu-radio-group"]`, `[data-slot="context-menu-radio-item"]`, `[data-slot="context-menu-separator"]`, `[data-slot="context-menu-shortcut"]`, `[data-slot="context-menu-sub"]`, `[data-slot="context-menu-sub-content"]`, `[data-slot="context-menu-sub-trigger"]`, `[data-slot="context-menu-trigger"]`.

## Depends on

- Packages: `@base-ui/react/context-menu`, `cn`, `lucide-react`, `react`

## Used by

[examples/product-gallery](../examples/product-gallery.md), [shared/menu-section](../shared/menu-section.md)
