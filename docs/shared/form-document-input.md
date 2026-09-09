# Form Document Input

<!-- notes -->
CPF or CNPJ, masked as it is typed and checked by `documentSchema`.

The field keeps the formatted string so the mask survives a re-render; the
schema strips it before the value leaves the form.
<!-- /notes -->

**Source** `src/components/shared/form-document-input.tsx` · **Client component**

## Import

```tsx
import { FormDocumentInput } from "@/components/shared/form-document-input";
```

## Exports

### `FormDocumentInput` — component

CPF or CNPJ, masked as it is typed and checked by `documentSchema`.

The field keeps the formatted string so the mask survives a re-render; the
schema strips it before the value leaves the form.

```ts
FormDocumentInput<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> &
  Omit<
    React.ComponentProps<typeof DocumentInput>,
    "value" | "onValueChange" | "name"
  >)
```

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/shared/document-input`, `@/components/shared/form-field`

## Used by

[examples/checkout-form](../examples/checkout-form.md)
