"use client";

import {
  CopyIcon,
  HeartIcon,
  PackageIcon,
  ShareIcon,
  StarIcon,
  TrashIcon,
} from "lucide-react";

import { Section } from "@/components/shared/section";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { notify } from "@/lib/notify";
import { formatCents } from "@/utils/number";

const products = [
  {
    id: "kbd",
    name: "Mechanical keyboard",
    detail: "Tactile, 75%",
    cents: 18900,
    stock: 12,
    rating: 4.8,
  },
  {
    id: "mse",
    name: "Vertical mouse",
    detail: "Wireless, medium",
    cents: 8900,
    stock: 4,
    rating: 4.4,
  },
  {
    id: "mat",
    name: "Desk mat",
    detail: "Large, felt",
    cents: 4500,
    stock: 0,
    rating: 4.6,
  },
  {
    id: "cbl",
    name: "Braided cable",
    detail: "USB-C, 2 m",
    cents: 2400,
    stock: 87,
    rating: 4.9,
  },
  {
    id: "hub",
    name: "Seven-port hub",
    detail: "Aluminium",
    cents: 12900,
    stock: 23,
    rating: 4.2,
  },
];

/**
 * A product shelf.
 *
 * Right-clicking a card opens the same actions the row offers, which is the
 * point of `ContextMenu` — it does not replace visible controls, it shortcuts
 * them. The last slide is a skeleton, standing in for a page still loading.
 */
export function ProductGallery() {
  return (
    <Section
      title="Featured stock"
      description="Right-click a card for the quick actions."
    >
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <ContextMenu>
                <ContextMenuTrigger>
                  <div className="flex flex-col gap-3 rounded-xl border p-3">
                    <AspectRatio
                      ratio={4 / 3}
                      className="flex items-center justify-center rounded-lg bg-muted text-muted-foreground"
                    >
                      <PackageIcon className="size-8" />
                    </AspectRatio>

                    <Item size="sm">
                      <ItemContent>
                        <ItemTitle>{product.name}</ItemTitle>
                        <ItemDescription>{product.detail}</ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <HoverCard>
                          <HoverCardTrigger
                            render={
                              <Badge
                                variant={
                                  product.stock === 0
                                    ? "destructive"
                                    : "secondary"
                                }
                              />
                            }
                          >
                            <StarIcon />
                            {product.rating}
                          </HoverCardTrigger>
                          <HoverCardContent className="text-sm">
                            {product.stock === 0
                              ? "Out of stock. Restock arrives Thursday."
                              : `${product.stock} in stock across two warehouses.`}
                          </HoverCardContent>
                        </HoverCard>
                      </ItemActions>
                    </Item>

                    <div className="flex items-center justify-between">
                      <span className="font-medium tabular-nums">
                        {formatCents(product.cents)}
                      </span>
                      <ButtonGroup>
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <Button
                                variant="outline"
                                size="icon-sm"
                                aria-label={`Save ${product.name}`}
                              />
                            }
                          >
                            <HeartIcon />
                          </TooltipTrigger>
                          <TooltipContent>Save for later</TooltipContent>
                        </Tooltip>
                        <ButtonGroupSeparator />
                        <Button
                          size="sm"
                          disabled={product.stock === 0}
                          onClick={() =>
                            notify.success(`${product.name} added.`)
                          }
                        >
                          Add
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                </ContextMenuTrigger>

                <ContextMenuContent>
                  <ContextMenuItem
                    onClick={() => {
                      void navigator.clipboard.writeText(product.id);
                      notify.success("SKU copied.");
                    }}
                  >
                    <CopyIcon />
                    Copy SKU
                    <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <ShareIcon />
                    Share
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive">
                    <TrashIcon />
                    Remove from shelf
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </CarouselItem>
          ))}

          <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
            <div className="flex flex-col gap-3 rounded-xl border p-3">
              <Skeleton className="aspect-4/3 w-full rounded-lg" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Item variant="outline">
        <ItemMedia variant="icon">
          <PackageIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Restock arrives Thursday</ItemTitle>
          <ItemDescription>
            Three of these are below the reorder point.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Review order
          </Button>
        </ItemActions>
      </Item>
    </Section>
  );
}
