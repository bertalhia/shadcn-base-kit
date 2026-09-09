# Mask

<!-- notes -->
Drops everything the pattern would have inserted, leaving typed content.
<!-- /notes -->

**Source** `src/utils/mask.ts`

## Import

```tsx
import {
  isPlaceholder,
  stripMask,
  applyMask,
  maskCapacity,
} from "@/utils/mask";
```

## Exports

### `isPlaceholder` — function

```ts
isPlaceholder(char: string)
```

### `stripMask` — function

Drops everything the pattern would have inserted, leaving typed content.

```ts
stripMask(value: string, pattern: string)
```

### `applyMask` — function

Formats as far as the input allows, and stops at the first character that
does not fit — so a half-typed value stays readable while it is typed.

```ts
applyMask(value: string, pattern: string)
```

### `maskCapacity` — function

Longest raw value a pattern can hold, for `maxLength` on the input.

```ts
maskCapacity(pattern: string)
```

## Used by

[lib/document](../lib/document.md), [shared/masked-input](../shared/masked-input.md)
