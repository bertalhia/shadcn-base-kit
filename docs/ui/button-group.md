# Button Group

<!-- notes -->
Buttons welded into one control, with the rounding and the shared borders handled. `ButtonGroupText` drops a static label into the strip, `ButtonGroupSeparator` a divider.
<!-- /notes -->

**Source** `src/components/ui/button-group.tsx` · **Upstream** [button-group.md](https://ui.shadcn.com/docs/components/base/button-group.md)

## Import

```tsx
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
} from "@/components/ui/button-group";
```

## Exports

### `ButtonGroup` — component

```ts
ButtonGroup(props: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>)
```

### `ButtonGroupSeparator` — component

```ts
ButtonGroupSeparator(props: React.ComponentProps<typeof Separator>)
```

### `ButtonGroupText` — component

```ts
ButtonGroupText(props: useRender.ComponentProps<"div">)
```

### `buttonGroupVariants` — variants

```ts
const buttonGroupVariants
```

| Variant | Options | Default |
| --- | --- | --- |
| `orientation` | `horizontal` `vertical` | `horizontal` |

## Data slots

Style against these rather than adding a class of your own: `[data-slot="button-group"]`, `[data-slot="button-group-separator"]`.

## Depends on

- Packages: `@base-ui/react/merge-props`, `@base-ui/react/use-render`, `class-variance-authority`, `cn`
- In this project: `@/components/ui/separator`

## Used by

[examples/feedback-playground](../examples/feedback-playground.md), [examples/product-gallery](../examples/product-gallery.md)
