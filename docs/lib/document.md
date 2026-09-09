# Document

<!-- notes -->
CPF and CNPJ: the masks, the validation and the stripping. CNPJ takes letters in its first twelve positions under RFB technical note 49/2024, so a digits-only mask is wrong from July 2026 on.
<!-- /notes -->

**Source** `src/lib/document.ts`

## Import

```tsx
import {
  CPF_PATTERN,
  CNPJ_PATTERN,
  stripDocument,
  formatCpf,
  formatCnpj,
  documentKind,
  formatDocument,
  isValidCpf,
  isValidCnpj,
  isValidDocument,
  displayDocument,
  stripCpf,
  stripCnpj,
} from "@/lib/document";
import type { DocumentKind } from "@/lib/document";
```

## Exports

### `CPF_PATTERN` — const

```ts
const CPF_PATTERN
```

### `CNPJ_PATTERN` — const

CNPJ takes letters in the first twelve positions since RFB technical note
49/2024; only the two check digits stay numeric. `*` accepts both, which
covers the legacy all-numeric format and the alphanumeric one.

```ts
const CNPJ_PATTERN
```

### `DocumentKind` — type

```ts
type DocumentKind = "cpf" | "cnpj"
```

### `stripDocument` — function

Uppercase, and nothing but the characters a document can hold.

```ts
stripDocument(value: string)
```

### `formatCpf` — function

```ts
formatCpf(value: string)
```

### `formatCnpj` — function

```ts
formatCnpj(value: string)
```

### `documentKind` — function

A CPF is eleven digits; a CNPJ is fourteen characters and may contain
letters. So a letter settles it on its own — waiting for the twelfth
character would mean masking `12ABC…` as a CPF and dropping the letters,
which is what a length-only rule does.

```ts
documentKind(value: string): DocumentKind
```

### `formatDocument` — function

Widens from CPF to CNPJ as soon as the value can only be a CNPJ.

```ts
formatDocument(value: string)
```

### `isValidCpf` — function

```ts
isValidCpf(value: string)
```

### `isValidCnpj` — function

```ts
isValidCnpj(value: string)
```

### `isValidDocument` — function

Accepts either, picking the algorithm by length.

```ts
isValidDocument(value: string)
```

### `displayDocument` — function

Formats a stored value for display, whichever kind it turns out to be.

```ts
displayDocument(value: string)
```

### `stripCpf` — function

```ts
stripCpf(value: string)
```

### `stripCnpj` — function

```ts
stripCnpj(value: string)
```

## Depends on

- Packages: `cpf-cnpj-validator`
- In this project: `@/utils/mask`

## Used by

[schemas/fields](../schemas/fields.md), [shared/document-input](../shared/document-input.md)
