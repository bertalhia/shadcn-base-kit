# Select

<!-- notes -->
The custom dropdown, for options that need more than a line of text. For a plain list, `native-select` is the better phone experience. In a form, `FormSelect`. `aria-invalid` goes on the trigger, which is what a person focuses.
<!-- /notes -->

**Source** `src/components/ui/select.tsx` · **Upstream** [select.md](https://ui.shadcn.com/docs/components/base/select.md) · **Client component**

## Import

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
```

## Exports

### `Select` — const

```ts
const Select
```

### `SelectContent` — component

```ts
SelectContent(props: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >)
```

### `SelectGroup` — component

```ts
SelectGroup(props: SelectPrimitive.Group.Props)
```

### `SelectItem` — component

```ts
SelectItem(props: SelectPrimitive.Item.Props)
```

### `SelectLabel` — component

```ts
SelectLabel(props: SelectPrimitive.GroupLabel.Props)
```

### `SelectScrollDownButton` — component

```ts
SelectScrollDownButton(props: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>)
```

### `SelectScrollUpButton` — component

```ts
SelectScrollUpButton(props: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>)
```

### `SelectSeparator` — component

```ts
SelectSeparator(props: SelectPrimitive.Separator.Props)
```

### `SelectTrigger` — component

```ts
SelectTrigger(props: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default";
})
```

### `SelectValue` — component

```ts
SelectValue(props: SelectPrimitive.Value.Props)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="select-content"]`, `[data-slot="select-group"]`, `[data-slot="select-item"]`, `[data-slot="select-label"]`, `[data-slot="select-scroll-down-button"]`, `[data-slot="select-scroll-up-button"]`, `[data-slot="select-separator"]`, `[data-slot="select-trigger"]`, `[data-slot="select-value"]`.

## Depends on

- Packages: `@base-ui/react/select`, `cn`, `lucide-react`, `react`

## Used by

[examples/bug-report-form](../examples/bug-report-form.md), [shared/form-select](../shared/form-select.md), [shared/menu-section](../shared/menu-section.md), [ui/data-table](../ui/data-table.md)
