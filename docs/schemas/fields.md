# Fields

<!-- notes -->
Zod schemas that already know how our masked inputs store their values, so a
form never re-states the same rule. Each one strips the mask before checking,
and transforms to the shape an API should receive.
<!-- /notes -->

**Source** `src/schemas/fields.ts`

## Import

```tsx
import {
  phoneSchema,
  optionalPhoneSchema,
  documentSchema,
  cepSchema,
  emailSchema,
  passwordSchema,
  currencySchema,
  matches,
} from "@/schemas/fields";
```

## Exports

### `phoneSchema` — const

Zod schemas that already know how our masked inputs store their values, so a
form never re-states the same rule. Each one strips the mask before checking,
and transforms to the shape an API should receive.

```ts
const phoneSchema
```

### `optionalPhoneSchema` — const

```ts
const optionalPhoneSchema
```

### `documentSchema` — const

```ts
const documentSchema
```

### `cepSchema` — const

```ts
const cepSchema
```

### `emailSchema` — const

```ts
const emailSchema
```

### `passwordSchema` — const

Rules a person cannot guess belong in the message; the length one earns its
place because the form would otherwise reject a submission with no warning.

```ts
const passwordSchema
```

### `currencySchema` — const

```ts
const currencySchema
```

### `matches` — function

Confirms a second field matches the first, e.g. a repeated password.

```ts
matches<T extends z.ZodTypeAny>(schema: T, field: string, message: string)
```

## Depends on

- Packages: `zod`
- In this project: `@/lib/document`, `@/lib/phone`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/checkout-form](../examples/checkout-form.md)
