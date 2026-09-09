# Page Header

<!-- notes -->
The top of a screen: where you are, and what you can do from here.

`breadcrumb` and `actions` are slots rather than props so a page composes its
own, instead of this growing a config object.
<!-- /notes -->

**Source** `src/components/shared/page-header.tsx`

## Import

```tsx
import { PageHeader } from "@/components/shared/page-header";
```

## Exports

### `PageHeader` — component

The top of a screen: where you are, and what you can do from here.

`breadcrumb` and `actions` are slots rather than props so a page composes its
own, instead of this growing a config object.

```ts
PageHeader(props: {
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
})
```

## Depends on

- Packages: `cn`, `react`
- In this project: `@/components/ui/separator`
