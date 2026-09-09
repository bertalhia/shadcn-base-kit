# Form Field

<!-- notes -->
Every field in this project renders through here.

It owns the four things the shadcn Field docs ask for and that are easy to
get subtly wrong per field: `data-invalid` on the wrapper, `htmlFor` tied to
the control id, the description, and `FieldError` fed from React Hook Form.
A field component only has to render its control.
<!-- /notes -->

**Source** `src/components/shared/form-field.tsx` · **Client component**

## Import

```tsx
import { FormField } from "@/components/shared/form-field";
import type {
  FieldRenderArgs,
  BaseFieldProps,
} from "@/components/shared/form-field";
```

## Exports

### `FieldRenderArgs` — type

Every field in this project renders through here.

It owns the four things the shadcn Field docs ask for and that are easy to
get subtly wrong per field: `data-invalid` on the wrapper, `htmlFor` tied to
the control id, the description, and `FieldError` fed from React Hook Form.
A field component only has to render its control.

```ts
type FieldRenderArgs<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  /** Matches the label's `htmlFor`. Put it on the control. */
  id: string;
  /** Pass straight to the control so assistive tech hears the error. */
  invalid: boolean;
}
```

### `BaseFieldProps` — type

```ts
type BaseFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  control: Control<TFieldValues>;
  name: TName;
  label?: React.ReactNode;
  /**
   * Only worth a line if it says something the label cannot. A rule the person
   * could not guess earns its place; restating the label does not.
   */
  description?: React.ReactNode;
  orientation?: React.ComponentProps<typeof Field>["orientation"];
  className?: string;
}
```

### `FormField` — component

```ts
FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> & {
  children: (args: FieldRenderArgs<TFieldValues, TName>) => React.ReactNode;
})
```

## Depends on

- Packages: `react`, `react-hook-form`
- In this project: `@/components/ui/field`

## Used by

[shared/form-checkbox](../shared/form-checkbox.md), [shared/form-checkbox-group](../shared/form-checkbox-group.md), [shared/form-combobox](../shared/form-combobox.md), [shared/form-currency-input](../shared/form-currency-input.md), [shared/form-date-picker](../shared/form-date-picker.md), [shared/form-date-range-picker](../shared/form-date-range-picker.md), [shared/form-document-input](../shared/form-document-input.md), [shared/form-file-input](../shared/form-file-input.md), and 11 more
