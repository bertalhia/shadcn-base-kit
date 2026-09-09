# Form Checkbox Group

<!-- notes -->
Any number of a set, stored as an array of values.

`data-slot="checkbox-group"` on the group is what the Field docs ask for —
it is the hook the stylesheet uses for the tighter spacing checkboxes want.
<!-- /notes -->

**Source** `src/components/shared/form-checkbox-group.tsx` · **Client component**

## Import

```tsx
import { FormCheckboxGroup } from "@/components/shared/form-checkbox-group";
```

## Exports

### `FormCheckboxGroup` — component

Any number of a set, stored as an array of values.

`data-slot="checkbox-group"` on the group is what the Field docs ask for —
it is the hook the stylesheet uses for the tighter spacing checkboxes want.

```ts
FormCheckboxGroup<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> & { options: ChoiceOption[] })
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="checkbox-group"]`.

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/shared/form-radio-group`, `@/components/ui/checkbox`, `@/components/ui/field`

## Used by

[examples/account-settings](../examples/account-settings.md)
