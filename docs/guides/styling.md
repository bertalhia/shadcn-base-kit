# Styling

Tailwind v4, configured entirely in `src/app/globals.css`. There is no `tailwind.config.ts` — `@theme inline` is where the token names come from, and `:root` / `.dark` is where their values live.

## Use the token, not the colour

```
background  foreground
card        card-foreground
popover     popover-foreground
primary     primary-foreground
secondary   secondary-foreground
muted       muted-foreground
accent      accent-foreground
destructive success  warning  info
border      input     ring
chart-1 … chart-5
sidebar     sidebar-foreground   sidebar-primary   sidebar-accent
            sidebar-border       sidebar-ring
```

Every one is a Tailwind colour utility: `bg-muted`, `text-muted-foreground`, `border-border`. A raw hex or an `oklch()` in a component is a bug — it will not follow the theme into dark mode.

Radii derive from one `--radius`, so `rounded-sm` through `rounded-4xl` all move together when you change it.

## Base UI data attributes

State reads off attributes on the element, and that is what a variant should key on. The names are not the Radix ones:

| | Radix | here |
| --- | --- | --- |
| Checked | `data-state="checked"` | `data-checked` |
| Indeterminate | `data-state="indeterminate"` | `data-indeterminate` |
| Open | `data-state="open"` | `data-open` |
| Disabled | `data-disabled` | `data-disabled` |

Two more this project leans on: `data-icon="inline-start" | "inline-end"` on an icon inside a button, which is what tightens the padding on that side; and `data-slot="…"` on nearly every part, which is the handle to style a component from the outside without patching the vendored file.

## `cn`

It moved out of `lib/utils.ts` into its own package in September 2026:

```tsx
import { cn } from "cn";
```

Not `@/lib/utils`. That file does not exist here.

## Variants

Components use `cva`. Each component's markdown twin lists its variants and defaults in a table — [`button`](../ui/button.md) and [`badge`](../ui/badge.md) are the ones you will reach for most. Add a variant by wrapping in `shared/`, never by editing the file under `ui/`.

## Canonical classes

The editor's `suggestCanonicalClasses` warnings come from Tailwind's own engine, reachable without the editor:

```js
const ds = await __unstable__loadDesignSystem(css, { base, loadStylesheet, loadModule });
ds.canonicalizeCandidates(classes, { rem: 16, collapse: false, logical: false });
```

Keep `logical: false` — this project is `rtl: false`, so `pl-6` must not become `ps-6`. `collapse: true` is slow enough to look hung on a folder this size, and it merges separate utilities, so leave it off too.

## Lint

`src/components/ui/` is written by `shadcn add`. `biome.json` has an `overrides` entry switching off the rules that fight that vendored code: a11y roles on divs, `document.cookie` in the sidebar, `dangerouslySetInnerHTML` in the chart, array index keys, exhaustive deps. Per-line `biome-ignore` comments would not survive the next `--overwrite`; the override does.

Everything else stays on, and `pnpm lint` is expected to pass clean.
