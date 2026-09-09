# Avatar

<!-- notes -->
A person's picture, with initials behind it while the image loads or when there is none. `AvatarGroup` overlaps several and `AvatarGroupCount` closes the row with a `+3`.
<!-- /notes -->

**Source** `src/components/ui/avatar.tsx` · **Upstream** [avatar.md](https://ui.shadcn.com/docs/components/base/avatar.md) · **Client component**

## Import

```tsx
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
} from "@/components/ui/avatar";
```

## Exports

### `Avatar` — component

```ts
Avatar(props: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg";
})
```

### `AvatarImage` — component

```ts
AvatarImage(props: AvatarPrimitive.Image.Props)
```

### `AvatarFallback` — component

```ts
AvatarFallback(props: AvatarPrimitive.Fallback.Props)
```

### `AvatarGroup` — component

```ts
AvatarGroup(props: React.ComponentProps<"div">)
```

### `AvatarGroupCount` — component

```ts
AvatarGroupCount(props: React.ComponentProps<"div">)
```

### `AvatarBadge` — component

```ts
AvatarBadge(props: React.ComponentProps<"span">)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="avatar"]`, `[data-slot="avatar-badge"]`, `[data-slot="avatar-fallback"]`, `[data-slot="avatar-group"]`, `[data-slot="avatar-group-count"]`, `[data-slot="avatar-image"]`.

## Depends on

- Packages: `@base-ui/react/avatar`, `cn`, `react`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/revenue-dashboard](../examples/revenue-dashboard.md), [examples/support-chat](../examples/support-chat.md), [shared/sidebar-avatar-button](../shared/sidebar-avatar-button.md)
