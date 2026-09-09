# Sidebar

<!-- notes -->
The whole navigation shell: provider, rail, collapsible states, the mobile sheet, and `SidebarInset` for the page beside it. `useSidebar` is how a button elsewhere closes it — which it has to, on a tap, or the sheet stays over the page it just navigated to.
<!-- /notes -->

**Source** `src/components/ui/sidebar.tsx` · **Upstream** [sidebar.md](https://ui.shadcn.com/docs/components/base/sidebar.md) · **Client component**

## Import

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
```

## Exports

### `Sidebar` — component

```ts
Sidebar(props: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
})
```

### `SidebarContent` — component

```ts
SidebarContent(props: React.ComponentProps<"div">)
```

### `SidebarFooter` — component

```ts
SidebarFooter(props: React.ComponentProps<"div">)
```

### `SidebarGroup` — component

```ts
SidebarGroup(props: React.ComponentProps<"div">)
```

### `SidebarGroupAction` — component

```ts
SidebarGroupAction(props: useRender.ComponentProps<"button"> & React.ComponentProps<"button">)
```

### `SidebarGroupContent` — component

```ts
SidebarGroupContent(props: React.ComponentProps<"div">)
```

### `SidebarGroupLabel` — component

```ts
SidebarGroupLabel(props: useRender.ComponentProps<"div"> & React.ComponentProps<"div">)
```

### `SidebarHeader` — component

```ts
SidebarHeader(props: React.ComponentProps<"div">)
```

### `SidebarInput` — component

```ts
SidebarInput(props: React.ComponentProps<typeof Input>)
```

### `SidebarInset` — component

```ts
SidebarInset(props: React.ComponentProps<"main">)
```

### `SidebarMenu` — component

```ts
SidebarMenu(props: React.ComponentProps<"ul">)
```

### `SidebarMenuAction` — component

```ts
SidebarMenuAction(props: useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    showOnHover?: boolean;
  })
```

### `SidebarMenuBadge` — component

```ts
SidebarMenuBadge(props: React.ComponentProps<"div">)
```

### `SidebarMenuButton` — component

```ts
SidebarMenuButton(props: useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>)
```

### `SidebarMenuItem` — component

```ts
SidebarMenuItem(props: React.ComponentProps<"li">)
```

### `SidebarMenuSkeleton` — component

```ts
SidebarMenuSkeleton(props: React.ComponentProps<"div"> & {
  showIcon?: boolean;
})
```

### `SidebarMenuSub` — component

```ts
SidebarMenuSub(props: React.ComponentProps<"ul">)
```

### `SidebarMenuSubButton` — component

```ts
SidebarMenuSubButton(props: useRender.ComponentProps<"a"> &
  React.ComponentProps<"a"> & {
    size?: "sm" | "md";
    isActive?: boolean;
  })
```

### `SidebarMenuSubItem` — component

```ts
SidebarMenuSubItem(props: React.ComponentProps<"li">)
```

### `SidebarProvider` — component

```ts
SidebarProvider(props: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
})
```

### `SidebarRail` — component

```ts
SidebarRail(props: React.ComponentProps<"button">)
```

### `SidebarSeparator` — component

```ts
SidebarSeparator(props: React.ComponentProps<typeof Separator>)
```

### `SidebarTrigger` — component

```ts
SidebarTrigger(props: React.ComponentProps<typeof Button>)
```

### `useSidebar` — function

```ts
useSidebar()
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="sidebar"]`, `[data-slot="sidebar-container"]`, `[data-slot="sidebar-content"]`, `[data-slot="sidebar-footer"]`, `[data-slot="sidebar-gap"]`, `[data-slot="sidebar-group"]`, `[data-slot="sidebar-group-content"]`, `[data-slot="sidebar-header"]`, `[data-slot="sidebar-inner"]`, `[data-slot="sidebar-input"]`, `[data-slot="sidebar-inset"]`, `[data-slot="sidebar-menu"]`, `[data-slot="sidebar-menu-badge"]`, `[data-slot="sidebar-menu-item"]`, `[data-slot="sidebar-menu-skeleton"]`, `[data-slot="sidebar-menu-sub"]`, `[data-slot="sidebar-menu-sub-item"]`, `[data-slot="sidebar-rail"]`, `[data-slot="sidebar-separator"]`, `[data-slot="sidebar-trigger"]`, `[data-slot="sidebar-wrapper"]`.

## Depends on

- Packages: `@base-ui/react/merge-props`, `@base-ui/react/use-render`, `class-variance-authority`, `cn`, `lucide-react`, `react`
- In this project: `@/components/ui/button`, `@/components/ui/input`, `@/components/ui/separator`, `@/components/ui/sheet`, `@/components/ui/skeleton`, `@/components/ui/tooltip`, `@/hooks/use-mobile`

## Used by

[examples/app-sidebar](../examples/app-sidebar.md), [examples/site-header](../examples/site-header.md), [shared/sidebar-avatar-button](../shared/sidebar-avatar-button.md), [shared/sidebar-nav-button](../shared/sidebar-nav-button.md)
