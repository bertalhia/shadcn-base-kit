# Combobox

<!-- notes -->
A select you can type into, with filtering and multi-select through `ComboboxChips`. In a form use `FormCombobox`. `useComboboxAnchor` is what pins the popup to something other than the input.
<!-- /notes -->

**Source** `src/components/ui/combobox.tsx` · **Upstream** [combobox.md](https://ui.shadcn.com/docs/components/base/combobox.md) · **Client component**

## Import

```tsx
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
```

## Exports

### `Combobox` — const

```ts
const Combobox
```

### `ComboboxInput` — component

```ts
ComboboxInput(props: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
})
```

### `ComboboxContent` — component

```ts
ComboboxContent(props: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >)
```

### `ComboboxList` — component

```ts
ComboboxList(props: ComboboxPrimitive.List.Props)
```

### `ComboboxItem` — component

```ts
ComboboxItem(props: ComboboxPrimitive.Item.Props)
```

### `ComboboxGroup` — component

```ts
ComboboxGroup(props: ComboboxPrimitive.Group.Props)
```

### `ComboboxLabel` — component

```ts
ComboboxLabel(props: ComboboxPrimitive.GroupLabel.Props)
```

### `ComboboxCollection` — component

```ts
ComboboxCollection(props: ComboboxPrimitive.Collection.Props)
```

### `ComboboxEmpty` — component

```ts
ComboboxEmpty(props: ComboboxPrimitive.Empty.Props)
```

### `ComboboxSeparator` — component

```ts
ComboboxSeparator(props: ComboboxPrimitive.Separator.Props)
```

### `ComboboxChips` — component

```ts
ComboboxChips(props: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props)
```

### `ComboboxChip` — component

```ts
ComboboxChip(props: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
})
```

### `ComboboxChipsInput` — component

```ts
ComboboxChipsInput(props: ComboboxPrimitive.Input.Props)
```

### `ComboboxTrigger` — component

```ts
ComboboxTrigger(props: ComboboxPrimitive.Trigger.Props)
```

### `ComboboxValue` — component

```ts
ComboboxValue(props: ComboboxPrimitive.Value.Props)
```

### `useComboboxAnchor` — function

```ts
useComboboxAnchor()
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="combobox-chip"]`, `[data-slot="combobox-chip-input"]`, `[data-slot="combobox-chip-remove"]`, `[data-slot="combobox-chips"]`, `[data-slot="combobox-clear"]`, `[data-slot="combobox-collection"]`, `[data-slot="combobox-content"]`, `[data-slot="combobox-empty"]`, `[data-slot="combobox-group"]`, `[data-slot="combobox-item"]`, `[data-slot="combobox-label"]`, `[data-slot="combobox-list"]`, `[data-slot="combobox-separator"]`, `[data-slot="combobox-trigger"]`, `[data-slot="combobox-value"]`, `[data-slot="input-group-button"]`.

## Depends on

- Packages: `@base-ui/react`, `cn`, `lucide-react`, `react`
- In this project: `@/components/ui/button`, `@/components/ui/input-group`

## Used by

[shared/form-combobox](../shared/form-combobox.md)
