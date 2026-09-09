# Dropdown Menu

<!-- notes -->
The menu a button opens. Checkbox and radio items keep their own state, so they are the right home for a filter that is not worth a URL key. Its open state is transient — `useState`, never nuqs.
<!-- /notes -->

**Source** `src/components/ui/dropdown-menu.tsx` · **Upstream** [dropdown-menu.md](https://ui.shadcn.com/docs/components/base/dropdown-menu.md) · **Client component**

## Import

```tsx
import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
```

## Exports

### `DropdownMenu` — component

```ts
DropdownMenu(props: MenuPrimitive.Root.Props)
```

### `DropdownMenuPortal` — component

```ts
DropdownMenuPortal(props: MenuPrimitive.Portal.Props)
```

### `DropdownMenuTrigger` — component

```ts
DropdownMenuTrigger(props: MenuPrimitive.Trigger.Props)
```

### `DropdownMenuContent` — component

```ts
DropdownMenuContent(props: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >)
```

### `DropdownMenuGroup` — component

```ts
DropdownMenuGroup(props: MenuPrimitive.Group.Props)
```

### `DropdownMenuLabel` — component

```ts
DropdownMenuLabel(props: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
})
```

### `DropdownMenuItem` — component

```ts
DropdownMenuItem(props: MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
})
```

### `DropdownMenuCheckboxItem` — component

```ts
DropdownMenuCheckboxItem(props: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean;
})
```

### `DropdownMenuRadioGroup` — component

```ts
DropdownMenuRadioGroup(props: MenuPrimitive.RadioGroup.Props)
```

### `DropdownMenuRadioItem` — component

```ts
DropdownMenuRadioItem(props: MenuPrimitive.RadioItem.Props & {
  inset?: boolean;
})
```

### `DropdownMenuSeparator` — component

```ts
DropdownMenuSeparator(props: MenuPrimitive.Separator.Props)
```

### `DropdownMenuShortcut` — component

```ts
DropdownMenuShortcut(props: React.ComponentProps<"span">)
```

### `DropdownMenuSub` — component

```ts
DropdownMenuSub(props: MenuPrimitive.SubmenuRoot.Props)
```

### `DropdownMenuSubTrigger` — component

```ts
DropdownMenuSubTrigger(props: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
})
```

### `DropdownMenuSubContent` — component

```ts
DropdownMenuSubContent(props: React.ComponentProps<typeof DropdownMenuContent>)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="dropdown-menu"]`, `[data-slot="dropdown-menu-checkbox-item"]`, `[data-slot="dropdown-menu-checkbox-item-indicator"]`, `[data-slot="dropdown-menu-content"]`, `[data-slot="dropdown-menu-group"]`, `[data-slot="dropdown-menu-item"]`, `[data-slot="dropdown-menu-label"]`, `[data-slot="dropdown-menu-portal"]`, `[data-slot="dropdown-menu-radio-group"]`, `[data-slot="dropdown-menu-radio-item"]`, `[data-slot="dropdown-menu-radio-item-indicator"]`, `[data-slot="dropdown-menu-separator"]`, `[data-slot="dropdown-menu-shortcut"]`, `[data-slot="dropdown-menu-sub"]`, `[data-slot="dropdown-menu-sub-content"]`, `[data-slot="dropdown-menu-sub-trigger"]`, `[data-slot="dropdown-menu-trigger"]`.

## Depends on

- Packages: `@base-ui/react/menu`, `cn`, `lucide-react`, `react`

## Used by

[examples/app-sidebar](../examples/app-sidebar.md), [examples/orders-table](../examples/orders-table.md), [shared/menu-section](../shared/menu-section.md), [ui/data-table](../ui/data-table.md), [ui/menubar](../ui/menubar.md)
