# Masked Input

<!-- notes -->
A text input that formats as you type against a pattern.

The mask is presentation: `onValueChange` hands back both the formatted
string and the raw characters, so a caller stores whichever it needs instead
of unmasking by hand.
<!-- /notes -->

**Source** `src/components/shared/masked-input.tsx` · **Client component**

## Import

```tsx
import { MaskedInput } from "@/components/shared/masked-input";
```

## Exports

### `MaskedInput` — component

A text input that formats as you type against a pattern.

The mask is presentation: `onValueChange` hands back both the formatted
string and the raw characters, so a caller stores whichever it needs instead
of unmasking by hand.

```ts
MaskedInput(props: Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> & {
  pattern: string;
  value: string;
  onValueChange: (formatted: string, raw: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
})
```

## Depends on

- Packages: `react`
- In this project: `@/components/ui/input`, `@/utils/mask`
