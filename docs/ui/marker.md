# Marker

<!-- notes -->
A quiet line between blocks of content — a timestamp in a chat, a "3 unread" rule. The `separator` variant draws the line through the middle of the text.
<!-- /notes -->

**Source** `src/components/ui/marker.tsx` · **Upstream** [marker.md](https://ui.shadcn.com/docs/components/base/marker.md)

## Import

```tsx
import {
  Marker,
  MarkerIcon,
  MarkerContent,
  markerVariants,
} from "@/components/ui/marker";
```

## Exports

### `Marker` — component

```ts
Marker(props: useRender.ComponentProps<"div"> & VariantProps<typeof markerVariants>)
```

### `MarkerIcon` — component

```ts
MarkerIcon(props: React.ComponentProps<"span">)
```

### `MarkerContent` — component

```ts
MarkerContent(props: React.ComponentProps<"span">)
```

### `markerVariants` — variants

```ts
const markerVariants
```

| Variant | Options | Default |
| --- | --- | --- |
| `variant` | `default` `separator` `border` | — |

## Data slots

Style against these rather than adding a class of your own: `[data-slot="marker-content"]`, `[data-slot="marker-icon"]`.

## Depends on

- Packages: `@base-ui/react/merge-props`, `@base-ui/react/use-render`, `class-variance-authority`, `cn`, `react`

## Used by

[examples/support-chat](../examples/support-chat.md)
