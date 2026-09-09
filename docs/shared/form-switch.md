# Form Switch

<!-- notes -->
A setting that takes effect as it is flipped.

Use a switch for state, a checkbox for a choice being collected — a switch
that only takes effect on submit reads as a lie.
<!-- /notes -->

**Source** `src/components/shared/form-switch.tsx` · **Client component**

## Import

```tsx
import { FormSwitch } from "@/components/shared/form-switch";
```

## Exports

### `FormSwitch` — component

A setting that takes effect as it is flipped.

Use a switch for state, a checkbox for a choice being collected — a switch
that only takes effect on submit reads as a lie.

```ts
FormSwitch<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName>)
```

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/ui/field`, `@/components/ui/switch`

## Used by

[examples/account-settings](../examples/account-settings.md)
