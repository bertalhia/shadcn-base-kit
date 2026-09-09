# Form Select

<!-- notes -->
A closed list of options.

Base UI drives Select through `value`/`onValueChange`, so the field is wired
by hand rather than spread — and `aria-invalid` belongs on the trigger, which
is the element a person actually focuses.
<!-- /notes -->

**Source** `src/components/shared/form-select.tsx` · **Client component**

## Import

```tsx
import { FormSelect } from "@/components/shared/form-select";
import type { SelectOption } from "@/components/shared/form-select";
```

## Exports

### `SelectOption` — type

```ts
type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
  /**
   * A flag, an avatar, a status dot. Carried on the option rather than passed
   * as a render function so it shows up in the list *and* on the selected
   * value, in every field that takes options, without each call site
   * remembering to do both.
   */
  icon?: React.ReactNode;
}
```

### `FormSelect` — component

A closed list of options.

Base UI drives Select through `value`/`onValueChange`, so the field is wired
by hand rather than spread — and `aria-invalid` belongs on the trigger, which
is the element a person actually focuses.

```ts
FormSelect<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> & {
  options: SelectOption[];
  placeholder?: string;
  triggerClassName?: string;
})
```

## Depends on

- Packages: `react`, `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/ui/select`

## Used by

[shared/form-combobox](../shared/form-combobox.md), [shared/form-native-select](../shared/form-native-select.md), [shared/form-toggle-group](../shared/form-toggle-group.md)
