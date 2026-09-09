# Message Scroller

<!-- notes -->
The scroll behaviour a chat needs — pinned to the bottom, staying put when the person scrolls up, and a button back down. The hooks report whether the viewport is scrollable and whether the newest message is in view.
<!-- /notes -->

**Source** `src/components/ui/message-scroller.tsx` · **Upstream** [message-scroller.md](https://ui.shadcn.com/docs/components/base/message-scroller.md) · **Client component**

## Import

```tsx
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@/components/ui/message-scroller";
```

## Exports

### `MessageScrollerProvider` — component

```ts
MessageScrollerProvider(props: React.ComponentProps<typeof MessageScrollerPrimitive.Provider>)
```

### `MessageScroller` — component

```ts
MessageScroller(props: React.ComponentProps<typeof MessageScrollerPrimitive.Root>)
```

### `MessageScrollerViewport` — component

```ts
MessageScrollerViewport(props: React.ComponentProps<typeof MessageScrollerPrimitive.Viewport>)
```

### `MessageScrollerContent` — component

```ts
MessageScrollerContent(props: React.ComponentProps<typeof MessageScrollerPrimitive.Content>)
```

### `MessageScrollerItem` — component

```ts
MessageScrollerItem(props: React.ComponentProps<typeof MessageScrollerPrimitive.Item>)
```

### `MessageScrollerButton` — component

```ts
MessageScrollerButton(props: React.ComponentProps<typeof MessageScrollerPrimitive.Button> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">)
```

### `useMessageScroller` — const

```ts
const useMessageScroller
```

### `useMessageScrollerScrollable` — const

```ts
const useMessageScrollerScrollable
```

### `useMessageScrollerVisibility` — const

```ts
const useMessageScrollerVisibility
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="message-scroller"]`, `[data-slot="message-scroller-button"]`, `[data-slot="message-scroller-content"]`, `[data-slot="message-scroller-item"]`, `[data-slot="message-scroller-viewport"]`.

## Depends on

- Packages: `@shadcn/react/message-scroller`, `cn`, `lucide-react`, `react`
- In this project: `@/components/ui/button`

## Used by

[examples/support-chat](../examples/support-chat.md)
