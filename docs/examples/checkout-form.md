# Checkout Form

<!-- notes -->
The biggest form here: sections, an address chain that reloads states and cities as the country changes, CPF/CNPJ, phone, and a progress bar over the whole thing. Read it before building anything multi-step.
<!-- /notes -->

**Source** `src/components/examples/checkout-form.tsx` · **Client component**

## Import

```tsx
import { CheckoutForm } from "@/components/examples/checkout-form";
```

## Exports

### `CheckoutForm` — component

Checkout: the long form, end to end.

Everything a real one has to handle at once — a document that switches
between CPF and CNPJ, a phone formatted per country, addresses, a shipping
choice as cards, and a terms box that blocks submission.

```ts
CheckoutForm()
```

## Depends on

- Packages: `lucide-react`, `zod`
- In this project: `@/components/shared/form`, `@/components/shared/form-actions`, `@/components/shared/form-address-fields`, `@/components/shared/form-checkbox`, `@/components/shared/form-document-input`, `@/components/shared/form-input`, `@/components/shared/form-phone-input`, `@/components/shared/form-radio-group`, `@/components/shared/form-textarea`, `@/components/shared/section`, `@/components/shared/submit-button`, `@/components/ui/accordion`, `@/components/ui/alert`, `@/components/ui/badge`, `@/components/ui/button`, `@/components/ui/card`, `@/components/ui/field`, `@/components/ui/item`, `@/components/ui/progress`, `@/components/ui/separator`, `@/lib/notify`, `@/schemas/fields`, `@/utils/number`
