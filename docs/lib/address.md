# Address

<!-- notes -->
Countries, states and cities from the official Country State City database.

The package ships the data locally and loads one country's file at a time,
so a form field never waits on a CDN and the bundle never carries 250
countries' worth of cities. Every accessor is async for that reason.

These wrappers exist to hand the rest of the app one shape — the `{ value,
label }` our selects and comboboxes already speak — instead of leaking the
database's own record shape into every screen.
<!-- /notes -->

**Source** `src/lib/address.ts`

## Import

```tsx
import {
  listCountries,
  listStates,
  listCities,
  countryPhoneCode,
  countryCurrency,
} from "@/lib/address";
import type { AddressOption, CountryCode, StateCode } from "@/lib/address";
```

## Exports

### `AddressOption` — type

Countries, states and cities from the official Country State City database.

The package ships the data locally and loads one country's file at a time,
so a form field never waits on a CDN and the bundle never carries 250
countries' worth of cities. Every accessor is async for that reason.

These wrappers exist to hand the rest of the app one shape — the `{ value,
label }` our selects and comboboxes already speak — instead of leaking the
database's own record shape into every screen.

```ts
type AddressOption = {
  value: string;
  label: string;
}
```

### `CountryCode` — type

ISO 3166-1 alpha-2, e.g. `BR`, `US`.

```ts
type CountryCode = string
```

### `StateCode` — type

ISO 3166-2 subdivision code, e.g. `SP`, `CA`.

```ts
type StateCode = string
```

### `listCountries` — function

Every country, by name.

The database carries a flag emoji per country and it is tempting to prefix
the label with it — but Windows ships no flag glyphs, so the regional
indicators fall back to their letter pair and every row reads "us United
States". The name alone is what people scan anyway.

```ts
listCountries(): Promise<AddressOption[]>
```

### `listStates` — function

```ts
listStates(country: CountryCode): Promise<AddressOption[]>
```

### `listCities` — function

```ts
listCities(country: CountryCode, state: StateCode): Promise<AddressOption[]>
```

### `countryPhoneCode` — function

The dialling prefix for a country, to pair with the phone field.
Returned without the `+`, the way the database stores it.

```ts
countryPhoneCode(country: CountryCode)
```

### `countryCurrency` — function

The currency a country transacts in, for pricing shown per market.

```ts
countryCurrency(country: CountryCode)
```

## Depends on

- Packages: `@countrystatecity/countries`

## Used by

[actions/address](../actions/address.md), [shared/form-address-fields](../shared/form-address-fields.md)
