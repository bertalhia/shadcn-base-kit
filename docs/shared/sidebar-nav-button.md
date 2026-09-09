# Sidebar Nav Button

<!-- notes -->
A sidebar item that closes the sidebar behind it on a phone. On mobile the sidebar is a sheet over the page, so a destination that leaves it open hides the very thing you navigated to. Not for a row that opens a menu or expands a group — those stay open on purpose.
<!-- /notes -->

**Source** `src/components/shared/sidebar-nav-button.tsx` · **Client component**

## Import

```tsx
import {
  SidebarNavButton,
  SidebarNavSubButton,
} from "@/components/shared/sidebar-nav-button";
```

## Exports

### `SidebarNavButton` — component

```ts
SidebarNavButton(props: React.ComponentProps<typeof SidebarMenuButton>)
```

### `SidebarNavSubButton` — component

```ts
SidebarNavSubButton(props: React.ComponentProps<typeof SidebarMenuSubButton>)
```

## Depends on

- Packages: `react`
- In this project: `@/components/ui/sidebar`

## Used by

[examples/app-sidebar](../examples/app-sidebar.md)
