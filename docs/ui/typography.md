# Typography

<!-- notes -->
The heading, paragraph and list styles as components, for content this project renders itself. No registry item — it is a composition recipe and the CLI never touches it.
<!-- /notes -->

**Source** `src/components/ui/typography.tsx` · **Upstream** [typography.md](https://ui.shadcn.com/docs/components/base/typography.md)

## Import

```tsx
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyLink,
  TypographyBlockquote,
  TypographyList,
  TypographyOrderedList,
  TypographyInlineCode,
  TypographyTable,
  TypographyTableRow,
  TypographyTableHead,
  TypographyTableCell,
} from "@/components/ui/typography";
```

## Exports

### `TypographyH1` — component

```ts
TypographyH1(props: React.ComponentProps<"h1">)
```

### `TypographyH2` — component

```ts
TypographyH2(props: React.ComponentProps<"h2">)
```

### `TypographyH3` — component

```ts
TypographyH3(props: React.ComponentProps<"h3">)
```

### `TypographyH4` — component

```ts
TypographyH4(props: React.ComponentProps<"h4">)
```

### `TypographyP` — component

```ts
TypographyP(props: React.ComponentProps<"p">)
```

### `TypographyLead` — component

```ts
TypographyLead(props: React.ComponentProps<"p">)
```

### `TypographyLarge` — component

```ts
TypographyLarge(props: React.ComponentProps<"div">)
```

### `TypographySmall` — component

```ts
TypographySmall(props: React.ComponentProps<"small">)
```

### `TypographyMuted` — component

```ts
TypographyMuted(props: React.ComponentProps<"p">)
```

### `TypographyLink` — component

```ts
TypographyLink(props: React.ComponentProps<"a">)
```

### `TypographyBlockquote` — component

```ts
TypographyBlockquote(props: React.ComponentProps<"blockquote">)
```

### `TypographyList` — component

```ts
TypographyList(props: React.ComponentProps<"ul">)
```

### `TypographyOrderedList` — component

```ts
TypographyOrderedList(props: React.ComponentProps<"ol">)
```

### `TypographyInlineCode` — component

```ts
TypographyInlineCode(props: React.ComponentProps<"code">)
```

### `TypographyTable` — component

```ts
TypographyTable(props: React.ComponentProps<"table">)
```

### `TypographyTableRow` — component

```ts
TypographyTableRow(props: React.ComponentProps<"tr">)
```

### `TypographyTableHead` — component

```ts
TypographyTableHead(props: React.ComponentProps<"th">)
```

### `TypographyTableCell` — component

```ts
TypographyTableCell(props: React.ComponentProps<"td">)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="typography-blockquote"]`, `[data-slot="typography-h1"]`, `[data-slot="typography-h2"]`, `[data-slot="typography-h3"]`, `[data-slot="typography-h4"]`, `[data-slot="typography-inline-code"]`, `[data-slot="typography-large"]`, `[data-slot="typography-lead"]`, `[data-slot="typography-link"]`, `[data-slot="typography-list"]`, `[data-slot="typography-muted"]`, `[data-slot="typography-ordered-list"]`, `[data-slot="typography-p"]`, `[data-slot="typography-small"]`, `[data-slot="typography-table"]`, `[data-slot="typography-table-cell"]`, `[data-slot="typography-table-head"]`, `[data-slot="typography-table-row"]`.

## Depends on

- Packages: `cn`

## Used by

[examples/release-notes](../examples/release-notes.md)
