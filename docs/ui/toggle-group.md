# Toggle Group

<!-- notes -->
A row of toggles acting as one control — single or multiple. In a form, `FormToggleGroup`.
<!-- /notes -->

**Source** `src/components/ui/toggle-group.tsx` · **Upstream** [toggle-group.md](https://ui.shadcn.com/docs/components/base/toggle-group.md) · **Client component**

## Import

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
```

## Exports

### `ToggleGroup` — component

```ts
ToggleGroup(props: ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
  })
```

### `ToggleGroupItem` — component

```ts
ToggleGroupItem(props: TogglePrimitive.Props & VariantProps<typeof toggleVariants>)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="toggle-group"]`, `[data-slot="toggle-group-item"]`.

## Depends on

- Packages: `@base-ui/react/toggle`, `@base-ui/react/toggle-group`, `class-variance-authority`, `cn`, `react`
- In this project: `@/components/ui/toggle`

## Used by

[shared/form-toggle-group](../shared/form-toggle-group.md)
