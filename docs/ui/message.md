# Message

<!-- notes -->
One entry in a conversation: avatar, header, bubbles, footer. `data-align` on the group is what sends everything to the right for the person's own turns.
<!-- /notes -->

**Source** `src/components/ui/message.tsx` · **Upstream** [message.md](https://ui.shadcn.com/docs/components/base/message.md)

## Import

```tsx
import {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/components/ui/message";
```

## Exports

### `MessageGroup` — component

```ts
MessageGroup(props: React.ComponentProps<"div">)
```

### `Message` — component

```ts
Message(props: React.ComponentProps<"div"> & { align?: "start" | "end" })
```

### `MessageAvatar` — component

```ts
MessageAvatar(props: React.ComponentProps<"div">)
```

### `MessageContent` — component

```ts
MessageContent(props: React.ComponentProps<"div">)
```

### `MessageFooter` — component

```ts
MessageFooter(props: React.ComponentProps<"div">)
```

### `MessageHeader` — component

```ts
MessageHeader(props: React.ComponentProps<"div">)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="message"]`, `[data-slot="message-avatar"]`, `[data-slot="message-content"]`, `[data-slot="message-footer"]`, `[data-slot="message-group"]`, `[data-slot="message-header"]`.

## Depends on

- Packages: `cn`, `react`

## Used by

[examples/support-chat](../examples/support-chat.md)
