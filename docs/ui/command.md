# Command

<!-- notes -->
The ⌘K palette, on cmdk. `CommandDialog` is the same list inside a dialog. The keyboard hint in `CommandShortcut` is for people with keyboards — drop it on a phone rather than letting the row overflow.
<!-- /notes -->

**Source** `src/components/ui/command.tsx` · **Upstream** [command.md](https://ui.shadcn.com/docs/components/base/command.md) · **Client component**

## Import

```tsx
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command";
```

## Exports

### `Command` — component

```ts
Command(props: React.ComponentProps<typeof CommandPrimitive>)
```

### `CommandDialog` — component

```ts
CommandDialog(props: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  children: React.ReactNode;
})
```

### `CommandInput` — component

```ts
CommandInput(props: React.ComponentProps<typeof CommandPrimitive.Input>)
```

### `CommandList` — component

```ts
CommandList(props: React.ComponentProps<typeof CommandPrimitive.List>)
```

### `CommandEmpty` — component

```ts
CommandEmpty(props: React.ComponentProps<typeof CommandPrimitive.Empty>)
```

### `CommandGroup` — component

```ts
CommandGroup(props: React.ComponentProps<typeof CommandPrimitive.Group>)
```

### `CommandItem` — component

```ts
CommandItem(props: React.ComponentProps<typeof CommandPrimitive.Item>)
```

### `CommandShortcut` — component

```ts
CommandShortcut(props: React.ComponentProps<"span">)
```

### `CommandSeparator` — component

```ts
CommandSeparator(props: React.ComponentProps<typeof CommandPrimitive.Separator>)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="command"]`, `[data-slot="command-empty"]`, `[data-slot="command-group"]`, `[data-slot="command-input"]`, `[data-slot="command-input-wrapper"]`, `[data-slot="command-item"]`, `[data-slot="command-list"]`, `[data-slot="command-separator"]`, `[data-slot="command-shortcut"]`.

## Depends on

- Packages: `cmdk`, `cn`, `lucide-react`, `react`
- In this project: `@/components/ui/dialog`, `@/components/ui/input-group`

## Used by

[examples/site-header](../examples/site-header.md)
