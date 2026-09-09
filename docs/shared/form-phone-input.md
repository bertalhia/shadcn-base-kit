# Form Phone Input

<!-- notes -->
Phone number, formatted for the country as it is typed.

The field stores what the person sees; `phoneSchema` converts it to E.164 on
submit, so the form value and the API payload never drift apart.
<!-- /notes -->

**Source** `src/components/shared/form-phone-input.tsx` · **Client component**

## Import

```tsx
import { FormPhoneInput } from "@/components/shared/form-phone-input";
```

## Exports

### `FormPhoneInput` — component

Phone number, formatted for the country as it is typed.

The field stores what the person sees; `phoneSchema` converts it to E.164 on
submit, so the form value and the API payload never drift apart.

```ts
FormPhoneInput<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> &
  Omit<
    React.ComponentProps<typeof PhoneInput>,
    "value" | "onValueChange" | "name"
  >)
```

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/shared/phone-input`

## Used by

[examples/checkout-form](../examples/checkout-form.md)
