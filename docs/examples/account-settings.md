# Account Settings

<!-- notes -->
A long settings form split across tabs, with the active tab in the URL. The one to read for how many field types coexist on one screen: text, textarea, combobox, file, OTP, password, switch, slider, checkbox group and toggle group, all under a single `useZodForm`.
<!-- /notes -->

**Source** `src/components/examples/account-settings.tsx` · **Client component**

## Import

```tsx
import { AccountSettings } from "@/components/examples/account-settings";
```

## Exports

### `AccountSettings` — component

Account settings across three tabs, each its own form.

Separate forms rather than one giant object: a person changing their
timezone should not have to re-enter a password, and each tab can be saved
on its own.

```ts
AccountSettings()
```

## Depends on

- Packages: `lucide-react`, `zod`
- In this project: `@/components/shared/confirm-dialog`, `@/components/shared/form`, `@/components/shared/form-actions`, `@/components/shared/form-checkbox-group`, `@/components/shared/form-combobox`, `@/components/shared/form-file-input`, `@/components/shared/form-input`, `@/components/shared/form-otp`, `@/components/shared/form-password-input`, `@/components/shared/form-slider`, `@/components/shared/form-switch`, `@/components/shared/form-textarea`, `@/components/shared/form-toggle-group`, `@/components/shared/query-tabs`, `@/components/shared/section`, `@/components/shared/submit-button`, `@/components/ui/avatar`, `@/components/ui/button`, `@/components/ui/card`, `@/components/ui/kbd`, `@/components/ui/label`, `@/components/ui/separator`, `@/components/ui/tabs`, `@/components/ui/toggle`, `@/components/ui/tooltip`, `@/lib/notify`, `@/schemas/fields`
