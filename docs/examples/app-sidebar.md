# App Sidebar

<!-- notes -->
The navigation shell: grouped sections from `constants/navigation.ts`, a collapsible group, the account menu at the foot. It taps `useSidebar` to close the sheet on navigation, which a phone needs or the panel stays over the page it just opened.
<!-- /notes -->

**Source** `src/components/examples/app-sidebar.tsx` · **Client component**

## Import

```tsx
import { AppSidebar } from "@/components/examples/app-sidebar";
```

## Exports

### `AppSidebar` — component

The application sidebar, on its own.

It renders no provider and no inset: in the app router those belong to a
layout, so a route group can decide which of its pages get a sidebar. Drop
`<AppSidebar />` next to `<SidebarInset>` inside a `<SidebarProvider>`.

The open state is persisted by the component itself in a cookie, so the
layout does not flash on the next load.

```ts
AppSidebar(props: React.ComponentProps<typeof Sidebar>)
```

## Depends on

- Packages: `lucide-react`
- In this project: `@/components/shared/menu-section`, `@/components/shared/sidebar-avatar-button`, `@/components/shared/sidebar-nav-button`, `@/components/ui/collapsible`, `@/components/ui/dropdown-menu`, `@/components/ui/sidebar`, `@/constants/navigation`
