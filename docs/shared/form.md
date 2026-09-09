# Form

<!-- notes -->
The one way a form is set up here: a Zod schema in, a typed form out.

Wrapping `useForm` keeps the resolver, the inferred types and the validation
mode in one place, so no form re-decides them.
<!-- /notes -->

**Source** `src/components/shared/form.tsx` · **Client component**

## Import

```tsx
import { useZodForm, Form, FormSection } from "@/components/shared/form";
import type { ZodForm } from "@/components/shared/form";
```

## Exports

### `useZodForm` — function

The one way a form is set up here: a Zod schema in, a typed form out.

Wrapping `useForm` keeps the resolver, the inferred types and the validation
mode in one place, so no form re-decides them.

```ts
useZodForm<TInput extends FieldValues, TOutput>(schema: z.ZodType<TOutput, TInput>, options: Omit<UseFormProps<TInput, undefined, TOutput>, "resolver"> & {
    defaultValues?: DefaultValues<TInput>;
  })
```

### `ZodForm` — type

The form `useZodForm` returns for a given schema.

```ts
type ZodForm<TSchema extends z.ZodType<unknown, FieldValues>> = UseFormReturn<z.input<TSchema>, undefined, z.output<TSchema>>
```

### `Form` — component

Wires the form element to React Hook Form and puts the context in place, so
fields deeper in the tree reach the form without prop drilling.

```ts
Form<TInput extends FieldValues, TOutput>(props: Omit<React.ComponentProps<"form">, "onSubmit"> & {
  form: UseFormReturn<TInput, undefined, TOutput>;
  onSubmit: SubmitHandler<TOutput>;
})
```

### `FormSection` — component

Groups fields with the spacing the design system expects.

```ts
FormSection(props: React.ComponentProps<typeof FieldGroup>)
```

## Depends on

- Packages: `@hookform/resolvers/zod`, `cn`, `react`, `react-hook-form`, `zod`
- In this project: `@/components/ui/field`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/checkout-form](../examples/checkout-form.md)
