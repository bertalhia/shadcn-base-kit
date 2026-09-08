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

/*
 * Value source
 *
 * `useQueryState` calls `useSearchParams()`, which forces every page rendering
 * it into a Suspense boundary. A picker with no `queryKey` must not pay that,
 * so the nuqs hook lives in its own component and only mounts when there is a
 * key — rather than being called unconditionally and branched on afterwards.
 */

type ValueSourceProps<T> = {
  queryKey?: string;
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T | undefined) => void;
  render: (
    value: T | undefined,
    setValue: (next: T | undefined) => void,
  ) => React.ReactNode;
};

function LocalDate({
  value,
  defaultValue,
  onValueChange,
  render,
}: Omit<ValueSourceProps<Date>, "queryKey">) {
  const [date, setDate] = useControllableState<Date | undefined>(
    value,
    defaultValue,
    onValueChange,
  );
  return render(date, setDate);
}

function QueryDate({
  queryKey,
  value,
  defaultValue,
  onValueChange,
  render,
}: ValueSourceProps<Date> & { queryKey: string }) {
  const [query, setQuery] = useQueryState(queryKey, parseAsIsoDate);
  const setDate = React.useCallback(
    (next: Date | undefined) => {
      setQuery(next ?? null);
      onValueChange?.(next);
    },
    [setQuery, onValueChange],
  );
  return render(value ?? query ?? defaultValue, setDate);
}

function DateValue({ queryKey, ...props }: ValueSourceProps<Date>) {
  return queryKey ? (
    <QueryDate queryKey={queryKey} {...props} />
  ) : (
    <LocalDate {...props} />
  );
}

function LocalDateRange({
  value,
  defaultValue,
  onValueChange,
  render,
}: Omit<ValueSourceProps<DateRange>, "queryKey">) {
  const [range, setRange] = useControllableState<DateRange | undefined>(
    value,
    defaultValue,
    onValueChange,
  );
  return render(range, setRange);
}

function QueryDateRange({
  queryKey,
  value,
  defaultValue,
  onValueChange,
  render,
}: ValueSourceProps<DateRange> & { queryKey: string }) {
  const [query, setQuery] = useQueryStates(
    { from: parseAsIsoDate, to: parseAsIsoDate },
    { urlKeys: { from: `${queryKey}_from`, to: `${queryKey}_to` } },
  );
  const setRange = React.useCallback(
    (next: DateRange | undefined) => {
      setQuery({ from: next?.from ?? null, to: next?.to ?? null });
      onValueChange?.(next);
    },
    [setQuery, onValueChange],
  );
  const range: DateRange | undefined = query.from
    ? { from: query.from, to: query.to ?? undefined }
    : defaultValue;
  return render(value ?? range, setRange);
}

function DateRangeValue({ queryKey, ...props }: ValueSourceProps<DateRange>) {
  return queryKey ? (
    <QueryDateRange queryKey={queryKey} {...props} />
  ) : (
    <LocalDateRange {...props} />
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

/* Single date */

type DatePickerBaseProps = Omit<
  React.ComponentProps<typeof Button>,
  "value" | "defaultValue"
> & {
  date: Date | undefined;
  setDate: (next: Date | undefined) => void;
  placeholder?: React.ReactNode;
  dateFormat?: string;
  captionLayout?: CalendarProps["captionLayout"];
  numberOfMonths?: number;
  align?: PopoverContentProps["align"];
  calendarProps?: Omit<
    CalendarProps,
    "mode" | "selected" | "onSelect" | "captionLayout" | "numberOfMonths"
  >;
};

function DatePickerBase({
  date,
  setDate,
  placeholder,
  dateFormat = "PPP",
  captionLayout,
  numberOfMonths,
  align = "start",
  className,
  disabled,
  id,
  calendarProps,
  ...props
}: DatePickerBaseProps) {
  const [open, setOpen] = React.useState(false);

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
 * Single date, in a button that opens a calendar.
 *
 * Pass `queryKey` to keep the value in the URL. Leave it off inside a React
 * Hook Form field, where the form owns the value.
 */
function DatePicker({
  value,
  defaultValue,
  onValueChange,
  queryKey,
  placeholder = "Pick a date",
  ...props
}: Omit<DatePickerBaseProps, "date" | "setDate"> & {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  /** Persists the value in the URL under this key. */
  queryKey?: string;
}) {
  return (
    <DateValue
      queryKey={queryKey}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      render={(date, setDate) => (
        <DatePickerBase
          date={date}
          setDate={setDate}
          placeholder={placeholder}
          {...props}
        />
      )}
    />
  );
}

/* Date range */

type DateRangePickerBaseProps = Omit<
  React.ComponentProps<typeof Button>,
  "value" | "defaultValue"
> & {
  range: DateRange | undefined;
  setRange: (next: DateRange | undefined) => void;
  placeholder?: React.ReactNode;
  dateFormat?: string;
  numberOfMonths?: number;
  captionLayout?: CalendarProps["captionLayout"];
  align?: PopoverContentProps["align"];
  calendarProps?: Omit<
    CalendarProps,
    "mode" | "selected" | "onSelect" | "captionLayout" | "numberOfMonths"
  >;
};

function DateRangePickerBase({
  range,
  setRange,
  placeholder,
  dateFormat = "LLL dd, y",
  numberOfMonths = 2,
  captionLayout,
  align = "start",
  className,
  disabled,
  id,
  calendarProps,
  ...props
}: DateRangePickerBaseProps) {
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

/** Start and end date, in a single button. */
function DateRangePicker({
  value,
  defaultValue,
  onValueChange,
  queryKey,
  placeholder = "Pick a date",
  ...props
}: Omit<DateRangePickerBaseProps, "range" | "setRange"> & {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  /** Persists the range in the URL under `<queryKey>_from` and `<queryKey>_to`. */
  queryKey?: string;
}) {
  return (
    <DateRangeValue
      queryKey={queryKey}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      render={(range, setRange) => (
        <DateRangePickerBase
          range={range}
          setRange={setRange}
          placeholder={placeholder}
          {...props}
        />
      )}
    />
  );
}

/* Typed date */

type DatePickerInputBaseProps = Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "value" | "defaultValue" | "onChange"
> & {
  date: Date | undefined;
  setDate: (next: Date | undefined) => void;
  locale?: string;
  triggerLabel?: string;
  groupClassName?: string;
  calendarProps?: Omit<
    CalendarProps,
    "mode" | "selected" | "month" | "onMonthChange" | "onSelect"
  >;
};

function DatePickerInputBase({
  date,
  setDate,
  placeholder,
  locale = "en-US",
  triggerLabel = "Select date",
  groupClassName,
  disabled,
  id,
  calendarProps,
  ...props
}: DatePickerInputBaseProps) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [text, setText] = React.useState(() => formatLongDate(date, locale));

  return (
    <InputGroup className={groupClassName}>
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

/** Typed date, with a calendar in the input addon. Arrow Down opens it. */
function DatePickerInput({
  value,
  defaultValue,
  onValueChange,
  queryKey,
  placeholder = "June 01, 2025",
  ...props
}: Omit<DatePickerInputBaseProps, "date" | "setDate"> & {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  /** Persists the value in the URL under this key. */
  queryKey?: string;
}) {
  return (
    <DateValue
      queryKey={queryKey}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      render={(date, setDate) => (
        <DatePickerInputBase
          date={date}
          setDate={setDate}
          placeholder={placeholder}
          {...props}
        />
      )}
    />
  );
}

/* Natural language */

type DatePickerNaturalLanguageBaseProps = Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "value" | "defaultValue" | "onChange"
> & {
  date: Date | undefined;
  setDate: (next: Date | undefined) => void;
  defaultText?: string;
  locale?: string;
  triggerLabel?: string;
  groupClassName?: string;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect">;
};

function DatePickerNaturalLanguageBase({
  date,
  setDate,
  defaultText = "In 2 days",
  placeholder,
  locale = "en-US",
  triggerLabel = "Select date",
  groupClassName,
  disabled,
  id,
  calendarProps,
  ...props
}: DatePickerNaturalLanguageBaseProps) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState(defaultText);

  return (
    <InputGroup className={groupClassName}>
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

/** Free text like "tomorrow" or "in 2 days", parsed with chrono-node. */
function DatePickerNaturalLanguage({
  value,
  defaultValue,
  onValueChange,
  queryKey,
  defaultText = "In 2 days",
  placeholder = "Tomorrow or next week",
  ...props
}: Omit<DatePickerNaturalLanguageBaseProps, "date" | "setDate"> & {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  /** Persists the value in the URL under this key. */
  queryKey?: string;
}) {
  return (
    <DateValue
      queryKey={queryKey}
      value={value}
      defaultValue={defaultValue ?? parseDate(defaultText) ?? undefined}
      onValueChange={onValueChange}
      render={(date, setDate) => (
        <DatePickerNaturalLanguageBase
          date={date}
          setDate={setDate}
          defaultText={defaultText}
          placeholder={placeholder}
          {...props}
        />
      )}
    />
  );
}

/** Native time input, sized to sit next to a `<DatePicker />`. */
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
  DatePickerInput,
  DatePickerNaturalLanguage,
  DateRangePicker,
  formatLongDate,
  isValidDate,
  TimePicker,
};
