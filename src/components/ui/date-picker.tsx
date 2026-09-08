"use client";

import { parseDate } from "chrono-node";
import { cn } from "cn";
import { format } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { parseAsIsoDate, useQueryState, useQueryStates } from "nuqs";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type CalendarProps = React.ComponentProps<typeof Calendar>;
type PopoverContentProps = React.ComponentProps<typeof PopoverContent>;

function useControllableState<T>(
  value: T | undefined,
  defaultValue: T | undefined,
  onValueChange: ((value: T) => void) | undefined,
) {
  const [uncontrolled, setUncontrolled] = React.useState<T | undefined>(
    defaultValue,
  );
  const isControlled = value !== undefined;
  const state = isControlled ? value : uncontrolled;

  const setState = React.useCallback(
    (next: T) => {
      if (!isControlled) {
        setUncontrolled(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  return [state, setState] as const;
}

/**
 * Same shape as `useControllableState`, with the value kept in the URL when a
 * `queryKey` is given. Without one, the date lives in React state only — which
 * is what you want inside a React Hook Form field, where the form owns it.
 */
function useDateState(
  queryKey: string | undefined,
  value: Date | undefined,
  defaultValue: Date | undefined,
  onValueChange: ((date: Date | undefined) => void) | undefined,
) {
  const [local, setLocal] = useControllableState<Date | undefined>(
    value,
    defaultValue,
    onValueChange,
  );
  const [query, setQuery] = useQueryState(queryKey ?? "date", parseAsIsoDate);

  const setDate = React.useCallback(
    (next: Date | undefined) => {
      setQuery(next ?? null);
      onValueChange?.(next);
    },
    [setQuery, onValueChange],
  );

  if (!queryKey) {
    return [local, setLocal] as const;
  }

  return [value ?? query ?? defaultValue, setDate] as const;
}

/** Range equivalent of `useDateState`, batched into a single URL update. */
function useDateRangeState(
  queryKey: string | undefined,
  value: DateRange | undefined,
  defaultValue: DateRange | undefined,
  onValueChange: ((range: DateRange | undefined) => void) | undefined,
) {
  const [local, setLocal] = useControllableState<DateRange | undefined>(
    value,
    defaultValue,
    onValueChange,
  );
  const [query, setQuery] = useQueryStates(
    {
      from: parseAsIsoDate,
      to: parseAsIsoDate,
    },
    {
      urlKeys: queryKey
        ? { from: `${queryKey}_from`, to: `${queryKey}_to` }
        : undefined,
    },
  );

  const setRange = React.useCallback(
    (next: DateRange | undefined) => {
      setQuery({ from: next?.from ?? null, to: next?.to ?? null });
      onValueChange?.(next);
    },
    [setQuery, onValueChange],
  );

  if (!queryKey) {
    return [local, setLocal] as const;
  }

  const range: DateRange | undefined = query.from
    ? { from: query.from, to: query.to ?? undefined }
    : defaultValue;

  return [value ?? range, setRange] as const;
}

/**
 * Single date, in a button that opens a calendar.
 */
function DatePicker({
  value,
  defaultValue,
  onValueChange,
  queryKey,
  placeholder = "Pick a date",
  dateFormat = "PPP",
  captionLayout,
  numberOfMonths,
  align = "start",
  className,
  disabled,
  id,
  calendarProps,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "value" | "defaultValue"> & {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  /** Persists the value in the URL under this key. */
  queryKey?: string;
  placeholder?: React.ReactNode;
  dateFormat?: string;
  captionLayout?: CalendarProps["captionLayout"];
  numberOfMonths?: number;
  align?: PopoverContentProps["align"];
  calendarProps?: Omit<
    CalendarProps,
    "mode" | "selected" | "onSelect" | "captionLayout" | "numberOfMonths"
  >;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = useDateState(
    queryKey,
    value,
    defaultValue,
    onValueChange,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            id={id}
            disabled={disabled}
            data-slot="date-picker-trigger"
            data-empty={!date}
            className={cn(
              "justify-between text-left font-normal data-[empty=true]:text-muted-foreground",
              className,
            )}
            {...props}
          />
        }
      >
        {date ? format(date, dateFormat) : <span>{placeholder}</span>}
        <ChevronDownIcon data-icon="inline-end" />
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align={align}>
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={date}
          captionLayout={captionLayout}
          numberOfMonths={numberOfMonths}
          onSelect={(next) => {
            setDate(next);
            setOpen(false);
          }}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  );
}

/**
 * Start and end date, in a single button.
 */
function DateRangePicker({
  value,
  defaultValue,
  onValueChange,
  queryKey,
  placeholder = "Pick a date",
  dateFormat = "LLL dd, y",
  numberOfMonths = 2,
  captionLayout,
  align = "start",
  className,
  disabled,
  id,
  calendarProps,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "value" | "defaultValue"> & {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  /** Persists the range in the URL under `<queryKey>_from` and `<queryKey>_to`. */
  queryKey?: string;
  placeholder?: React.ReactNode;
  dateFormat?: string;
  numberOfMonths?: number;
  captionLayout?: CalendarProps["captionLayout"];
  align?: PopoverContentProps["align"];
  calendarProps?: Omit<
    CalendarProps,
    "mode" | "selected" | "onSelect" | "captionLayout" | "numberOfMonths"
  >;
}) {
  const [range, setRange] = useDateRangeState(
    queryKey,
    value,
    defaultValue,
    onValueChange,
  );

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            id={id}
            disabled={disabled}
            data-slot="date-range-picker-trigger"
            data-empty={!range?.from}
            className={cn(
              "justify-start px-2.5 text-left font-normal data-[empty=true]:text-muted-foreground",
              className,
            )}
            {...props}
          />
        }
      >
        <CalendarIcon data-icon="inline-start" />
        {range?.from ? (
          range.to ? (
            <>
              {format(range.from, dateFormat)} - {format(range.to, dateFormat)}
            </>
          ) : (
            format(range.from, dateFormat)
          )
        ) : (
          <span>{placeholder}</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align={align}>
        <Calendar
          mode="range"
          selected={range}
          defaultMonth={range?.from}
          captionLayout={captionLayout}
          numberOfMonths={numberOfMonths}
          onSelect={setRange}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  );
}

function formatLongDate(date: Date | undefined, locale = "en-US") {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !Number.isNaN(date.getTime());
}

/**
 * Typed date, with a calendar in the input addon. Arrow Down opens the calendar.
 */
function DatePickerInput({
  value,
  defaultValue,
  onValueChange,
  queryKey,
  placeholder = "June 01, 2025",
  locale = "en-US",
  triggerLabel = "Select date",
  className,
  disabled,
  id,
  calendarProps,
  ...props
}: Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "value" | "defaultValue" | "onChange"
> & {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  /** Persists the value in the URL under this key. */
  queryKey?: string;
  locale?: string;
  triggerLabel?: string;
  calendarProps?: Omit<
    CalendarProps,
    "mode" | "selected" | "month" | "onMonthChange" | "onSelect"
  >;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = useDateState(
    queryKey,
    value,
    defaultValue,
    onValueChange,
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [text, setText] = React.useState(() => formatLongDate(date, locale));

  React.useEffect(() => {
    if (value !== undefined) {
      setText(formatLongDate(value, locale));
      setMonth(value);
    }
  }, [value, locale]);

  return (
    <InputGroup className={className}>
      <InputGroupInput
        id={id}
        value={text}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => {
          const parsed = new Date(event.target.value);
          setText(event.target.value);
          if (isValidDate(parsed)) {
            setDate(parsed);
            setMonth(parsed);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                disabled={disabled}
                aria-label={triggerLabel}
              />
            }
          >
            <CalendarIcon />
            <span className="sr-only">{triggerLabel}</span>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              month={month}
              onMonthChange={setMonth}
              onSelect={(next) => {
                setDate(next);
                setText(formatLongDate(next, locale));
                setOpen(false);
              }}
              {...calendarProps}
            />
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  );
}

/**
 * Free text like "tomorrow" or "in 2 days", parsed with chrono-node.
 */
function DatePickerNaturalLanguage({
  value,
  defaultValue,
  onValueChange,
  queryKey,
  defaultText = "In 2 days",
  placeholder = "Tomorrow or next week",
  locale = "en-US",
  triggerLabel = "Select date",
  className,
  disabled,
  id,
  calendarProps,
  ...props
}: Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "value" | "defaultValue" | "onChange"
> & {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  /** Persists the value in the URL under this key. */
  queryKey?: string;
  defaultText?: string;
  locale?: string;
  triggerLabel?: string;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect">;
}) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState(defaultText);
  const [date, setDate] = useDateState(
    queryKey,
    value,
    defaultValue ?? parseDate(defaultText) ?? undefined,
    onValueChange,
  );

  return (
    <InputGroup className={className}>
      <InputGroupInput
        id={id}
        value={text}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => {
          setText(event.target.value);
          const parsed = parseDate(event.target.value);
          if (parsed) {
            setDate(parsed);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                disabled={disabled}
                aria-label={triggerLabel}
              />
            }
          >
            <CalendarIcon />
            <span className="sr-only">{triggerLabel}</span>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            sideOffset={8}
          >
            <Calendar
              mode="single"
              selected={date}
              defaultMonth={date}
              captionLayout="dropdown"
              onSelect={(next) => {
                setDate(next);
                setText(formatLongDate(next, locale));
                setOpen(false);
              }}
              {...calendarProps}
            />
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  );
}

/**
 * Native time input, sized to sit next to a `<DatePicker />`.
 */
function TimePicker({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <Input
      type="time"
      step="1"
      data-slot="time-picker"
      className={cn(
        "appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
        className,
      )}
      {...props}
    />
  );
}

export {
  DatePicker,
  DateRangePicker,
  DatePickerInput,
  DatePickerNaturalLanguage,
  TimePicker,
  formatLongDate,
  isValidDate,
};
