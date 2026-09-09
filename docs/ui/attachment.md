# Attachment

<!-- notes -->
A file pinned to a message: thumbnail, name, size, and the controls to open or remove it. `AttachmentGroup` lays several out in a row.
<!-- /notes -->

**Source** `src/components/ui/attachment.tsx` · **Upstream** [attachment.md](https://ui.shadcn.com/docs/components/base/attachment.md)

## Import

```tsx
import {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
} from "@/components/ui/attachment";
```

## Exports

### `Attachment` — component

```ts
Attachment(props: React.ComponentProps<"div"> &
  VariantProps<typeof attachmentVariants> & {
    state?: "idle" | "uploading" | "processing" | "error" | "done";
  })
```

### `AttachmentGroup` — component

```ts
AttachmentGroup(props: React.ComponentProps<"div">)
```

### `AttachmentMedia` — component

```ts
AttachmentMedia(props: React.ComponentProps<"div"> & VariantProps<typeof attachmentMediaVariants>)
```

### `AttachmentContent` — component

```ts
AttachmentContent(props: React.ComponentProps<"div">)
```

### `AttachmentTitle` — component

```ts
AttachmentTitle(props: React.ComponentProps<"span">)
```

### `AttachmentDescription` — component

```ts
AttachmentDescription(props: React.ComponentProps<"span">)
```

### `AttachmentActions` — component

```ts
AttachmentActions(props: React.ComponentProps<"div">)
```

### `AttachmentAction` — component

```ts
AttachmentAction(props: React.ComponentProps<typeof Button>)
```

### `AttachmentTrigger` — component

```ts
AttachmentTrigger(props: useRender.ComponentProps<"button">)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="attachment"]`, `[data-slot="attachment-action"]`, `[data-slot="attachment-actions"]`, `[data-slot="attachment-content"]`, `[data-slot="attachment-description"]`, `[data-slot="attachment-group"]`, `[data-slot="attachment-media"]`, `[data-slot="attachment-title"]`.

## Depends on

- Packages: `@base-ui/react/merge-props`, `@base-ui/react/use-render`, `class-variance-authority`, `cn`, `react`
- In this project: `@/components/ui/button`

## Used by

[examples/support-chat](../examples/support-chat.md), [shared/form-file-input](../shared/form-file-input.md)
