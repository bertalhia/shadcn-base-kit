# Form File Input

<!-- notes -->
Files, listed as they are picked.

The native file input is hidden behind a button because it cannot be styled
and its "no file chosen" text is noise; the chosen files are shown as
attachments instead, each one removable.
<!-- /notes -->

**Source** `src/components/shared/form-file-input.tsx` · **Client component**

## Import

```tsx
import { FormFileInput } from "@/components/shared/form-file-input";
```

## Exports

### `FormFileInput` — component

Files, listed as they are picked.

The native file input is hidden behind a button because it cannot be styled
and its "no file chosen" text is noise; the chosen files are shown as
attachments instead, each one removable.

```ts
FormFileInput<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> & {
  accept?: string;
  multiple?: boolean;
  buttonLabel?: string;
})
```

## Depends on

- Packages: `lucide-react`, `react`, `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/ui/attachment`, `@/components/ui/button`, `@/utils/number`

## Used by

[examples/account-settings](../examples/account-settings.md)
