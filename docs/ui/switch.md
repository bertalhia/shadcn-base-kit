# Switch

<!-- notes -->
A setting that takes effect immediately, with no Save between. If the change only lands on submit, it is a `checkbox`. Base UI marks it with `data-checked`.
<!-- /notes -->

**Source** `src/components/ui/switch.tsx` · **Upstream** [switch.md](https://ui.shadcn.com/docs/components/base/switch.md) · **Client component**

## Import

```tsx
import { Switch } from "@/components/ui/switch";
```

## Exports

### `Switch` — component

```ts
Switch(props: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default";
})
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="switch"]`, `[data-slot="switch-thumb"]`.

## Depends on

- Packages: `@base-ui/react/switch`, `cn`

## Used by

[examples/feedback-playground](../examples/feedback-playground.md), [shared/form-switch](../shared/form-switch.md)
