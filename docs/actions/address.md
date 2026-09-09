# Address

<!-- notes -->
Countries, states and cities, reached from the browser.

`@countrystatecity/countries` reads the database off the filesystem and
refuses to run in a browser. Server actions are how a client component gets
at it without standing up an endpoint: the call runs on the server, and the
data stays local rather than coming from a CDN.
<!-- /notes -->

**Source** `src/actions/address.ts`

## Import

```tsx
import { fetchCountries, fetchStates, fetchCities } from "@/actions/address";
```

## Exports

### `fetchCountries` — function

Countries, states and cities, reached from the browser.

`@countrystatecity/countries` reads the database off the filesystem and
refuses to run in a browser. Server actions are how a client component gets
at it without standing up an endpoint: the call runs on the server, and the
data stays local rather than coming from a CDN.

```ts
fetchCountries(): Promise<AddressOption[]>
```

### `fetchStates` — function

```ts
fetchStates(country: string): Promise<AddressOption[]>
```

### `fetchCities` — function

```ts
fetchCities(country: string, state: string): Promise<AddressOption[]>
```

## Depends on

- In this project: `@/lib/address`

## Used by

[shared/form-address-fields](../shared/form-address-fields.md)
