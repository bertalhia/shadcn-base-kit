# Phone Input

<!-- notes -->
Phone input driven by libphonenumber-js rather than a pattern.

Numbering plans differ per country and change over time; `AsYouType` already
knows them, so there is no mask here to fall behind.
<!-- /notes -->

**Source** `src/components/shared/phone-input.tsx` · **Client component**

## Import

```tsx
import { PhoneInput } from "@/components/shared/phone-input";
```

## Exports

### `PhoneInput` — component

Phone input driven by libphonenumber-js rather than a pattern.

Numbering plans differ per country and change over time; `AsYouType` already
knows them, so there is no mask here to fall behind.

```ts
PhoneInput(props: Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> & {
  value: string;
  onValueChange: (formatted: string, raw: string) => void;
  country?: CountryCode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
})
```

## Depends on

- Packages: `libphonenumber-js`, `react`
- In this project: `@/components/ui/input`, `@/lib/phone`

## Used by

[shared/form-phone-input](../shared/form-phone-input.md)
