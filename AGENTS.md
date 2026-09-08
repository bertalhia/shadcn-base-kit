<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# shadcn/ui: read the docs before you write

This project is on the `base-rhea` style (Base UI, not Radix). The APIs diverge from what you have memorized: `render={<Button />}` instead of `asChild`, `data-checked` instead of `data-state`, `data-icon="inline-start" | "inline-end"` on icons, `@tanstack/react-table` v9 with `tableFeatures()` and `useTable`.

**Before creating or changing anything in `src/components/ui/` — or using one of those components on a screen — read that component's page in full.**

Index: https://ui.shadcn.com/llms.txt

Every page has a markdown version. Prefer `.../base/<component>.md`, which serves the Base UI variant:

```
https://ui.shadcn.com/docs/components/base/<component>.md
```

Read the **whole** page, not just the first code block. Each one carries several examples (variants, compositions, RTL), and that is where the real prop signatures and the extra dependencies show up.

Already settled, no need to redo:

- All 61 registry components are installed and match upstream. To refresh one, run `pnpm dlx shadcn@latest add <name> --overwrite`.
- `data-table`, `date-picker` and `typography` have no registry item — they are composition recipes. They live in `src/components/ui/` as hand-written files, so the CLI never touches them.
- `form` does not exist in `base-rhea`; use `field`. `sonner` was superseded by `toast`.

# Forms: React Hook Form + Zod + Field

This holds for **every** form, from a single input to a huge one. No exceptions, and no form component of our own — `base-rhea` ships no `form.tsx`, and the pattern is composition.

Docs: https://ui.shadcn.com/docs/forms/react-hook-form.md
Working reference in this repo: `src/components/examples/bug-report-form.tsx`

The skeleton:

1. `const formSchema = z.object({ ... })`, with the error message inside each Zod rule.
2. `useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues })`.
3. One `<Controller />` per field, inside a `<FieldGroup>`.
4. Inside `render`: `<Field data-invalid={fieldState.invalid}>`, `<FieldLabel htmlFor={field.name}>`, the control carrying `aria-invalid={fieldState.invalid}`, and `{fieldState.invalid && <FieldError errors={[fieldState.error]} />}`.
5. `<form onSubmit={form.handleSubmit(onSubmit)}>`.

By control type:

- `Input` / `Textarea`: spread `{...field}`.
- `Select`: `value={field.value}` and `onValueChange={field.onChange}`; `aria-invalid` goes on `SelectTrigger`.
- `Checkbox` / `Switch`: `checked={field.value}` and `onCheckedChange={field.onChange}`.
- `RadioGroup`: `value={field.value}` and `onValueChange={field.onChange}`.
- Checkbox group: `data-slot="checkbox-group"` on the `<FieldGroup>`.
- Dynamic list: `useFieldArray` with one `<Controller />` per item.

`useForm` validates on submit by default. Reach for `mode: "onBlur"` or `"onTouched"` when an immediate error helps more than it nags.

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

## Conventions

- Always pass an explicit parser (`parseAsInteger`, `parseAsIsoDate`, `parseAsArrayOf`, `parseAsStringLiteral`). Without one, everything comes back as a string.
- `.withDefault(...)` kills the `null` on read and keeps the URL clean: the default value is never written.
- Declare parsers in `src/lib/search-params.ts`, importing from `nuqs/server`. The same object feeds `useQueryStates` on the client, `createLoader` in a server component, and `createSerializer` when building links.
- A reusable component takes its key as a prop (`queryKey`, `queryPrefix`) — never hardcode the key inside, or two instances on one page will fight over it. See `DataTable` and `DatePicker`.
- `history: "push"` only where the change is real navigation (a tab, a modal). The `replace` default preserves the Back button.
- A URL past ~2,000 characters is a sign that state did not belong in the URL.
