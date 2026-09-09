# One library per job, wrapped once

These are settled. Do not add a second library for the same job, and do not hand-roll what they already do.

| Job | Library | Wrapper |
| --- | --- | --- |
| Phone numbers | `libphonenumber-js` | [`lib/phone.ts`](../lib/phone.md) |
| CPF / CNPJ | `cpf-cnpj-validator` | [`lib/document.ts`](../lib/document.md) |
| Dates | `date-fns` | [`lib/date.ts`](../lib/date.md) |
| Countries, states, cities | `@countrystatecity/countries` | [`lib/address.ts`](../lib/address.md) |
| Money, counts, bytes | `Intl` | [`utils/number.ts`](../utils/number.md) |
| Toasts | the manager in `ui/toast` | [`lib/notify.ts`](../lib/notify.md) |
| URL state | `nuqs` | [`lib/search-params.ts`](../lib/search-params.md) |

**Screens import the wrapper, never the library.** That is what makes a format decision changeable in one place.

## What each wrapper is protecting you from

**Addresses.** Every accessor is async, because the package ships the database locally and loads one country's file at a time rather than bundling 150,000 cities. It also reads the filesystem and refuses to run in a browser, which is why the lists come through the server actions in `src/actions/address.ts`. And a state code only means something inside its country, so changing the country has to clear the state and the city — [`FormAddressFields`](../shared/form-address-fields.md) already does.

**CPF and CNPJ.** CNPJ takes letters in its first twelve positions under RFB technical note 49/2024; only the two check digits stay numeric. Any mask or validation for it has to accept them — digits-only is wrong from July 2026 on.

**Phone numbers.** Numbering plans differ per country and change over time. `AsYouType` already knows them, so there is no mask here to fall behind. The field stores what the person sees and `phoneSchema` converts to E.164 on submit, so the form value and the API payload never drift apart.

**Flags.** Not the emoji: Windows ships no flag glyphs, so `🇧🇷` falls back to two regional-indicator letters and every row reads "br Brazil". Not the package's React components either — a country list needs all 250, so nothing tree-shakes and roughly 900 KB of SVG lands in the client bundle. They are served as files from `public/flags`, about a kilobyte each, and the browser fetches only the rows a person actually sees.

**Toasts.** Going through `notify` rather than calling `toast.add` directly keeps the icons consistent per type, and keeps errors at high priority so they outlive the success messages queued behind them.

## Before adding a dependency

Check whether the tool you already have exposes the thing. Two that paid off here: Tailwind ships `canonicalizeCandidates()` on the design system loaded via `__unstable__loadDesignSystem`, which is the same engine behind the editor's `suggestCanonicalClasses` warnings; TanStack Table ships its own skills under `node_modules/@tanstack/react-table/skills/`.
