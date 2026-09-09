# Onboarding Questionnaire

<!-- notes -->
One question per screen inside a responsive dialog: the `questionnaire` primitive driving progress, validation and skip.
<!-- /notes -->

**Source** `src/components/examples/onboarding-questionnaire.tsx` · **Client component**

## Import

```tsx
import {
  OnboardingQuestionnaire,
} from "@/components/examples/onboarding-questionnaire";
```

## Exports

### `OnboardingQuestionnaire` — component

Onboarding, one question at a time.

`Questionnaire` owns the ordered items, the answers, validation, progress
and navigation. What is left to the screen — and what a dialog cannot
delegate — is what happens on close and where the answers go.

It submits as a form, so the answers arrive as `FormData` rather than as
state we would have to mirror.

```ts
OnboardingQuestionnaire()
```

## Depends on

- Packages: `react`
- In this project: `@/components/shared/responsive-dialog`, `@/components/ui/button`, `@/components/ui/questionnaire`, `@/lib/notify`
