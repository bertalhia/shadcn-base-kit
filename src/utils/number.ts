/**
 * Money, percentages and counts. `Intl` handles the locale rules; these
 * wrappers only fix the choices so every screen agrees.
 */

export const DEFAULT_LOCALE = "en-US";
export const DEFAULT_CURRENCY = "USD";

export function formatCurrency(
  value: number,
  { locale = DEFAULT_LOCALE, currency = DEFAULT_CURRENCY } = {},
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

/** Cents in, currency out — the shape money should travel in. */
export function formatCents(
  cents: number,
  options?: { locale?: string; currency?: string },
) {
  return formatCurrency(cents / 100, options);
}

export function formatNumber(value: number, locale = DEFAULT_LOCALE) {
  return new Intl.NumberFormat(locale).format(value);
}

/** 0.125 renders as "12.5%". */
export function formatPercent(
  value: number,
  { locale = DEFAULT_LOCALE, maximumFractionDigits = 1 } = {},
) {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits,
  }).format(value);
}

/** 1.2K, 3.4M — for counters that must not push a layout around. */
export function formatCompact(value: number, locale = DEFAULT_LOCALE) {
  return new Intl.NumberFormat(locale, { notation: "compact" }).format(value);
}

export function formatBytes(bytes: number, locale = DEFAULT_LOCALE) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit += 1;
  }
  const digits = unit === 0 ? 0 : size < 10 ? 1 : 0;
  return `${new Intl.NumberFormat(locale, {
    maximumFractionDigits: digits,
  }).format(size)} ${units[unit]}`;
}

/**
 * Turns typed characters into cents, so a currency input never has to parse a
 * half-written number: every keystroke shifts the value one decimal place.
 */
export function currencyInputToCents(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits ? Number.parseInt(digits, 10) : 0;
}
