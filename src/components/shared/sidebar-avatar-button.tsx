"use client";

import { cn } from "cn";
import type * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuButton } from "@/components/ui/sidebar";

/**
 * A sidebar row that leads with an avatar — a workspace switcher, an account
 * menu.
 *
 * Collapsed to icons the button becomes a 32px square, and a row of avatar
 * plus label plus chevron does not fit in it. The flex line then starts at the
 * left edge and overflows, so the avatar lands off-centre inside a button that
 * is itself perfectly centred: 4px too far left in the header, 4px too far
 * right in the footer, where the padding differs.
 *
 * Hiding the text and the trailing slot while collapsed leaves the avatar
 * alone to be centred, and dropping the padding gives it the full 32px to
 * centre within.
 */
export function SidebarAvatarButton({
  fallback,
  src,
  title,
  subtitle,
  trailing,
  className,
  ...props
}: React.ComponentProps<typeof SidebarMenuButton> & {
  /** Initials shown until the image loads, or when there is none. */
  fallback: string;
  src?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Sits at the end while expanded — a chevron, a badge. */
  trailing?: React.ReactNode;
}) {
  return (
    <SidebarMenuButton
      className={cn(
        "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0!",
        className,
      )}
      {...props}
    >
      <Avatar size="sm" className="shrink-0">
        {src ? <AvatarImage src={src} alt="" /> : null}
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-col text-left leading-tight group-data-[collapsible=icon]:hidden">
        <span className="truncate font-medium">{title}</span>
        {subtitle ? (
          <span className="truncate text-xs text-muted-foreground">
            {subtitle}
          </span>
        ) : null}
      </div>
      {trailing ? (
        <span className="ml-auto group-data-[collapsible=icon]:hidden">
          {trailing}
        </span>
      ) : null}
    </SidebarMenuButton>
  );
}
