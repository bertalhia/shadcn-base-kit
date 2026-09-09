# Sidebar Avatar Button

<!-- notes -->
A sidebar row that leads with an avatar — a workspace switcher, an account
menu.

Collapsed to icons the button becomes a 32px square, and a row of avatar
plus label plus chevron does not fit in it. The flex line then starts at the
left edge and overflows, so the avatar lands off-centre inside a button that
is itself perfectly centred: 4px too far left in the header, 4px too far
right in the footer, where the padding differs.

Hiding the text and the trailing slot while collapsed leaves the avatar
alone to be centred, and dropping the padding gives it the full 32px to
centre within.
<!-- /notes -->

**Source** `src/components/shared/sidebar-avatar-button.tsx` · **Client component**

## Import

```tsx
import { SidebarAvatarButton } from "@/components/shared/sidebar-avatar-button";
```

## Exports

### `SidebarAvatarButton` — component

A sidebar row that leads with an avatar — a workspace switcher, an account
menu.

Collapsed to icons the button becomes a 32px square, and a row of avatar
plus label plus chevron does not fit in it. The flex line then starts at the
left edge and overflows, so the avatar lands off-centre inside a button that
is itself perfectly centred: 4px too far left in the header, 4px too far
right in the footer, where the padding differs.

Hiding the text and the trailing slot while collapsed leaves the avatar
alone to be centred, and dropping the padding gives it the full 32px to
centre within.

```ts
SidebarAvatarButton(props: React.ComponentProps<typeof SidebarMenuButton> & {
  /** Initials shown until the image loads, or when there is none. */
  fallback: string;
  src?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Sits at the end while expanded — a chevron, a badge. */
  trailing?: React.ReactNode;
})
```

## Depends on

- Packages: `cn`, `react`
- In this project: `@/components/ui/avatar`, `@/components/ui/sidebar`

## Used by

[examples/app-sidebar](../examples/app-sidebar.md)
