# Alert

<!-- notes -->
A message that sits in the page, not over it. `AlertAction` puts a control on the right of the same row. For something the person has to answer, use `alert-dialog`; for something that passes on its own, `toast`.
<!-- /notes -->

**Source** `src/components/ui/alert.tsx` · **Upstream** [alert.md](https://ui.shadcn.com/docs/components/base/alert.md)

## Import

```tsx
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
} from "@/components/ui/alert";
```

## Exports

### `Alert` — component

```ts
Alert(props: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>)
```

### `AlertTitle` — component

```ts
AlertTitle(props: React.ComponentProps<"div">)
```

### `AlertDescription` — component

```ts
AlertDescription(props: React.ComponentProps<"div">)
```

### `AlertAction` — component

```ts
AlertAction(props: React.ComponentProps<"div">)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="alert"]`, `[data-slot="alert-action"]`, `[data-slot="alert-description"]`, `[data-slot="alert-title"]`.

## Depends on

- Packages: `class-variance-authority`, `cn`, `react`

## Used by

[examples/checkout-form](../examples/checkout-form.md), [examples/release-notes](../examples/release-notes.md), [shared/error-state](../shared/error-state.md)
