import {
  differenceInCalendarDays,
  format,
  formatDistanceToNowStrict,
  formatDuration,
  intervalToDuration,
  isValid,
  parse,
  parseISO,
} from "date-fns";
import type { DateRange } from "react-day-picker";

/**
 * One place for every date string the interface shows, so a format is chosen
 * once rather than at each call site.
 */
export const DATE_FORMATS = {
  /** Jun 01, 2025 */
  short: "MMM dd, yyyy",
  /** June 1st, 2025 */
  long: "PPP",
  /** 06/01/2025 */
  numeric: "MM/dd/yyyy",
  /** 06/01/2025, 14:30 */
  dateTime: "MM/dd/yyyy, HH:mm",
  /** 14:30 */
  time: "HH:mm",
  /** 2025-06-01, for inputs and query strings */
  iso: "yyyy-MM-dd",
} as const;

export type DateFormat = keyof typeof DATE_FORMATS;

export function formatDate(
  value: Date | string | number | undefined | null,
  style: DateFormat = "short",
) {
  const date = toDate(value);
  if (!date) return "";
  return format(date, DATE_FORMATS[style]);
}

/** Accepts what an API or an input hands over, and refuses invalid dates. */
export function toDate(value: Date | string | number | undefined | null) {
  if (value === undefined || value === null || value === "") return undefined;
  const date =
    value instanceof Date
      ? value
      : typeof value === "number"
        ? new Date(value)
        : parseISO(value);
  return isValid(date) ? date : undefined;
}

/** Parses a typed string against one of our formats. */
export function parseDateInput(value: string, style: DateFormat = "numeric") {
  const date = parse(value, DATE_FORMATS[style], new Date());
  return isValid(date) ? date : undefined;
}

/** "3 days ago", "in 2 months" — for timestamps in lists and feeds. */
export function formatRelative(value: Date | string | number) {
  const date = toDate(value);
  if (!date) return "";
  return formatDistanceToNowStrict(date, { addSuffix: true });
}

export function formatDateRange(
  range: DateRange | undefined,
  style: DateFormat = "short",
) {
  if (!range?.from) return "";
  if (!range.to) return formatDate(range.from, style);
  return `${formatDate(range.from, style)} – ${formatDate(range.to, style)}`;
}

/** "2 days", "4 hours 30 minutes" — for elapsed time and estimates. */
export function formatElapsed(start: Date | number, end: Date | number) {
  return formatDuration(intervalToDuration({ start, end }), {
    format: ["days", "hours", "minutes"],
  });
}

export function daysUntil(value: Date | string | number) {
  const date = toDate(value);
  if (!date) return 0;
  return differenceInCalendarDays(date, new Date());
}
