# Aspect Ratio

<!-- notes -->
Holds a box at a fixed ratio while its width changes, so an image or an embed does not shift the page as it loads.
<!-- /notes -->

**Source** `src/components/ui/aspect-ratio.tsx` · **Upstream** [aspect-ratio.md](https://ui.shadcn.com/docs/components/base/aspect-ratio.md)

## Import

```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio";
```

## Exports

### `AspectRatio` — component

```ts
AspectRatio(props: React.ComponentProps<"div"> & { ratio: number })
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="aspect-ratio"]`.

## Depends on

- Packages: `cn`

## Used by

[examples/product-gallery](../examples/product-gallery.md), [examples/revenue-dashboard](../examples/revenue-dashboard.md)
