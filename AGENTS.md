<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Look it up before you write it

Reach for `WebSearch` and `WebFetch` first, on anything you would otherwise answer from memory: a library's API, a config format, a CLI flag, a lint rule, a version's behaviour. Your training data lags the versions pinned here, and this project runs several of them ahead.

Read the primary source — the library's own docs or repo — before a blog post about it. Most of the tooling here publishes a machine-readable index; use it:

- shadcn/ui: https://ui.shadcn.com/llms.txt
- Every docs page on ui.shadcn.com and nuqs.dev has a `.md` twin: append `.md` to the URL.
- Next.js: the guides shipped in `node_modules/next/dist/docs/`.

Before hand-rolling a codemod, check whether the tool already exposes the thing. Two that paid off here: Tailwind ships `canonicalizeCandidates()` on the design system loaded via `__unstable__loadDesignSystem`, which is the same engine behind the editor's `suggestCanonicalClasses` warnings; TanStack Table ships its own skills under `node_modules/@tanstack/react-table/skills/`.

# No filler code

Three things get rejected on sight.

**Re-exporting what you just imported.** `import { CountryCode } from "x"` followed by `export type { CountryCode }` adds a second name for the same thing and a second place to keep in sync. Callers import from the source. Only re-export when the module genuinely owns the abstraction.

**Workarounds in place of the real fix.** If a library has an API for the job, use that API — read its docs and its types first. Reaching for a cast, a copied-out constant, a regex over something already parsed, or a second source of truth is a bug waiting on a version bump. When the real fix is out of scope, say so instead of papering over it.

**`any`, and `unknown` left untreated.** No `any`. `unknown` is fine as an input boundary, but narrow it before use — a type guard, a schema parse, a discriminated union. `unknown` that reaches a call site through a cast is `any` with extra steps. Prefer a generic parameter over both.

# shadcn/ui: read the docs before you write

This project is on the `base-rhea` style (Base UI, not Radix). The APIs diverge from what you have memorized: `render={<Button />}` instead of `asChild`, `data-checked` instead of `data-state`, `data-icon="inline-start" | "inline-end"` on icons, `@tanstack/react-table` v9 with `tableFeatures()` and `useTable`.

**Before creating or changing anything in `src/components/ui/` — or using one of those components on a screen — read that component's page in full.**

Index: https://ui.shadcn.com/llms.txt

**Read the changelog before you start:** https://ui.shadcn.com/docs/changelog — It is where renames, new components and migrations land, and it is the cheapest way to find out that something you are about to hand-write now ships in the registry. `cn` moving out of `lib/utils.ts` into its own package (September 2026) is the kind of thing that only shows up there.

Every page has a markdown version. Prefer `.../base/<component>.md`, which serves the Base UI variant:

```
https://ui.shadcn.com/docs/components/base/<component>.md
```

Read the **whole** page, not just the first code block. Each one carries several examples (variants, compositions, RTL), and that is where the real prop signatures and the extra dependencies show up.

Already settled, no need to redo:

- All 61 registry components are installed and match upstream. To refresh one, run `pnpm dlx shadcn@latest add <name> --overwrite`.
- `data-table`, `date-picker` and `typography` have no registry item — they are composition recipes. They live in `src/components/ui/` as hand-written files, so the CLI never touches them.
- `form` does not exist in `base-rhea`; use `field`. `sonner` was superseded by `toast`.

# Where a file goes

Next.js is unopinionated about this — its own docs call `components` and `lib` "generalized placeholders" — so the layout below is this project's choice, not a framework rule.

```
src/
  app/          routing only
  components/
    ui/         written by the shadcn CLI, do not hand-edit
    shared/     ours: the standardized pieces screens compose from
    examples/   reference screens
  lib/          integrations: one file per external library or service
  utils/        pure helpers, no dependencies
  schemas/      Zod schemas
  constants/    static data
  hooks/        React hooks
```

Two directions to keep straight:

- **A file with no JSX is not a component.** It goes to the folder matching what it _is_, not to whichever one imports it.
- **`lib/` is not a dumping ground for `.ts`.** A file belongs there only if it wraps something we did not write. `date.ts` wraps date-fns, `address.ts` wraps the country database, `notify.ts` wraps the toast manager singleton that lives in `ui/toast`. A mask helper with no imports is `utils/`; a list of nav entries is `constants/`.

`pnpm lint` enforces both, plus "no `.tsx` under lib, utils, schemas, constants or hooks", via `scripts/check-structure.mjs`. It exists because these rules were written down and broken anyway.

# One library per job, wrapped once

These are settled. Do not add a second library for the same job, and do not hand-roll what they already do.

| Job                       | Library                       | Wrapper           |
| ------------------------- | ----------------------------- | ----------------- |
| Phone numbers             | `libphonenumber-js`           | `lib/phone.ts`    |
| CPF / CNPJ                | `cpf-cnpj-validator`          | `lib/document.ts` |
| Dates                     | `date-fns`                    | `lib/date.ts`     |
| Countries, states, cities | `@countrystatecity/countries` | `lib/address.ts`  |
| Money, counts, bytes      | `Intl`                        | `utils/number.ts` |

Screens import the wrapper, never the library. That is what makes a format decision changeable in one place.

Two things worth knowing about the address data: every accessor is async, because the package ships the database locally and loads one country's file at a time rather than bundling 150,000 cities. And a state code only means something inside its country, so changing the country has to clear the state and the city — `FormAddressFields` already does.

CNPJ takes letters in its first twelve positions under RFB technical note 49/2024. Any mask or validation for it has to accept them; digits-only is wrong from July 2026.

# Forms: React Hook Form + Zod + Field

This holds for **every** form, from a single input to a huge one. No exceptions.

Docs: https://ui.shadcn.com/docs/forms/react-hook-form.md

## Compose from `src/components/shared/`

Start here rather than from `Controller`:

```tsx
const form = useZodForm(schema, { defaultValues });

<Form form={form} onSubmit={handleSubmit}>
  <FormSection>
    <FormInput control={form.control} name="email" label="Email" />
    <FormPhoneInput control={form.control} name="phone" label="Phone" />
  </FormSection>
  <FormActions>
    <SubmitButton control={form.control}>Save</SubmitButton>
  </FormActions>
</Form>;
```

`useZodForm` fixes the resolver and the types. `SubmitButton` reads its own pending state off the form, so no screen threads an `isLoading` prop down to it. There is a `Form*` component for every control — input, textarea, select, native select, combobox, checkbox, checkbox group, radio group, switch, slider, toggle group, date picker, date range picker, OTP, file, password, phone, document, currency, and the address chain.

Missing one? Add it to `shared/` on top of `FormField`. Do not hand-roll a field in a screen.

## What `FormField` already handles

It owns the four things the Field docs ask for and that are easy to get subtly wrong per field: `data-invalid` on the wrapper, `htmlFor` tied to the control id, the description, and `FieldError` fed from React Hook Form. A new field component only renders its control:

```tsx
<FormField control={control} name={name} label={label}>
  {({ field, id, invalid }) => (
    <SomeControl {...field} id={id} aria-invalid={invalid} />
  )}
</FormField>
```

Wiring per control type, for when you write a new one:

- `Input` / `Textarea`: spread `{...field}`.
- `Select` / `Combobox` / `RadioGroup` / `ToggleGroup`: `value` and `onValueChange`; `aria-invalid` goes on the trigger, which is what a person focuses.
- `Checkbox` / `Switch`: `checked` and `onCheckedChange`.
- Checkbox group: `data-slot="checkbox-group"` on the `<FieldGroup>`.
- Dynamic list: `useFieldArray` with one field component per item.

## Two settled decisions

Leave `mode` alone. React Hook Form validates on submit, and that is the behaviour this project wants: `onBlur` and `onTouched` flag a field the moment focus leaves it, so tabbing through a form paints errors under inputs nobody has finished filling.

A description line only earns its place when it says something the label cannot. `Password` + "At least 8 characters" stays — that is a rule nobody can guess, and it prevents a rejected submit. `Phone` + "So we can reach you about your order" goes; everyone knows what a phone is for. When in doubt, leave it out: extra text costs a read on every visit, a missing line costs one question, once.

# Responsive, and checked at a phone width

Everything here is built for a phone as well as a desk. **No horizontal scroll on the page.** The one exception is a genuinely wide element scrolling inside its own box — a data table. The body never scrolls sideways.

Validate in the browser through the Chrome MCP before calling anything done. Reading the CSS is not validation; every responsive bug in this project so far looked fine in the source.

## What keeps going wrong

Each of these shipped looking correct at desktop width:

- **A row of things that grows.** Nine tabs come to 600px. Wrap it (`flex-wrap`) rather than scroll it — a scrolling strip leaves the last item clipped with nothing to say it is there. Watch for a fixed height on the container: `TabsList` is `h-8` under a `group-data-horizontal` variant, and a plain `h-auto` does not override a variant-scoped class, so the second row spills over whatever is below.
- **A trigger sized as a percentage of its parent.** `h-[calc(100%-1px)]` is one row's height until the parent wraps, then every item stretches across both rows and they collide.
- **A cluster pinned with `ml-auto`.** It runs past the edge and an ancestor's `overflow-hidden` swallows it, so nothing scrolls and the buttons are simply gone. Let the row wrap, and drop what is optional on a small screen — a keyboard shortcut hint is for people with keyboards.
- **A breadcrumb.** The full trail wraps onto three lines. Collapse the ancestors into `BreadcrumbEllipsis` below `sm`.
- **A side-by-side split.** Two panels leave about 190px each, which is not a chart any more. Stack them, and drop the resize handle entirely — a drag target is an affordance nobody can use with a thumb. Where a split does survive, give every panel a `minSize`, or a drag can hide one completely with nothing left to grab.

## Checking it

Resizing the browser window does not change `innerWidth` in this automation setup. Load the app in a 390px iframe served from `public/` instead — same-origin, so the check can read into the frame — and look for two different failures:

- the document wider than the viewport, and
- elements past the viewport that an ancestor clips, which report no overflow at all and are the worse case, because the content is invisible rather than merely awkward.

Then look at the screenshots. Neither check catches overlapping elements, squashed charts, or a control too small to hit.

# State: nuqs

`NuqsAdapter` is already mounted in `src/app/layout.tsx`.

**State a person changes and expects to find again belongs in the URL, not in `useState`.** Filters, search, active tab, sorting, page, date range, the item opened in a detail panel: all of it survives a refresh and fits in a shared link.

```tsx
const [query, setQuery] = useQueryState("q", parseAsString.withDefault(""));
```

When several keys move together, `useQueryStates` writes to the URL once.

What stays in `useState`:

- Transient open/close state: popover, tooltip, dropdown, menu. Persisting it reopens the popover on reload and floods the Back history.
- Field values in an open form — React Hook Form owns those. A draft does not go in the URL.

A useful line: if the link would make no sense pasted into someone else's chat, it is `useState`.

## `useSearchParams` forces a Suspense boundary

`useQueryState` calls `useSearchParams()` underneath. In the app router that opts the page out of static prerendering unless the caller sits inside `<Suspense>` — the build fails with _"useSearchParams() should be wrapped in a suspense boundary"_, and only at prerender time, so `next dev` will not warn you.

Two consequences:

- A page rendering `<DataTable />`, or any picker with a `queryKey`, wraps it in `<Suspense>`.
- A component that only _optionally_ reads the URL must not call the hook unconditionally and branch on the result — that drags the boundary into every caller. Mount the nuqs hook in its own child component and render it only when the key is there. `date-picker.tsx` does this with `DateValue` / `QueryDate` / `LocalDate`.

## Conventions

- Always pass an explicit parser (`parseAsInteger`, `parseAsIsoDate`, `parseAsArrayOf`, `parseAsStringLiteral`). Without one, everything comes back as a string.
- `.withDefault(...)` kills the `null` on read and keeps the URL clean: the default value is never written.
- Declare parsers in `src/lib/search-params.ts`, importing from `nuqs/server`. The same object feeds `useQueryStates` on the client, `createLoader` in a server component, and `createSerializer` when building links.
- A reusable component takes its key as a prop (`queryKey`, `queryPrefix`) — never hardcode the key inside, or two instances on one page will fight over it. See `DataTable` and `DatePicker`.
- `history: "push"` only where the change is real navigation (a tab, a modal). The `replace` default preserves the Back button.
- A URL past ~2,000 characters is a sign that state did not belong in the URL.

# Lint

`src/components/ui/` is written by `shadcn add`. `biome.json` has an `overrides` entry switching off the rules that fight that vendored code (a11y roles on divs, `document.cookie` in the sidebar, `dangerouslySetInnerHTML` in the chart, array index keys, exhaustive deps). Per-line `biome-ignore` comments would not survive the next `--overwrite`; the override does.

Everything else stays on, and `pnpm lint` is expected to pass clean.

## Tailwind canonical classes

The editor's `suggestCanonicalClasses` warnings come from Tailwind's own engine, reachable without the editor:

```js
const ds = await __unstable__loadDesignSystem(css, {
  base,
  loadStylesheet,
  loadModule,
});
ds.canonicalizeCandidates(classes, {
  rem: 16,
  collapse: false,
  logical: false,
});
```

Keep `logical: false` — this project is `rtl: false`, so `pl-6` must not become `ps-6`. `collapse: true` is slow enough to look hung on a folder this size, and merges separate utilities, so leave it off too.
