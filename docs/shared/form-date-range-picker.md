# Form Date Range Picker

<!-- notes -->
A start and an end date, held as one `DateRange` value.
<!-- /notes -->

**Source** `src/components/shared/form-date-range-picker.tsx` · **Client component**

## Import

```tsx
import {
  FormDateRangePicker,
} from "@/components/shared/form-date-range-picker";
```

## Exports

### `FormDateRangePicker` — component

A start and an end date, held as one `DateRange` value.

```ts
FormDateRangePicker<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> &
  Omit<
    React.ComponentProps<typeof DateRangePicker>,
    "value" | "onValueChange" | "queryKey" | "name"
  >)
```

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/ui/date-picker`
