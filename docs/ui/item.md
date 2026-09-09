# Item

<!-- notes -->
A row: media on the left, title and description in the middle, actions on the right. It is the shape behind most lists here, and it beats hand-rolling a flex row per screen.
<!-- /notes -->

**Source** `src/components/ui/item.tsx` · **Upstream** [item.md](https://ui.shadcn.com/docs/components/base/item.md)

## Import

```tsx
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
} from "@/components/ui/item";
```

## Exports

### `Item` — component

```ts
Item(props: useRender.ComponentProps<"div"> & VariantProps<typeof itemVariants>)
```

### `ItemMedia` — component

```ts
ItemMedia(props: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>)
```

### `ItemContent` — component

```ts
ItemContent(props: React.ComponentProps<"div">)
```

### `ItemActions` — component

```ts
ItemActions(props: React.ComponentProps<"div">)
```

### `ItemGroup` — component

```ts
ItemGroup(props: React.ComponentProps<"div">)
```

### `ItemSeparator` — component

```ts
ItemSeparator(props: React.ComponentProps<typeof Separator>)
```

### `ItemTitle` — component

```ts
ItemTitle(props: React.ComponentProps<"div">)
```

### `ItemDescription` — component

```ts
ItemDescription(props: React.ComponentProps<"p">)
```

### `ItemHeader` — component

```ts
ItemHeader(props: React.ComponentProps<"div">)
```

### `ItemFooter` — component

```ts
ItemFooter(props: React.ComponentProps<"div">)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="item-actions"]`, `[data-slot="item-content"]`, `[data-slot="item-description"]`, `[data-slot="item-footer"]`, `[data-slot="item-group"]`, `[data-slot="item-header"]`, `[data-slot="item-media"]`, `[data-slot="item-separator"]`, `[data-slot="item-title"]`.

## Depends on

- Packages: `@base-ui/react/merge-props`, `@base-ui/react/use-render`, `class-variance-authority`, `cn`, `react`
- In this project: `@/components/ui/separator`

## Used by

[examples/checkout-form](../examples/checkout-form.md), [examples/product-gallery](../examples/product-gallery.md)
