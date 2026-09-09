# Form Currency Input

<!-- notes -->
An amount, held in cents for the whole round trip.
<!-- /notes -->

**Source** `src/components/shared/form-currency-input.tsx` · **Client component**

## Import

```tsx
import { FormCurrencyInput } from "@/components/shared/form-currency-input";
```

## Exports

### `FormCurrencyInput` — component

An amount, held in cents for the whole round trip.

```ts
FormCurrencyInput<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> &
  Omit<
    React.ComponentProps<typeof CurrencyInput>,
    "value" | "onValueChange" | "name"
  >)
```

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/shared/currency-input`, `@/components/shared/form-field`
