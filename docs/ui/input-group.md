# Input Group

<!-- notes -->
An input with things welded to it: an icon, a prefix, a button, a unit. `InputGroupInput` and `InputGroupTextarea` are the versions that know they are inside the group.
<!-- /notes -->

**Source** `src/components/ui/input-group.tsx` · **Upstream** [input-group.md](https://ui.shadcn.com/docs/components/base/input-group.md) · **Client component**

## Import

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
```

## Exports

### `InputGroup` — component

```ts
InputGroup(props: React.ComponentProps<"div">)
```

### `InputGroupAddon` — component

```ts
InputGroupAddon(props: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>)
```

### `InputGroupButton` — component

```ts
InputGroupButton(props: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset";
  })
```

### `InputGroupText` — component

```ts
InputGroupText(props: React.ComponentProps<"span">)
```

### `InputGroupInput` — component

```ts
InputGroupInput(props: React.ComponentProps<"input">)
```

### `InputGroupTextarea` — component

```ts
InputGroupTextarea(props: React.ComponentProps<"textarea">)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="input-group"]`, `[data-slot="input-group-addon"]`, `[data-slot="input-group-control"]`.

## Depends on

- Packages: `class-variance-authority`, `cn`, `react`
- In this project: `@/components/ui/button`, `@/components/ui/input`, `@/components/ui/textarea`

## Used by

[examples/support-chat](../examples/support-chat.md), [shared/currency-input](../shared/currency-input.md), [shared/form-combobox](../shared/form-combobox.md), [shared/password-input](../shared/password-input.md), [shared/search-input](../shared/search-input.md), [ui/combobox](../ui/combobox.md), [ui/command](../ui/command.md), [ui/date-picker](../ui/date-picker.md)
