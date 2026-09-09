# Form Actions

<!-- notes -->
The row a form ends on.

The primary action sits first in the DOM so it is the first thing reached by
keyboard and by a screen reader; `flex-row-reverse` puts it on the right for
everyone else.
<!-- /notes -->

**Source** `src/components/shared/form-actions.tsx` · **Client component**

## Import

```tsx
import { FormActions } from "@/components/shared/form-actions";
```

## Exports

### `FormActions` — component

The row a form ends on.

The primary action sits first in the DOM so it is the first thing reached by
keyboard and by a screen reader; `flex-row-reverse` puts it on the right for
everyone else.

```ts
FormActions(props: React.ComponentProps<typeof Field>)
```

## Depends on

- Packages: `cn`
- In this project: `@/components/ui/field`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/checkout-form](../examples/checkout-form.md)
