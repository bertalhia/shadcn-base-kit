# Native Select

<!-- notes -->
The browser's own `<select>`. On a phone it opens the platform picker, which is faster and more accessible than any popup. Use `FormNativeSelect` for a plain list of options and keep `Select` for the cases that need custom rows.
<!-- /notes -->

**Source** `src/components/ui/native-select.tsx` · **Upstream** [native-select.md](https://ui.shadcn.com/docs/components/base/native-select.md)

## Import

```tsx
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
```

## Exports

### `NativeSelect` — component

```ts
NativeSelect(props: NativeSelectProps)
```

### `NativeSelectOptGroup` — component

```ts
NativeSelectOptGroup(props: React.ComponentProps<"optgroup">)
```

### `NativeSelectOption` — component

```ts
NativeSelectOption(props: React.ComponentProps<"option">)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="native-select"]`, `[data-slot="native-select-icon"]`, `[data-slot="native-select-optgroup"]`, `[data-slot="native-select-option"]`, `[data-slot="native-select-wrapper"]`.

## Depends on

- Packages: `cn`, `lucide-react`, `react`

## Used by

[shared/form-native-select](../shared/form-native-select.md)
