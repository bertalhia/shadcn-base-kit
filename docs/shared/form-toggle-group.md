# Form Toggle Group

<!-- notes -->
A handful of options, all on screen, chosen by pressing one.

Good up to about five short labels. Beyond that the row wraps and a Select
reads better.
<!-- /notes -->

**Source** `src/components/shared/form-toggle-group.tsx` · **Client component**

## Import

```tsx
import { FormToggleGroup } from "@/components/shared/form-toggle-group";
```

## Exports

### `FormToggleGroup` — component

A handful of options, all on screen, chosen by pressing one.

Good up to about five short labels. Beyond that the row wraps and a Select
reads better.

```ts
FormToggleGroup<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> &
  Omit<
    React.ComponentProps<typeof ToggleGroup>,
    "value" | "onValueChange" | "children" | "name" | "type"
  > & { options: SelectOption[] })
```

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/shared/form-select`, `@/components/ui/toggle-group`

## Used by

[examples/account-settings](../examples/account-settings.md)
