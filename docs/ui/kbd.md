# Kbd

<!-- notes -->
A key as it is printed on a keyboard. `KbdGroup` joins a chord. It is decoration for people with keyboards — it earns no space on a phone.
<!-- /notes -->

**Source** `src/components/ui/kbd.tsx` · **Upstream** [kbd.md](https://ui.shadcn.com/docs/components/base/kbd.md)

## Import

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd";
```

## Exports

### `Kbd` — component

```ts
Kbd(props: React.ComponentProps<"kbd">)
```

### `KbdGroup` — component

```ts
KbdGroup(props: React.ComponentProps<"div">)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="kbd"]`, `[data-slot="kbd-group"]`.

## Depends on

- Packages: `cn`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/feedback-playground](../examples/feedback-playground.md), [examples/site-header](../examples/site-header.md)
