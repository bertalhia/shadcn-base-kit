# Form Date Picker

<!-- notes -->
A single date.

No `queryKey` here on purpose: inside a form React Hook Form owns the value,
and a draft has no business in the URL.
<!-- /notes -->

**Source** `src/components/shared/form-date-picker.tsx` · **Client component**

## Import

```tsx
import { FormDatePicker } from "@/components/shared/form-date-picker";
```

## Exports

### `FormDatePicker` — component

A single date.

No `queryKey` here on purpose: inside a form React Hook Form owns the value,
and a draft has no business in the URL.

```ts
FormDatePicker<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> &
  Omit<
    React.ComponentProps<typeof DatePicker>,
    "value" | "onValueChange" | "queryKey" | "name"
  >)
```

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/ui/date-picker`
