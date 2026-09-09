# Form Combobox

<!-- notes -->
A long list you search rather than scroll.

Past a couple of dozen options a Select turns into a scavenger hunt; this
filters as you type. `items` feeds the primitive's own filtering, so the list
is not re-implemented here.
<!-- /notes -->

**Source** `src/components/shared/form-combobox.tsx` · **Client component**

## Import

```tsx
import { FormCombobox } from "@/components/shared/form-combobox";
```

## Exports

### `FormCombobox` — component

A long list you search rather than scroll.

Past a couple of dozen options a Select turns into a scavenger hunt; this
filters as you type. `items` feeds the primitive's own filtering, so the list
is not re-implemented here.

```ts
FormCombobox<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> & {
  options: SelectOption[];
  placeholder?: string;
  emptyMessage?: string;
})
```

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/shared/form-select`, `@/components/ui/combobox`, `@/components/ui/input-group`

## Used by

[examples/account-settings](../examples/account-settings.md), [shared/form-address-fields](../shared/form-address-fields.md)
