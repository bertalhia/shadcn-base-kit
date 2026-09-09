# Country Flag

<!-- notes -->
A country's flag, as a real SVG file.

Not the emoji: Windows ships no flag glyphs, so `🇧🇷` falls back to the two
regional-indicator letters and every row reads "br Brazil".

Not the package's React components either — a country list needs all 250, so
nothing tree-shakes and roughly 900 KB of SVG lands in the client bundle. As
files the browser fetches only the rows a person actually sees, at about a
kilobyte each. `scripts/sync-flags.mjs` copies them into `public/flags`
before dev and build.

`next/image` skips optimisation for a `.svg` source on its own, which is
what the docs recommend rather than turning on `dangerouslyAllowSVG`.
<!-- /notes -->

**Source** `src/components/shared/country-flag.tsx`

## Import

```tsx
import { CountryFlag } from "@/components/shared/country-flag";
```

## Exports

### `CountryFlag` — component

A country's flag, as a real SVG file.

Not the emoji: Windows ships no flag glyphs, so `🇧🇷` falls back to the two
regional-indicator letters and every row reads "br Brazil".

Not the package's React components either — a country list needs all 250, so
nothing tree-shakes and roughly 900 KB of SVG lands in the client bundle. As
files the browser fetches only the rows a person actually sees, at about a
kilobyte each. They are committed under `public/flags`, copied once from
`country-flag-icons`.

`next/image` skips optimisation for a `.svg` source on its own, which is
what the docs recommend rather than turning on `dangerouslyAllowSVG`.

```ts
CountryFlag(props: Omit<React.ComponentProps<typeof Image>, "src" | "alt"> & {
  /** ISO 3166-1 alpha-2, e.g. `BR`. Case-insensitive. */
  code: string;
})
```

## Depends on

- Packages: `cn`, `next/image`, `react`

## Used by

[shared/form-address-fields](../shared/form-address-fields.md)
