# Responsive, and checked at a phone width

Everything here is built for a phone as well as a desk. **The page never scrolls sideways.** The one exception is a genuinely wide element scrolling inside its own box — a data table.

Validate in the browser before calling anything done. Reading the CSS is not validation: every responsive bug in this project so far looked fine in the source.

## What keeps going wrong

Each of these shipped looking correct at desktop width.

**A row of things that grows.** Nine tabs come to 600px. Wrap it (`flex-wrap`) rather than scroll it — a scrolling strip leaves the last item clipped with nothing to say it is there. Watch for a fixed height on the container: `TabsList` is `h-8` under a `group-data-horizontal` variant, and a plain `h-auto` does not override a variant-scoped class, so the second row spills over whatever is below.

**A trigger sized as a percentage of its parent.** `h-[calc(100%-1px)]` is one row's height until the parent wraps, then every item stretches across both rows and they collide.

**A cluster pinned with `ml-auto`.** It runs past the edge and an ancestor's `overflow-hidden` swallows it, so nothing scrolls and the buttons are simply gone. Let the row wrap, and drop what is optional on a small screen — a keyboard shortcut hint is for people with keyboards.

**A breadcrumb.** The full trail wraps onto three lines. Collapse the ancestors into `BreadcrumbEllipsis` below `sm`.

**A side-by-side split.** Two panels leave about 190px each, which is not a chart any more. Stack them, and drop the resize handle entirely — a drag target is an affordance nobody can use with a thumb. Where a split does survive, give every panel a `minSize`, or a drag can hide one completely with nothing left to grab.

**Anything that only exists on hover or right-click.** There is no hover and no right-click on a touch screen. A `hover-card` or a `context-menu` may add convenience, never the only route to something.

## Checking it

Resizing the browser window does not change `innerWidth` in this automation setup. Load the app in a 390px iframe served from `public/` instead — same-origin, so the check can read into the frame — and look for two different failures:

- the document wider than the viewport, and
- elements past the viewport that an ancestor clips. Those report no overflow at all and are the worse case, because the content is invisible rather than merely awkward.

Then look at the screenshots. Neither check catches overlapping elements, squashed charts, or a control too small to hit.

## The escape hatches this project already has

- [`responsive-dialog`](../shared/responsive-dialog.md) — dialog on a pointer, drawer on a phone.
- [`confirm-dialog`](../shared/confirm-dialog.md) — the same swap, for a destructive action.
- [`useIsMobile`](../hooks/use-mobile.md) — the one fixed question.
- [`useMediaQuery`](../hooks/use-media-query.md) — for a breakpoint that has nothing to do with touch, like a split that is wrong at 800px.
- [`SidebarNavButton`](../shared/sidebar-nav-button.md) — closes the sidebar sheet on tap, so the page you navigated to is not left underneath it.
