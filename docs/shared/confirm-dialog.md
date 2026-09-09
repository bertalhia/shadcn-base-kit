# Confirm Dialog

<!-- notes -->
Asks before something that is hard to undo.

AlertDialog on a pointer, drawer on a phone. The confirm label should name
the action — "Delete project" beats "OK", because a person who skimmed the
question can still tell what the button does.

`onConfirm` may return a promise; the dialog stays open and shows a spinner
until it settles, so a failed request does not silently close the dialog.

`AlertDialogAction` in this style is a plain `Button` — unlike the Radix
part of the same name, it does not close anything — so the open state has to
be driven from the root. Passing `open` hands that to the caller; leaving it
off makes the dialog own it, which is what a bare `trigger` needs.
<!-- /notes -->

**Source** `src/components/shared/confirm-dialog.tsx` · **Client component**

## Import

```tsx
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
```

## Exports

### `ConfirmDialog` — component

Asks before something that is hard to undo.

AlertDialog on a pointer, drawer on a phone. The confirm label should name
the action — "Delete project" beats "OK", because a person who skimmed the
question can still tell what the button does.

`onConfirm` may return a promise; the dialog stays open and shows a spinner
until it settles, so a failed request does not silently close the dialog.

`AlertDialogAction` in this style is a plain `Button` — unlike the Radix
part of the same name, it does not close anything — so the open state has to
be driven from the root. Passing `open` hands that to the caller; leaving it
off makes the dialog own it, which is what a bare `trigger` needs.

```ts
ConfirmDialog(props: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactElement;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void | Promise<void>;
})
```

## Depends on

- Packages: `react`
- In this project: `@/components/ui/alert-dialog`, `@/components/ui/button`, `@/components/ui/drawer`, `@/components/ui/spinner`, `@/hooks/use-mobile`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/feedback-playground](../examples/feedback-playground.md), [examples/orders-table](../examples/orders-table.md)
