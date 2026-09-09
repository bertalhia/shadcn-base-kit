# Carousel

<!-- notes -->
A horizontal track that scrolls one item at a time, on Embla. Every slide has to be reachable without the arrows, because on a phone they are the first thing to go.
<!-- /notes -->

**Source** `src/components/ui/carousel.tsx` · **Upstream** [carousel.md](https://ui.shadcn.com/docs/components/base/carousel.md) · **Client component**

## Import

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
```

## Exports

### `CarouselApi` — type

```ts
type CarouselApi = UseEmblaCarouselType[1]
```

### `Carousel` — component

```ts
Carousel(props: React.ComponentProps<"div"> & CarouselProps)
```

### `CarouselContent` — component

```ts
CarouselContent(props: React.ComponentProps<"div">)
```

### `CarouselItem` — component

```ts
CarouselItem(props: React.ComponentProps<"div">)
```

### `CarouselPrevious` — component

```ts
CarouselPrevious(props: React.ComponentProps<typeof Button>)
```

### `CarouselNext` — component

```ts
CarouselNext(props: React.ComponentProps<typeof Button>)
```

### `useCarousel` — function

```ts
useCarousel()
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="carousel"]`, `[data-slot="carousel-content"]`, `[data-slot="carousel-item"]`, `[data-slot="carousel-next"]`, `[data-slot="carousel-previous"]`.

## Depends on

- Packages: `cn`, `embla-carousel-react`, `lucide-react`, `react`
- In this project: `@/components/ui/button`

## Used by

[examples/product-gallery](../examples/product-gallery.md)
