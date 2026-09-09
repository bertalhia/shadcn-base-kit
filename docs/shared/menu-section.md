# Menu Section

<!-- notes -->
A labelled block of menu items.

Base UI reads a group context from every label part, so a label rendered as
a sibling of its group — the obvious-looking arrangement — throws the moment
the menu opens:

    Base UI: MenuGroupContext is missing.

TypeScript cannot catch it, since the props are valid either way. Pairing
the two here means a call site cannot get the nesting wrong: pass `label`
and the items as children, and the group comes with it.

A group with no label is still a group — it separates items for assistive
technology — so `label` is optional.
<!-- /notes -->

**Source** `src/components/shared/menu-section.tsx` · **Client component**

## Import

```tsx
import {
  DropdownMenuSection,
  ContextMenuSection,
  MenubarSection,
  SelectSection,
} from "@/components/shared/menu-section";
```

## Exports

### `DropdownMenuSection` — component

A labelled block of menu items.

Base UI reads a group context from every label part, so a label rendered as
a sibling of its group — the obvious-looking arrangement — throws the moment
the menu opens:

    Base UI: MenuGroupContext is missing.

TypeScript cannot catch it, since the props are valid either way. Pairing
the two here means a call site cannot get the nesting wrong: pass `label`
and the items as children, and the group comes with it.

A group with no label is still a group — it separates items for assistive
technology — so `label` is optional.

```ts
DropdownMenuSection(props: React.ComponentProps<typeof DropdownMenuGroup> & {
  label?: React.ReactNode;
})
```

### `ContextMenuSection` — component

```ts
ContextMenuSection(props: React.ComponentProps<typeof ContextMenuGroup> & {
  label?: React.ReactNode;
})
```

### `MenubarSection` — component

```ts
MenubarSection(props: React.ComponentProps<typeof MenubarGroup> & {
  label?: React.ReactNode;
})
```

### `SelectSection` — component

```ts
SelectSection(props: React.ComponentProps<typeof SelectGroup> & {
  label?: React.ReactNode;
})
```

## Depends on

- Packages: `react`
- In this project: `@/components/ui/context-menu`, `@/components/ui/dropdown-menu`, `@/components/ui/menubar`, `@/components/ui/select`

## Used by

[examples/app-sidebar](../examples/app-sidebar.md), [examples/orders-table](../examples/orders-table.md), [ui/data-table](../ui/data-table.md)
