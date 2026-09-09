# Menubar

<!-- notes -->
The desktop-application menu strip. It assumes a pointer and a wide window; on a phone the same commands belong in a `dropdown-menu`.
<!-- /notes -->

**Source** `src/components/ui/menubar.tsx` · **Upstream** [menubar.md](https://ui.shadcn.com/docs/components/base/menubar.md) · **Client component**

## Import

```tsx
import {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@/components/ui/menubar";
```

## Exports

### `Menubar` — component

```ts
Menubar(props: MenubarPrimitive.Props)
```

### `MenubarPortal` — component

```ts
MenubarPortal(props: React.ComponentProps<typeof DropdownMenuPortal>)
```

### `MenubarMenu` — component

```ts
MenubarMenu(props: React.ComponentProps<typeof DropdownMenu>)
```

### `MenubarTrigger` — component

```ts
MenubarTrigger(props: React.ComponentProps<typeof DropdownMenuTrigger>)
```

### `MenubarContent` — component

```ts
MenubarContent(props: React.ComponentProps<typeof DropdownMenuContent>)
```

### `MenubarGroup` — component

```ts
MenubarGroup(props: React.ComponentProps<typeof DropdownMenuGroup>)
```

### `MenubarSeparator` — component

```ts
MenubarSeparator(props: React.ComponentProps<typeof DropdownMenuSeparator>)
```

### `MenubarLabel` — component

```ts
MenubarLabel(props: React.ComponentProps<typeof DropdownMenuLabel> & {
  inset?: boolean;
})
```

### `MenubarItem` — component

```ts
MenubarItem(props: React.ComponentProps<typeof DropdownMenuItem>)
```

### `MenubarShortcut` — component

```ts
MenubarShortcut(props: React.ComponentProps<typeof DropdownMenuShortcut>)
```

### `MenubarCheckboxItem` — component

```ts
MenubarCheckboxItem(props: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean;
})
```

### `MenubarRadioGroup` — component

```ts
MenubarRadioGroup(props: React.ComponentProps<typeof DropdownMenuRadioGroup>)
```

### `MenubarRadioItem` — component

```ts
MenubarRadioItem(props: MenuPrimitive.RadioItem.Props & {
  inset?: boolean;
})
```

### `MenubarSub` — component

```ts
MenubarSub(props: React.ComponentProps<typeof DropdownMenuSub>)
```

### `MenubarSubTrigger` — component

```ts
MenubarSubTrigger(props: React.ComponentProps<typeof DropdownMenuSubTrigger> & {
  inset?: boolean;
})
```

### `MenubarSubContent` — component

```ts
MenubarSubContent(props: React.ComponentProps<typeof DropdownMenuSubContent>)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="menubar"]`, `[data-slot="menubar-checkbox-item"]`, `[data-slot="menubar-content"]`, `[data-slot="menubar-group"]`, `[data-slot="menubar-item"]`, `[data-slot="menubar-label"]`, `[data-slot="menubar-menu"]`, `[data-slot="menubar-portal"]`, `[data-slot="menubar-radio-group"]`, `[data-slot="menubar-radio-item"]`, `[data-slot="menubar-separator"]`, `[data-slot="menubar-shortcut"]`, `[data-slot="menubar-sub"]`, `[data-slot="menubar-sub-content"]`, `[data-slot="menubar-sub-trigger"]`, `[data-slot="menubar-trigger"]`.

## Depends on

- Packages: `@base-ui/react/menu`, `@base-ui/react/menubar`, `cn`, `lucide-react`, `react`
- In this project: `@/components/ui/dropdown-menu`

## Used by

[examples/site-header](../examples/site-header.md), [shared/menu-section](../shared/menu-section.md)
