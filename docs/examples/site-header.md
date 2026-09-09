# Site Header

<!-- notes -->
The top bar: breadcrumb, navigation menu, menubar, command palette and the sidebar trigger. The densest thing to fit on a phone, and the one that shows what gets dropped rather than squeezed.
<!-- /notes -->

**Source** `src/components/examples/site-header.tsx` · **Client component**

## Import

```tsx
import { SiteHeader } from "@/components/examples/site-header";
```

## Exports

### `SiteHeader` — component

The bar above the page, and the command menu it opens.

Sits inside `<SidebarInset>`, which is why it renders `SidebarTrigger`
rather than owning the provider. ⌘K is bound here because this is where the
search affordance lives — the shortcut and the button should not drift apart.

```ts
SiteHeader()
```

## Depends on

- Packages: `lucide-react`, `react`
- In this project: `@/components/ui/breadcrumb`, `@/components/ui/button`, `@/components/ui/command`, `@/components/ui/kbd`, `@/components/ui/menubar`, `@/components/ui/navigation-menu`, `@/components/ui/separator`, `@/components/ui/sidebar`, `@/components/ui/tooltip`, `@/constants/navigation`, `@/lib/notify`
