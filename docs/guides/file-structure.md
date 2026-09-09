# Where a file goes

Next.js is unopinionated about this — its own docs call `components` and `lib` "generalized placeholders" — so the layout below is a choice this project made, not a framework rule.

```
src/
  app/          routing only
  actions/      server actions
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

## Two directions people get backwards

**A file with no JSX is not a component.** It goes to the folder matching what it _is_, not to whichever folder imports it. A hook used only by one component still lives in `hooks/`.

**`lib/` is not a dumping ground for `.ts`.** A file belongs there only if it wraps something we did not write:

| File | Wraps |
| --- | --- |
| `lib/date.ts` | date-fns |
| `lib/phone.ts` | libphonenumber-js |
| `lib/document.ts` | cpf-cnpj-validator |
| `lib/address.ts` | the country/state/city database |
| `lib/notify.ts` | the toast manager singleton in `ui/toast` |
| `lib/search-params.ts` | nuqs parsers |

A mask helper with no imports is `utils/`. A list of navigation entries is `constants/`. A Zod schema is `schemas/`.

## `ui/` versus `shared/`

`ui/` is vendored. `pnpm dlx shadcn@latest add <name> --overwrite` rewrites the file and your edit disappears with it. Three files there are exceptions, because they have no registry item and the CLI never touches them: `data-table.tsx`, `date-picker.tsx` and `typography.tsx`.

`shared/` is where a decision this project made lives. If you catch yourself writing the same five lines of wiring on a second screen, that is the signal to move it here — that is how every `Form*` component and `menu-section` came to exist.

## After you move or add a file

```bash
node scripts/generate-docs.mjs
```

That rewrites the markdown twin and the `llms.txt` index. A doc for a deleted file is removed; a new file gets a page with its exports and signatures already filled in, and an empty `<!-- notes -->` block waiting for a sentence about why it exists.
