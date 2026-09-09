# Number

<!-- notes -->
Money, percentages and counts. `Intl` handles the locale rules; these
wrappers only fix the choices so every screen agrees.
<!-- /notes -->

**Source** `src/utils/number.ts`

## Import

```tsx
import {
  DEFAULT_LOCALE,
  DEFAULT_CURRENCY,
  formatCurrency,
  formatCents,
  formatNumber,
  formatPercent,
  formatCompact,
  formatBytes,
  currencyInputToCents,
} from "@/utils/number";
```

## Exports

### `DEFAULT_LOCALE` — const

Money, percentages and counts. `Intl` handles the locale rules; these
wrappers only fix the choices so every screen agrees.

```ts
const DEFAULT_LOCALE
```

### `DEFAULT_CURRENCY` — const

```ts
const DEFAULT_CURRENCY
```

### `formatCurrency` — function

```ts
formatCurrency(value: number, props)
```

### `formatCents` — function

Cents in, currency out — the shape money should travel in.

```ts
formatCents(cents: number, options: { locale?: string; currency?: string })
```

### `formatNumber` — function

```ts
formatNumber(value: number, locale)
```

### `formatPercent` — function

0.125 renders as "12.5%".

```ts
formatPercent(value: number, props)
```

### `formatCompact` — function

1.2K, 3.4M — for counters that must not push a layout around.

```ts
formatCompact(value: number, locale)
```

### `formatBytes` — function

```ts
formatBytes(bytes: number, locale)
```

### `currencyInputToCents` — function

Turns typed characters into cents, so a currency input never has to parse a
half-written number: every keystroke shifts the value one decimal place.

```ts
currencyInputToCents(value: string)
```

## Used by

[examples/checkout-form](../examples/checkout-form.md), [examples/orders-table](../examples/orders-table.md), [examples/product-gallery](../examples/product-gallery.md), [examples/revenue-dashboard](../examples/revenue-dashboard.md), [examples/support-chat](../examples/support-chat.md), [shared/currency-input](../shared/currency-input.md), [shared/form-file-input](../shared/form-file-input.md), [shared/stat-card](../shared/stat-card.md)
