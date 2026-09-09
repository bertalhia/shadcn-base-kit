# Date Picker

<!-- notes -->
The calendar in a popover, plus a range picker, a time picker and a natural-language input that parses "next friday" through chrono. It shows how to read the URL only when asked: `DateValue` splits into `QueryDate` and `LocalDate` so a caller without a `queryKey` never mounts the nuqs hook, and never drags a Suspense boundary along with it.
<!-- /notes -->

**Source** `src/components/ui/date-picker.tsx` · **Upstream** [date-picker.md](https://ui.shadcn.com/docs/components/base/date-picker.md) · **Client component**

## Import

```tsx
import {
  DatePicker,
  DatePickerInput,
  DatePickerNaturalLanguage,
  DateRangePicker,
  formatLongDate,
  isValidDate,
  TimePicker,
} from "@/components/ui/date-picker";
```

## Exports

### `DatePicker` — component

Single date, in a button that opens a calendar.

Pass `queryKey` to keep the value in the URL. Leave it off inside a React
Hook Form field, where the form owns the value.

```ts
DatePicker(props: Omit<DatePickerBaseProps, "date" | "setDate"> & {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  /** Persists the value in the URL under this key. */
  queryKey?: string;
})
```

### `DatePickerInput` — component

Typed date, with a calendar in the input addon. Arrow Down opens it.

```ts
DatePickerInput(props: Omit<DatePickerInputBaseProps, "date" | "setDate"> & {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  /** Persists the value in the URL under this key. */
  queryKey?: string;
})
```

### `DatePickerNaturalLanguage` — component

Free text like "tomorrow" or "in 2 days", parsed with chrono-node.

```ts
DatePickerNaturalLanguage(props: Omit<DatePickerNaturalLanguageBaseProps, "date" | "setDate"> & {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  /** Persists the value in the URL under this key. */
  queryKey?: string;
})
```

### `DateRangePicker` — component

Start and end date, in a single button.

```ts
DateRangePicker(props: Omit<DateRangePickerBaseProps, "range" | "setRange"> & {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  /** Persists the range in the URL under `<queryKey>_from` and `<queryKey>_to`. */
  queryKey?: string;
})
```

### `formatLongDate` — function

```ts
formatLongDate(date: Date | undefined, locale)
```

### `isValidDate` — function

```ts
isValidDate(date: Date | undefined)
```

### `TimePicker` — component

Native time input, sized to sit next to a `<DatePicker />`.

```ts
TimePicker(props: React.ComponentProps<"input">)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="date-picker-trigger"]`, `[data-slot="date-range-picker-trigger"]`, `[data-slot="time-picker"]`.

## Depends on

- Packages: `chrono-node`, `cn`, `date-fns`, `lucide-react`, `nuqs`, `react`, `react-day-picker`
- In this project: `@/components/ui/button`, `@/components/ui/calendar`, `@/components/ui/input`, `@/components/ui/input-group`, `@/components/ui/popover`

## Used by

[examples/bug-report-form](../examples/bug-report-form.md), [examples/orders-table](../examples/orders-table.md), [shared/form-date-picker](../shared/form-date-picker.md), [shared/form-date-range-picker](../shared/form-date-range-picker.md)
