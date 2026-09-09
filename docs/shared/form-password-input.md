# Form Password Input

<!-- notes -->
A password, wired to the form. Rules belong in `passwordSchema`.
<!-- /notes -->

**Source** `src/components/shared/form-password-input.tsx` · **Client component**

## Import

```tsx
import { FormPasswordInput } from "@/components/shared/form-password-input";
```

## Exports

### `FormPasswordInput` — component

A password, wired to the form. Rules belong in `passwordSchema`.

```ts
FormPasswordInput<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> &
  Omit<React.ComponentProps<typeof PasswordInput>, "value" | "name">)
```

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/shared/password-input`

## Used by

[examples/account-settings](../examples/account-settings.md)
