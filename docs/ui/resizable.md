# Resizable

<!-- notes -->
Draggable splits, on `react-resizable-panels`. Give every panel a `minSize` or a drag can hide one with nothing left to grab — and below `md` drop the split entirely: a drag target is an affordance no thumb can use.
<!-- /notes -->

**Source** `src/components/ui/resizable.tsx` · **Upstream** [resizable.md](https://ui.shadcn.com/docs/components/base/resizable.md) · **Client component**

## Import

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
```

## Exports

### `ResizableHandle` — component

```ts
ResizableHandle(props: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean;
})
```

### `ResizablePanel` — component

```ts
ResizablePanel(props: ResizablePrimitive.PanelProps)
```

### `ResizablePanelGroup` — component

```ts
ResizablePanelGroup(props: ResizablePrimitive.GroupProps)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="resizable-handle"]`, `[data-slot="resizable-panel"]`, `[data-slot="resizable-panel-group"]`.

## Depends on

- Packages: `cn`, `react-resizable-panels`

## Used by

[examples/revenue-dashboard](../examples/revenue-dashboard.md)
