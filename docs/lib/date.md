# Date

<!-- notes -->
One place for every date string the interface shows, so a format is chosen
once rather than at each call site.
<!-- /notes -->

**Source** `src/lib/date.ts`

## Import

```tsx
import {
  DATE_FORMATS,
  formatDate,
  toDate,
  parseDateInput,
  formatRelative,
  formatDateRange,
  formatElapsed,
  daysUntil,
} from "@/lib/date";
import type { DateFormat } from "@/lib/date";
```

## Exports

### `DATE_FORMATS` — const

One place for every date string the interface shows, so a format is chosen
once rather than at each call site.

```ts
const DATE_FORMATS
```

### `DateFormat` — type

```ts
type DateFormat = keyof typeof DATE_FORMATS
```

### `formatDate` — function

```ts
formatDate(value: Date | string | number | undefined | null, style: DateFormat)
```

### `toDate` — function

Accepts what an API or an input hands over, and refuses invalid dates.

```ts
toDate(value: Date | string | number | undefined | null)
```

### `parseDateInput` — function

Parses a typed string against one of our formats.

```ts
parseDateInput(value: string, style: DateFormat)
```

### `formatRelative` — function

"3 days ago", "in 2 months" — for timestamps in lists and feeds.

```ts
formatRelative(value: Date | string | number)
```

### `formatDateRange` — function

```ts
formatDateRange(range: DateRange | undefined, style: DateFormat)
```

### `formatElapsed` — function

"2 days", "4 hours 30 minutes" — for elapsed time and estimates.

```ts
formatElapsed(start: Date | number, end: Date | number)
```

### `daysUntil` — function

```ts
daysUntil(value: Date | string | number)
```

## Depends on

- Packages: `date-fns`, `react-day-picker`

## Used by

[examples/booking-panel](../examples/booking-panel.md), [examples/orders-table](../examples/orders-table.md), [examples/release-notes](../examples/release-notes.md)
