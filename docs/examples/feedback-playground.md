# Feedback Playground

<!-- notes -->
Every way this project tells a person something — toast, confirm dialog, responsive dialog, popover, empty state, error state, loading state — on one page with the controls to fire them.
<!-- /notes -->

**Source** `src/components/examples/feedback-playground.tsx` · **Client component**

## Import

```tsx
import { FeedbackPlayground } from "@/components/examples/feedback-playground";
```

## Exports

### `FeedbackPlayground` — component

Every way this app tells someone what happened, on one screen.

Worth having as a scenario because these are the pieces that only show up
when something goes wrong, which is exactly when nobody has looked at them.

```ts
FeedbackPlayground()
```

## Depends on

- Packages: `lucide-react`, `nuqs`, `react`
- In this project: `@/components/shared/confirm-dialog`, `@/components/shared/copy-button`, `@/components/shared/empty-state`, `@/components/shared/error-state`, `@/components/shared/loading-state`, `@/components/shared/responsive-dialog`, `@/components/shared/section`, `@/components/ui/button`, `@/components/ui/button-group`, `@/components/ui/card`, `@/components/ui/direction`, `@/components/ui/kbd`, `@/components/ui/label`, `@/components/ui/popover`, `@/components/ui/progress`, `@/components/ui/separator`, `@/components/ui/switch`, `@/lib/notify`
