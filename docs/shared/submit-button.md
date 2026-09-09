# Submit Button

<!-- notes -->
The button that sends a form.

It reads submission state from the form itself, so no screen has to thread an
`isLoading` prop down to it, and it disables while in flight — the one guard
that actually prevents a double submit.

`useFormState` subscribes to just this slice, so a keystroke in some field
does not re-render the button.
<!-- /notes -->

**Source** `src/components/shared/submit-button.tsx` · **Client component**

## Import

```tsx
import { SubmitButton } from "@/components/shared/submit-button";
```

## Exports

### `SubmitButton` — component

The button that sends a form.

It reads submission state from the form itself, so no screen has to thread an
`isLoading` prop down to it, and it disables while in flight — the one guard
that actually prevents a double submit.

`useFormState` subscribes to just this slice, so a keystroke in some field
does not re-render the button.

```ts
SubmitButton<TFieldValues extends FieldValues>(props: React.ComponentProps<typeof Button> & {
  control: Control<TFieldValues>;
  /** Shown while submitting. Defaults to the idle label. */
  pendingLabel?: React.ReactNode;
})
```

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/ui/button`, `@/components/ui/spinner`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/checkout-form](../examples/checkout-form.md)
