# Release Notes

<!-- notes -->
A server-rendered content page: `typography` for prose, accordions for the older versions. It renders inside a client tab strip without becoming a client component itself.
<!-- /notes -->

**Source** `src/components/examples/release-notes.tsx`

## Import

```tsx
import { ReleaseNotes } from "@/components/examples/release-notes";
```

## Exports

### `ReleaseNotes` — component

A written page — the case the typography components exist for.

Everything here is prose and structure, so it is a server component: no
state, no handlers, nothing to send to the browser.

```ts
ReleaseNotes()
```

## Depends on

- Packages: `lucide-react`
- In this project: `@/components/ui/accordion`, `@/components/ui/alert`, `@/components/ui/badge`, `@/components/ui/breadcrumb`, `@/components/ui/button`, `@/components/ui/collapsible`, `@/components/ui/separator`, `@/components/ui/typography`, `@/lib/date`
