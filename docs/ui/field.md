# Field

<!-- notes -->
The layout every form control sits in: label, control, description, error, and the `data-invalid` flag they all key off. There is no `form` component in `base-rhea`; this replaced it. Do not compose it by hand — `shared/form-field` already owns the four wirings that are easy to get subtly wrong per field.
<!-- /notes -->

**Source** `src/components/ui/field.tsx` · **Upstream** [field.md](https://ui.shadcn.com/docs/components/base/field.md) · **Client component**

## Import

```tsx
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
} from "@/components/ui/field";
```

## Exports

### `Field` — component

```ts
Field(props: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>)
```

### `FieldLabel` — component

```ts
FieldLabel(props: React.ComponentProps<typeof Label>)
```

### `FieldDescription` — component

```ts
FieldDescription(props: React.ComponentProps<"p">)
```

### `FieldError` — component

```ts
FieldError(props: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
})
```

### `FieldGroup` — component

```ts
FieldGroup(props: React.ComponentProps<"div">)
```

### `FieldLegend` — component

```ts
FieldLegend(props: React.ComponentProps<"legend"> & { variant?: "legend" | "label" })
```

### `FieldSeparator` — component

```ts
FieldSeparator(props: React.ComponentProps<"div"> & {
  children?: React.ReactNode;
})
```

### `FieldSet` — component

```ts
FieldSet(props: React.ComponentProps<"fieldset">)
```

### `FieldContent` — component

```ts
FieldContent(props: React.ComponentProps<"div">)
```

### `FieldTitle` — component

```ts
FieldTitle(props: React.ComponentProps<"div">)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="field"]`, `[data-slot="field-content"]`, `[data-slot="field-description"]`, `[data-slot="field-error"]`, `[data-slot="field-group"]`, `[data-slot="field-label"]`, `[data-slot="field-legend"]`, `[data-slot="field-separator"]`, `[data-slot="field-separator-content"]`, `[data-slot="field-set"]`.

## Depends on

- Packages: `class-variance-authority`, `cn`, `react`
- In this project: `@/components/ui/label`, `@/components/ui/separator`

## Used by

[examples/bug-report-form](../examples/bug-report-form.md), [examples/checkout-form](../examples/checkout-form.md), [shared/form](../shared/form.md), [shared/form-actions](../shared/form-actions.md), [shared/form-checkbox](../shared/form-checkbox.md), [shared/form-checkbox-group](../shared/form-checkbox-group.md), [shared/form-field](../shared/form-field.md), [shared/form-radio-group](../shared/form-radio-group.md), and 1 more
