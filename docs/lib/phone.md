# Phone

<!-- notes -->
Phone numbers, through libphonenumber-js. Formatting as you type, the E.164 string to store, the national string to show, validation and a per-country placeholder. Screens import this, never the library.
<!-- /notes -->

**Source** `src/lib/phone.ts`

## Import

```tsx
import {
  DEFAULT_COUNTRY,
  formatPhone,
  stripPhone,
  toE164,
  formatPhoneNational,
  isValidPhone,
  phonePlaceholder,
  phoneMaxLength,
} from "@/lib/phone";
```

## Exports

### `DEFAULT_COUNTRY` — const

```ts
const DEFAULT_COUNTRY: CountryCode
```

### `formatPhone` — function

Formats while typing. `AsYouType` keeps partial input readable and adds
separators only once the digits justify them, so no pattern to maintain per
country.

```ts
formatPhone(value: string, country)
```

### `stripPhone` — function

Digits only, plus a leading `+` when the caller typed an international number.

```ts
stripPhone(value: string)
```

### `toE164` — function

E.164 (`+5511987654321`), the shape to store and to send to an API.

```ts
toE164(value: string, country)
```

### `formatPhoneNational` — function

National formatting (`(11) 98765-4321`), the shape to show back.

```ts
formatPhoneNational(value: string, country)
```

### `isValidPhone` — function

```ts
isValidPhone(value: string, country)
```

### `phonePlaceholder` — function

A real number for the country, to use as a placeholder.

```ts
phonePlaceholder(country)
```

### `phoneMaxLength` — function

Widest a formatted number gets, so the input can cap its length.

```ts
phoneMaxLength(country)
```

## Depends on

- Packages: `libphonenumber-js`, `libphonenumber-js/examples.mobile.json`

## Used by

[schemas/fields](../schemas/fields.md), [shared/phone-input](../shared/phone-input.md)
