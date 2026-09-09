# Use Media Query

<!-- notes -->
Tracks a CSS media query from React.

`useIsMobile` answers one fixed question; this answers any of them, which is
what a layout needs when the breakpoint that matters is not the phone one —
a side-by-side split can be wrong at 800px for reasons that have nothing to
do with touch.

Starts `false` on the server and settles after mount, so anything rendered
from it must be acceptable in the narrow state first.
<!-- /notes -->

**Source** `src/hooks/use-media-query.ts` · **Client component**

## Import

```tsx
import { useMediaQuery } from "@/hooks/use-media-query";
```

## Exports

### `useMediaQuery` — function

Tracks a CSS media query from React.

`useIsMobile` answers one fixed question; this answers any of them, which is
what a layout needs when the breakpoint that matters is not the phone one —
a side-by-side split can be wrong at 800px for reasons that have nothing to
do with touch.

Starts `false` on the server and settles after mount, so anything rendered
from it must be acceptable in the narrow state first.

```ts
useMediaQuery(query: string)
```

## Depends on

- Packages: `react`

## Used by

[examples/revenue-dashboard](../examples/revenue-dashboard.md)
