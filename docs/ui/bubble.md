# Bubble

<!-- notes -->
One turn in a conversation. `BubbleGroup` stacks several from the same speaker, and the side is set by `data-align` on the wrapping `Message`, not by a prop on the bubble.
<!-- /notes -->

**Source** `src/components/ui/bubble.tsx` · **Upstream** [bubble.md](https://ui.shadcn.com/docs/components/base/bubble.md)

## Import

```tsx
import {
  BubbleGroup,
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@/components/ui/bubble";
```

## Exports

### `BubbleGroup` — component

```ts
BubbleGroup(props: React.ComponentProps<"div">)
```

### `Bubble` — component

```ts
Bubble(props: React.ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & {
    align?: "start" | "end";
  })
```

### `BubbleContent` — component

```ts
BubbleContent(props: useRender.ComponentProps<"div">)
```

### `BubbleReactions` — component

```ts
BubbleReactions(props: React.ComponentProps<"div"> & {
  align?: "start" | "end";
  side?: "top" | "bottom";
})
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="bubble"]`, `[data-slot="bubble-group"]`, `[data-slot="bubble-reactions"]`.

## Depends on

- Packages: `@base-ui/react/merge-props`, `@base-ui/react/use-render`, `class-variance-authority`, `cn`, `react`

## Used by

[examples/support-chat](../examples/support-chat.md)
