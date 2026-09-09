# shadcn base kit

A Next.js starting point with every shadcn/ui component already installed, a layer of standardized pieces built on top of them, and a markdown twin of every file so an assistant can look something up instead of guessing.

Copy it, delete `src/components/examples/`, keep the rest.

## What is in it

- **All 61 shadcn/ui registry components**, on the `base-rhea` style — Base UI, not Radix — plus `data-table`, `date-picker` and `typography`, which are composition recipes with no registry item.
- **44 shared components**: a `Form*` for every control that exists, a responsive dialog, empty/error/loading states, masked inputs for phone, CPF/CNPJ and money, the address chain, the sidebar and page-header pieces.
- **Wrappers for the libraries that matter**, one per job: dates, phone numbers, documents, the country database, number formatting, toasts, URL state.
- **14 example screens** that put it together — a checkout form, a data table, a dashboard, a chat, a settings page, an onboarding flow.
- **`llms.txt` and `docs/`**: the whole thing described in markdown, generated from the source.

## Getting started

```bash
pnpm install
pnpm dev
```

| | |
| --- | --- |
| `pnpm dev` | development server |
| `pnpm build` | production build |
| `pnpm lint` | biome |
| `pnpm format` | biome, writing |
| `pnpm docs:sync` | regenerate `docs/` and `llms.txt` from `src/` |
| `pnpm docs:check` | fail if they went stale |

## The documentation is the point

Every file under `src/` has a page under `docs/` carrying its exports, the real signatures, the `cva` variants, the `data-slot` hooks, what it imports and who imports it back. `src/components/ui/select.tsx` is `docs/ui/select.md`. [`llms.txt`](llms.txt) indexes all of it with a sentence per entry.

Those pages are written from the TypeScript AST, so the API sections cannot drift from the code. The prose inside each `<!-- notes -->` block is hand-written and survives a regeneration — that is where the reason a thing exists lives.

**Run `pnpm docs:sync` after any change under `src/`, and commit what it writes.**

For an assistant, the reading order is [AGENTS.md](AGENTS.md), then `llms.txt`, then the twin of the file being touched. The crosscutting rules are in [`docs/guides/`](docs/guides/start-here.md): forms, URL state, responsive, styling, file placement, copy.

## The stack

Next.js 16 · React 19 · Tailwind v4 · Base UI · shadcn/ui `base-rhea` · React Hook Form + Zod · nuqs · TanStack Table v9 · Recharts · Biome.

## Conventions worth knowing before you start

- `src/components/ui/` is vendored. Never hand-edit it — `pnpm dlx shadcn@latest add <name> --overwrite` rewrites the file. Wrap it in `shared/` instead.
- Forms are always React Hook Form + Zod + `Field`, through `useZodForm` and the `Form*` components. Never a hand-wired `Controller` in a screen.
- State a person expects to find again goes in the URL through nuqs, not `useState`.
- Screens import the wrapper in `lib/`, never the library it wraps.
- Nothing ships without being looked at around 390px wide.
