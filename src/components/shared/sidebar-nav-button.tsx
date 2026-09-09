"use client";

import type * as React from "react";

import {
  SidebarMenuButton,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";

/**
 * A sidebar item that closes the sidebar behind it on a phone.
 *
 * On mobile the sidebar is a sheet covering the page, so tapping a
 * destination and having it stay open means the thing you navigated to is
 * hidden under it. The component does not do this on its own — `useSidebar`
 * exposes `setOpenMobile` and leaves the decision to the caller — and it is
 * the sort of thing that gets remembered on one item and forgotten on the
 * next, so it lives here rather than at each call site.
 *
 * Not for a row that opens a menu or expands a group: those keep the sidebar
 * open on purpose.
 */
function useDismissOnMobile(onClick?: React.MouseEventHandler<HTMLElement>) {
  const { isMobile, setOpenMobile } = useSidebar();

  return (event: React.MouseEvent<HTMLElement>) => {
    onClick?.(event);
    if (isMobile) {
      setOpenMobile(false);
    }
  };
}

export function SidebarNavButton({
  onClick,
  ...props
}: React.ComponentProps<typeof SidebarMenuButton>) {
  const handleClick = useDismissOnMobile(onClick);
  return <SidebarMenuButton {...props} onClick={handleClick} />;
}

export function SidebarNavSubButton({
  onClick,
  ...props
}: React.ComponentProps<typeof SidebarMenuSubButton>) {
  const handleClick = useDismissOnMobile(onClick);
  return <SidebarMenuSubButton {...props} onClick={handleClick} />;
}
