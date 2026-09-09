# Toast

<!-- notes -->
The transient message, bottom of the screen. `sonner` is gone from `base-rhea` and this replaced it. Do not import the manager here — `lib/notify.ts` owns the singleton, and every screen calls that.
<!-- /notes -->

**Source** `src/components/ui/toast.tsx` · **Upstream** [toast.md](https://ui.shadcn.com/docs/components/base/toast.md) · **Client component**

## Import

```tsx
import {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
} from "@/components/ui/toast";
```

## Exports

### `Toaster` — component

```ts
Toaster(props: ToastPrimitive.Provider.Props)
```

### `Toast` — component

```ts
Toast(props: ToastPrimitive.Root.Props)
```

### `ToastAction` — component

```ts
ToastAction(props: ToastPrimitive.Action.Props)
```

### `ToastClose` — component

```ts
ToastClose(props: ToastPrimitive.Close.Props)
```

### `ToastContent` — component

```ts
ToastContent(props: ToastPrimitive.Content.Props)
```

### `ToastDescription` — component

```ts
ToastDescription(props: ToastPrimitive.Description.Props)
```

### `ToastPortal` — component

```ts
ToastPortal(props: ToastPrimitive.Portal.Props)
```

### `ToastProvider` — component

```ts
ToastProvider(props: ToastPrimitive.Provider.Props)
```

### `ToastTitle` — component

```ts
ToastTitle(props: ToastPrimitive.Title.Props)
```

### `ToastViewport` — component

```ts
ToastViewport(props: ToastPrimitive.Viewport.Props)
```

### `createToastManager` — const

```ts
const createToastManager
```

### `toast` — const

```ts
const toast
```

### `useToastManager` — const

```ts
const useToastManager
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="toast"]`, `[data-slot="toast-action"]`, `[data-slot="toast-close"]`, `[data-slot="toast-content"]`, `[data-slot="toast-description"]`, `[data-slot="toast-icon"]`, `[data-slot="toast-portal"]`, `[data-slot="toast-title"]`, `[data-slot="toast-viewport"]`.

## Depends on

- Packages: `@base-ui/react/toast`, `cn`, `lucide-react`, `react`
- In this project: `@/components/ui/button`

## Used by

[lib/notify](../lib/notify.md)
