# Form Textarea

<!-- notes -->
Multi-line text, for anything a person writes in sentences.
<!-- /notes -->

**Source** `src/components/shared/form-textarea.tsx` · **Client component**

## Import

```tsx
import { FormTextarea } from "@/components/shared/form-textarea";
```

## Exports

### `FormTextarea` — component

Multi-line text, for anything a person writes in sentences.

```ts
FormTextarea<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> &
  Omit<React.ComponentProps<typeof Textarea>, "name" | "form">)
```

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/ui/textarea`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/checkout-form](../examples/checkout-form.md)
