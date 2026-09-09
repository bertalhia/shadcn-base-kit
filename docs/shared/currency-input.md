# Currency Input

<!-- notes -->
Money input that works in cents.

Every keystroke shifts the value one decimal place — type `1`, `2`, `5` and
you get 1.25 — so there is never a half-written number to parse, and no way
to land on a float that cannot represent the amount.
<!-- /notes -->

**Source** `src/components/shared/currency-input.tsx` · **Client component**

## Import

```tsx
import { CurrencyInput } from "@/components/shared/currency-input";
```

## Exports

### `CurrencyInput` — component

Money input that works in cents.

Every keystroke shifts the value one decimal place — type `1`, `2`, `5` and
you get 1.25 — so there is never a half-written number to parse, and no way
to land on a float that cannot represent the amount.

```ts
CurrencyInput(props: Omit<React.ComponentProps<typeof InputGroupInput>, "value" | "onChange"> & {
  /** Amount in cents. */
  value: number;
  onValueChange: (cents: number) => void;
  locale?: string;
  currency?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
})
```

## Depends on

- Packages: `react`
- In this project: `@/components/ui/input-group`, `@/utils/number`

## Used by

[shared/form-currency-input](../shared/form-currency-input.md)
