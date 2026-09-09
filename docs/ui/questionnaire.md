# Questionnaire

<!-- notes -->
The one-question-at-a-time flow from `@shadcn/react` — steps, progress, validation and the previous/next/skip controls. `examples/onboarding-questionnaire` is the working screen.
<!-- /notes -->

**Source** `src/components/ui/questionnaire.tsx` · **Upstream** [questionnaire.md](https://ui.shadcn.com/docs/components/base/questionnaire.md) · **Client component**

## Import

```tsx
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";
```

## Exports

### `Questionnaire` — component

```ts
Questionnaire(props: React.ComponentProps<typeof QuestionnairePrimitive.Root>)
```

### `QuestionnaireActions` — component

```ts
QuestionnaireActions(props: React.ComponentProps<"div">)
```

### `QuestionnaireChoice` — component

```ts
QuestionnaireChoice(props: React.ComponentProps<typeof QuestionnairePrimitive.Choice>)
```

### `QuestionnaireChoiceDescription` — component

```ts
QuestionnaireChoiceDescription(props: React.ComponentProps<"span">)
```

### `QuestionnaireChoices` — component

```ts
QuestionnaireChoices(props: React.ComponentProps<typeof QuestionnairePrimitive.Choices>)
```

### `QuestionnaireDescription` — component

```ts
QuestionnaireDescription(props: React.ComponentProps<typeof QuestionnairePrimitive.Description>)
```

### `QuestionnaireError` — component

```ts
QuestionnaireError(props: React.ComponentProps<typeof QuestionnairePrimitive.Error>)
```

### `QuestionnaireInput` — component

```ts
QuestionnaireInput(props: React.ComponentProps<typeof QuestionnairePrimitive.Input>)
```

### `QuestionnaireItem` — component

```ts
QuestionnaireItem(props: React.ComponentProps<typeof QuestionnairePrimitive.Item>)
```

### `QuestionnaireNext` — component

```ts
QuestionnaireNext(props: React.ComponentProps<typeof QuestionnairePrimitive.Next> &
  Pick<React.ComponentProps<typeof Button>, "size" | "variant">)
```

### `QuestionnairePrevious` — component

```ts
QuestionnairePrevious(props: React.ComponentProps<typeof QuestionnairePrimitive.Previous> &
  Pick<React.ComponentProps<typeof Button>, "size" | "variant">)
```

### `QuestionnaireProgress` — component

```ts
QuestionnaireProgress(props: React.ComponentProps<typeof QuestionnairePrimitive.Progress>)
```

### `QuestionnaireSkip` — component

```ts
QuestionnaireSkip(props: React.ComponentProps<typeof QuestionnairePrimitive.Skip> &
  Pick<React.ComponentProps<typeof Button>, "size" | "variant">)
```

### `QuestionnaireSubmit` — component

```ts
QuestionnaireSubmit(props: React.ComponentProps<typeof QuestionnairePrimitive.Submit> &
  Pick<React.ComponentProps<typeof Button>, "size" | "variant">)
```

### `QuestionnaireTitle` — component

```ts
QuestionnaireTitle(props: React.ComponentProps<typeof QuestionnairePrimitive.Title>)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="questionnaire"]`, `[data-slot="questionnaire-actions"]`, `[data-slot="questionnaire-choice"]`, `[data-slot="questionnaire-choice-description"]`, `[data-slot="questionnaire-choice-indicator"]`, `[data-slot="questionnaire-choice-indicator-check"]`, `[data-slot="questionnaire-choice-indicator-dot"]`, `[data-slot="questionnaire-choice-input"]`, `[data-slot="questionnaire-choice-label"]`, `[data-slot="questionnaire-choice-shortcut"]`, `[data-slot="questionnaire-choices"]`, `[data-slot="questionnaire-description"]`, `[data-slot="questionnaire-error"]`, `[data-slot="questionnaire-input"]`, `[data-slot="questionnaire-input-wrapper"]`, `[data-slot="questionnaire-item"]`, `[data-slot="questionnaire-next"]`, `[data-slot="questionnaire-previous"]`, `[data-slot="questionnaire-progress"]`, `[data-slot="questionnaire-skip"]`, `[data-slot="questionnaire-submit"]`, `[data-slot="questionnaire-title"]`.

## Depends on

- Packages: `@shadcn/react/questionnaire`, `cn`, `lucide-react`, `react`
- In this project: `@/components/ui/button`

## Used by

[examples/onboarding-questionnaire](../examples/onboarding-questionnaire.md)
