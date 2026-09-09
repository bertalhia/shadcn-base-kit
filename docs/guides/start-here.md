# Start here

A Next.js app with all 61 shadcn/ui registry components installed on the `base-rhea` style, a layer of standardized pieces on top of them, and a markdown twin of every file so an assistant can look something up instead of remembering it.

Copy it, delete the example screens, keep the rest.

## Read these before you write anything

1. [AGENTS.md](../../AGENTS.md) — the rules that override whatever your training data says.
2. [llms.txt](../../llms.txt) — the index. Every file under `src/` is in it, with a sentence about what it does.
3. The markdown twin of the file you are about to touch. `src/components/ui/select.tsx` is [docs/ui/select.md](../ui/select.md), and that page carries the exports, the real signatures, the `cva` variants and the `data-slot` hooks.

## The five that catch people out

**This is not the shadcn/ui you remember.** The style is `base-rhea`, which is Base UI, not Radix. `render={<Button />}` where you would write `asChild`. `data-checked` where you would look for `data-state`. `@tanstack/react-table` v9, with `tableFeatures()` and `useTable`. There is no `form` component — `field` replaced it — and no `sonner`, which `toast` replaced. When in doubt, open the upstream page linked at the top of the component's markdown: `https://ui.shadcn.com/docs/components/base/<name>.md`.

**Never hand-edit `src/components/ui/`.** The CLI owns those files and `--overwrite` will throw your change away. Wrap the component in `src/components/shared/` instead.

**Never hand-roll a form field.** `useZodForm`, `<Form>`, and one `Form*` per control. There is one for every control that exists here. See [forms.md](forms.md).

**State a person expects to find again goes in the URL.** Filters, search, the active tab, sorting, the page, the open row. `useState` keeps what is genuinely transient — a popover, a menu, a draft. See [state-url.md](state-url.md).

**Nothing is finished until it has been looked at around 390px wide.** Every responsive bug in this project so far read as correct in the source. See [responsive.md](responsive.md).

## Looking something up

Reach for the docs before memory, in this order:

| Question | Where |
| --- | --- |
| What does this file export? | its markdown twin under `docs/` |
| What props does a shadcn component take? | `https://ui.shadcn.com/docs/components/base/<name>.md` — the whole page, not the first code block |
| Did something get renamed or replaced? | https://ui.shadcn.com/docs/changelog |
| How does a Next.js API work in this version? | `node_modules/next/dist/docs/` |
| A nuqs parser or adapter? | append `.md` to any page on nuqs.dev |

## Running it

```bash
pnpm install
pnpm dev
pnpm lint          # biome
node scripts/generate-docs.mjs           # after any change under src/
node scripts/generate-docs.mjs --check   # fails if the docs went stale
```
