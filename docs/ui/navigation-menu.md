# Navigation Menu

<!-- notes -->
The site-level menu with panels that open under it. `NavigationMenuPositioner` is where the panel is placed; `navigationMenuTriggerStyle()` gives a plain link the trigger's look.
<!-- /notes -->

**Source** `src/components/ui/navigation-menu.tsx` · **Upstream** [navigation-menu.md](https://ui.shadcn.com/docs/components/base/navigation-menu.md)

## Import

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuPositioner,
} from "@/components/ui/navigation-menu";
```

## Exports

### `NavigationMenu` — component

```ts
NavigationMenu(props: NavigationMenuPrimitive.Root.Props &
  Pick<NavigationMenuPrimitive.Positioner.Props, "align">)
```

### `NavigationMenuContent` — component

```ts
NavigationMenuContent(props: NavigationMenuPrimitive.Content.Props)
```

### `NavigationMenuIndicator` — component

```ts
NavigationMenuIndicator(props: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Icon>)
```

### `NavigationMenuItem` — component

```ts
NavigationMenuItem(props: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>)
```

### `NavigationMenuLink` — component

```ts
NavigationMenuLink(props: NavigationMenuPrimitive.Link.Props)
```

### `NavigationMenuList` — component

```ts
NavigationMenuList(props: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>)
```

### `NavigationMenuTrigger` — component

```ts
NavigationMenuTrigger(props: NavigationMenuPrimitive.Trigger.Props)
```

### `navigationMenuTriggerStyle` — variants

```ts
const navigationMenuTriggerStyle
```

### `NavigationMenuPositioner` — component

```ts
NavigationMenuPositioner(props: NavigationMenuPrimitive.Positioner.Props)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="navigation-menu"]`, `[data-slot="navigation-menu-content"]`, `[data-slot="navigation-menu-indicator"]`, `[data-slot="navigation-menu-item"]`, `[data-slot="navigation-menu-link"]`, `[data-slot="navigation-menu-list"]`, `[data-slot="navigation-menu-trigger"]`.

## Depends on

- Packages: `@base-ui/react/navigation-menu`, `class-variance-authority`, `cn`, `lucide-react`

## Used by

[examples/site-header](../examples/site-header.md)
