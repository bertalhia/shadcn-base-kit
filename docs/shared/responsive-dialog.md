# Responsive Dialog

<!-- notes -->
A dialog on a pointer, a drawer on a phone.

This is the pattern the Drawer docs prescribe: a centred modal is awkward to
reach one-handed, and a sheet that slides from the bottom sits under the
thumb. Both render the same children, so a caller writes the content once.

Note that the two are separate trees — switching breakpoint remounts the
content, so anything with unsaved state inside should be controlled from
outside.
<!-- /notes -->

**Source** `src/components/shared/responsive-dialog.tsx` · **Client component**

## Import

```tsx
import { ResponsiveDialog } from "@/components/shared/responsive-dialog";
```

## Exports

### `ResponsiveDialog` — component

A dialog on a pointer, a drawer on a phone.

This is the pattern the Drawer docs prescribe: a centred modal is awkward to
reach one-handed, and a sheet that slides from the bottom sits under the
thumb. Both render the same children, so a caller writes the content once.

Note that the two are separate trees — switching breakpoint remounts the
content, so anything with unsaved state inside should be controlled from
outside.

```ts
ResponsiveDialog(props: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactElement;
  title: React.ReactNode;
  /** Give it one only when it says something the title does not. */
  description?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
})
```

## Depends on

- Packages: `react`
- In this project: `@/components/ui/dialog`, `@/components/ui/drawer`, `@/hooks/use-mobile`

## Used by

[examples/feedback-playground](../examples/feedback-playground.md), [examples/onboarding-questionnaire](../examples/onboarding-questionnaire.md)
