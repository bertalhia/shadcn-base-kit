"use client";

import type * as React from "react";

import {
  ContextMenuGroup,
  ContextMenuLabel,
} from "@/components/ui/context-menu";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { MenubarGroup, MenubarLabel } from "@/components/ui/menubar";
import { SelectGroup, SelectLabel } from "@/components/ui/select";

/**
 * A labelled block of menu items.
 *
 * Base UI reads a group context from every label part, so a label rendered as
 * a sibling of its group — the obvious-looking arrangement — throws the moment
 * the menu opens:
 *
 *     Base UI: MenuGroupContext is missing.
 *
 * TypeScript cannot catch it, since the props are valid either way. Pairing
 * the two here means a call site cannot get the nesting wrong: pass `label`
 * and the items as children, and the group comes with it.
 *
 * A group with no label is still a group — it separates items for assistive
 * technology — so `label` is optional.
 */

export function DropdownMenuSection({
  label,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuGroup> & {
  label?: React.ReactNode;
}) {
  return (
    <DropdownMenuGroup {...props}>
      {label ? <DropdownMenuLabel>{label}</DropdownMenuLabel> : null}
      {children}
    </DropdownMenuGroup>
  );
}

export function ContextMenuSection({
  label,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuGroup> & {
  label?: React.ReactNode;
}) {
  return (
    <ContextMenuGroup {...props}>
      {label ? <ContextMenuLabel>{label}</ContextMenuLabel> : null}
      {children}
    </ContextMenuGroup>
  );
}

export function MenubarSection({
  label,
  children,
  ...props
}: React.ComponentProps<typeof MenubarGroup> & {
  label?: React.ReactNode;
}) {
  return (
    <MenubarGroup {...props}>
      {label ? <MenubarLabel>{label}</MenubarLabel> : null}
      {children}
    </MenubarGroup>
  );
}

export function SelectSection({
  label,
  children,
  ...props
}: React.ComponentProps<typeof SelectGroup> & {
  label?: React.ReactNode;
}) {
  return (
    <SelectGroup {...props}>
      {label ? <SelectLabel>{label}</SelectLabel> : null}
      {children}
    </SelectGroup>
  );
}
