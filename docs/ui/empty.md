# Empty

<!-- notes -->
The block shown where content would be. `shared/empty-state` is the version to reach for, with the icon, the sentence and the action already arranged.
<!-- /notes -->

**Source** `src/components/ui/empty.tsx` · **Upstream** [empty.md](https://ui.shadcn.com/docs/components/base/empty.md)

## Import

```tsx
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty";
```

## Exports

### `Empty` — component

```ts
Empty(props: React.ComponentProps<"div">)
```

### `EmptyHeader` — component

```ts
EmptyHeader(props: React.ComponentProps<"div">)
```

### `EmptyTitle` — component

```ts
EmptyTitle(props: React.ComponentProps<"div">)
```

### `EmptyDescription` — component

```ts
EmptyDescription(props: React.ComponentProps<"p">)
```

### `EmptyContent` — component

```ts
EmptyContent(props: React.ComponentProps<"div">)
```

### `EmptyMedia` — component

```ts
EmptyMedia(props: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="empty"]`, `[data-slot="empty-content"]`, `[data-slot="empty-description"]`, `[data-slot="empty-header"]`, `[data-slot="empty-icon"]`, `[data-slot="empty-title"]`.

## Depends on

- Packages: `class-variance-authority`, `cn`

## Used by

[shared/empty-state](../shared/empty-state.md)
