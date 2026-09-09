# Form Native Select

<!-- notes -->
The platform's own select.

Worth reaching for on long lists and on mobile, where the OS picker beats a
custom popup — and it submits with the form even without JavaScript.
<!-- /notes -->

**Source** `src/components/shared/form-native-select.tsx` · **Client component**

## Import

```tsx
import { FormNativeSelect } from "@/components/shared/form-native-select";
```

## Exports

### `FormNativeSelect` — component

The platform's own select.

Worth reaching for on long lists and on mobile, where the OS picker beats a
custom popup — and it submits with the form even without JavaScript.

```ts
FormNativeSelect<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> & {
  options: SelectOption[];
  placeholder?: string;
})
```

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/shared/form-select`, `@/components/ui/native-select`
