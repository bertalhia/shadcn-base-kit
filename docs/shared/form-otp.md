# Form OTP

<!-- notes -->
A one-time code.

`groups` splits the slots visually — `[3, 3]` renders two blocks of three
with a separator, which is how most codes arrive in a message.
<!-- /notes -->

**Source** `src/components/shared/form-otp.tsx` · **Client component**

## Import

```tsx
import { FormOtp } from "@/components/shared/form-otp";
```

## Exports

### `FormOtp` — component

A one-time code.

`groups` splits the slots visually — `[3, 3]` renders two blocks of three
with a separator, which is how most codes arrive in a message.

```ts
FormOtp<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> &
  Omit<
    React.ComponentProps<typeof InputOTP>,
    "value" | "onChange" | "maxLength" | "children" | "render" | "name"
  > & {
    length?: number;
    groups?: number[];
  })
```

## Depends on

- Packages: `react`, `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/ui/input-otp`

## Used by

[examples/account-settings](../examples/account-settings.md)
