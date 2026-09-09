# Document Input

<!-- notes -->
CPF or CNPJ in one field. With `kind="auto"` the mask widens from CPF to CNPJ once the value passes eleven characters, so a form that takes either does not make the person choose first. CNPJ carries letters in its first twelve positions under RFB technical note 49/2024, which is why this cannot be a digits-only mask.
<!-- /notes -->

**Source** `src/components/shared/document-input.tsx` · **Client component**

## Import

```tsx
import { DocumentInput } from "@/components/shared/document-input";
```

## Exports

### `DocumentInput` — component

```ts
DocumentInput(props: Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> & {
  value: string;
  onValueChange: (formatted: string, raw: string) => void;
  kind?: DocumentKind | "auto";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
})
```

## Depends on

- Packages: `react`
- In this project: `@/components/ui/input`, `@/lib/document`

## Used by

[shared/form-document-input](../shared/form-document-input.md)
