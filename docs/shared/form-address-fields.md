# Form Address Fields

<!-- notes -->
Country, state and city as one dependent chain.

Picking a country clears the state and the city, because a state code only
means something inside its country — leaving the old value would submit an
address that does not exist.
<!-- /notes -->

**Source** `src/components/shared/form-address-fields.tsx` · **Client component**

## Import

```tsx
import { FormAddressFields } from "@/components/shared/form-address-fields";
```

## Exports

### `FormAddressFields` — component

Country, state and city as one dependent chain.

Picking a country clears the state and the city, because a state code only
means something inside its country — leaving the old value would submit an
address that does not exist.

```ts
FormAddressFields<TFieldValues extends FieldValues>(props: {
  control: Control<TFieldValues>;
  setValue: (
    name: FieldPath<TFieldValues>,
    value: PathValue<TFieldValues, FieldPath<TFieldValues>>,
  ) => void;
  countryName: FieldPath<TFieldValues>;
  stateName: FieldPath<TFieldValues>;
  cityName: FieldPath<TFieldValues>;
  labels?: { country?: string; state?: string; city?: string };
})
```

## Depends on

- Packages: `react`, `react-hook-form`
- In this project: `@/actions/address`, `@/components/shared/country-flag`, `@/components/shared/form-combobox`, `@/lib/address`

## Used by

[examples/checkout-form](../examples/checkout-form.md)
