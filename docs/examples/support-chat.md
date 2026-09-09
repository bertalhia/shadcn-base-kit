# Support Chat

<!-- notes -->
A conversation: message groups, bubbles, attachments, a day marker, the composer, and the scroller that stays pinned to the bottom without trapping someone reading further up.
<!-- /notes -->

**Source** `src/components/examples/support-chat.tsx` · **Client component**

## Import

```tsx
import { SupportChat } from "@/components/examples/support-chat";
```

## Exports

### `SupportChat` — component

A support thread.

`MessageScroller` is the part worth having: it anchors the newest turn,
keeps the reader's place when older history is prepended, and only offers
the jump button when there is something below to jump to. Markers carry the
events that are not messages — someone joining, the ticket resolving.

```ts
SupportChat()
```

## Depends on

- Packages: `lucide-react`, `react`
- In this project: `@/components/ui/attachment`, `@/components/ui/avatar`, `@/components/ui/bubble`, `@/components/ui/input-group`, `@/components/ui/marker`, `@/components/ui/message`, `@/components/ui/message-scroller`, `@/components/ui/spinner`, `@/utils/number`
