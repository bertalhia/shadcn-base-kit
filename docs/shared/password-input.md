# Password Input

<!-- notes -->
A password field with a reveal toggle.

Masked characters with no way to check them is where typos hide, and it is
why people paste passwords into a text field to read them back.

The toggle is `type="button"` so it never submits the form around it, and the
visible state is local — a revealed password has no business being persisted.
<!-- /notes -->

**Source** `src/components/shared/password-input.tsx` · **Client component**

## Import

```tsx
import { PasswordInput } from "@/components/shared/password-input";
```

## Exports

### `PasswordInput` — component

A password field with a reveal toggle.

Masked characters with no way to check them is where typos hide, and it is
why people paste passwords into a text field to read them back.

The toggle is `type="button"` so it never submits the form around it, and the
visible state is local — a revealed password has no business being persisted.

```ts
PasswordInput(props: Omit<React.ComponentProps<typeof InputGroupInput>, "type"> & {
  showLabel?: string;
  hideLabel?: string;
})
```

## Depends on

- Packages: `lucide-react`, `react`
- In this project: `@/components/ui/input-group`

## Used by

[shared/form-password-input](../shared/form-password-input.md)
