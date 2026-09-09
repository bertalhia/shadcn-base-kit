# Input OTP

<!-- notes -->
The one-box-per-digit code field. In a form, `FormOTP`.
<!-- /notes -->

**Source** `src/components/ui/input-otp.tsx` · **Upstream** [input-otp.md](https://ui.shadcn.com/docs/components/base/input-otp.md) · **Client component**

## Import

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
```

## Exports

### `InputOTP` — component

```ts
InputOTP(props: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
})
```

### `InputOTPGroup` — component

```ts
InputOTPGroup(props: React.ComponentProps<"div">)
```

### `InputOTPSlot` — component

```ts
InputOTPSlot(props: React.ComponentProps<"div"> & {
  index: number;
})
```

### `InputOTPSeparator` — component

```ts
InputOTPSeparator(props: React.ComponentProps<"div">)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="input-otp"]`, `[data-slot="input-otp-group"]`, `[data-slot="input-otp-separator"]`, `[data-slot="input-otp-slot"]`.

## Depends on

- Packages: `cn`, `input-otp`, `lucide-react`, `react`

## Used by

[shared/form-otp](../shared/form-otp.md)
