# Product Gallery

<!-- notes -->
A carousel, hover previews and a context menu over a grid of cards. Also the reference for skeletons that match the shape of what is loading.
<!-- /notes -->

**Source** `src/components/examples/product-gallery.tsx` · **Client component**

## Import

```tsx
import { ProductGallery } from "@/components/examples/product-gallery";
```

## Exports

### `ProductGallery` — component

A product shelf.

Right-clicking a card opens the same actions the row offers, which is the
point of `ContextMenu` — it does not replace visible controls, it shortcuts
them. The last slide is a skeleton, standing in for a page still loading.

```ts
ProductGallery()
```

## Depends on

- Packages: `lucide-react`
- In this project: `@/components/shared/section`, `@/components/ui/aspect-ratio`, `@/components/ui/badge`, `@/components/ui/button`, `@/components/ui/button-group`, `@/components/ui/carousel`, `@/components/ui/context-menu`, `@/components/ui/hover-card`, `@/components/ui/item`, `@/components/ui/skeleton`, `@/components/ui/tooltip`, `@/lib/notify`, `@/utils/number`
