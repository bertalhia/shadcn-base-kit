# Booking Panel

<!-- notes -->
A calendar beside the slots for the day it selects, paged. The pattern for a two-column layout that has to become one column on a phone.
<!-- /notes -->

**Source** `src/components/examples/booking-panel.tsx` · **Client component**

## Import

```tsx
import { BookingPanel } from "@/components/examples/booking-panel";
```

## Exports

### `BookingPanel` — component

A booking panel.

The calendar is inline rather than in a popover — when picking the date is
the whole task, hiding it behind a button adds a click for nothing. `booked`
marks the days that are full, which is the difference between a date picker
and an availability calendar.

Pagination here is the link-based component, not the data table's: these are
separate pages of results, each with its own URL.

```ts
BookingPanel()
```

## Depends on

- Packages: `nuqs`
- In this project: `@/components/shared/section`, `@/components/ui/badge`, `@/components/ui/button`, `@/components/ui/calendar`, `@/components/ui/pagination`, `@/components/ui/table`, `@/lib/date`, `@/lib/notify`
