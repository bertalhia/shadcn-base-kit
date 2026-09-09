# Slider

<!-- notes -->
A number picked by dragging. In a form, `FormSlider`. Give it a visible value nearby: a thumb hides the exact number under the finger.
<!-- /notes -->

**Source** `src/components/ui/slider.tsx` · **Upstream** [slider.md](https://ui.shadcn.com/docs/components/base/slider.md)

## Import

```tsx
import { Slider } from "@/components/ui/slider";
```

## Exports

### `Slider` — component

```ts
Slider(props: SliderPrimitive.Root.Props)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="slider"]`, `[data-slot="slider-range"]`, `[data-slot="slider-thumb"]`, `[data-slot="slider-track"]`.

## Depends on

- Packages: `@base-ui/react/slider`, `cn`

## Used by

[shared/form-slider](../shared/form-slider.md)
