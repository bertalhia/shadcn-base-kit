# Toggle

<!-- notes -->
A button that stays pressed. One of them alone is usually a `switch` or a `checkbox` wearing a button's clothes; the honest use is inside a `toggle-group`.
<!-- /notes -->

**Source** `src/components/ui/toggle.tsx` · **Upstream** [toggle.md](https://ui.shadcn.com/docs/components/base/toggle.md) · **Client component**

## Import

```tsx
import { Toggle, toggleVariants } from "@/components/ui/toggle";
```

## Exports

### `Toggle` — component

```ts
Toggle(props: TogglePrimitive.Props & VariantProps<typeof toggleVariants>)
```

### `toggleVariants` — variants

```ts
const toggleVariants
```

| Variant | Options | Default |
| --- | --- | --- |
| `variant` | `default` `outline` | `default` |
| `size` | `default` `sm` `lg` | `default` |

## Data slots

Style against these rather than adding a class of your own: `[data-slot="toggle"]`.

## Depends on

- Packages: `@base-ui/react/toggle`, `class-variance-authority`, `cn`

## Used by

[examples/account-settings](../examples/account-settings.md), [ui/toggle-group](../ui/toggle-group.md)
