# Calendar

<!-- notes -->
The month grid, built on `react-day-picker`. On a screen, use `date-picker` instead — this is the surface it opens.
<!-- /notes -->

**Source** `src/components/ui/calendar.tsx` · **Upstream** [calendar.md](https://ui.shadcn.com/docs/components/base/calendar.md) · **Client component**

## Import

```tsx
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
```

## Exports

### `Calendar` — component

```ts
Calendar(props: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
})
```

### `CalendarDayButton` — component

```ts
CalendarDayButton(props: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> })
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="calendar"]`.

## Depends on

- Packages: `cn`, `lucide-react`, `react`, `react-day-picker`
- In this project: `@/components/ui/button`

## Used by

[examples/booking-panel](../examples/booking-panel.md), [ui/date-picker](../ui/date-picker.md)
