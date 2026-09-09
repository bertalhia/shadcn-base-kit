"use client";

import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  CircleHelpIcon,
  FolderIcon,
  LifeBuoyIcon,
  LogOutIcon,
  PlusIcon,
  SettingsIcon,
} from "lucide-react";
import { DropdownMenuSection } from "@/components/shared/menu-section";
import { SidebarAvatarButton } from "@/components/shared/sidebar-avatar-button";
import {
  SidebarNavButton,
  SidebarNavSubButton,
} from "@/components/shared/sidebar-nav-button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { navigation, projects } from "@/constants/navigation";

/**
 * The application sidebar, on its own.
 *
 * It renders no provider and no inset: in the app router those belong to a
 * layout, so a route group can decide which of its pages get a sidebar. Drop
 * `<AppSidebar />` next to `<SidebarInset>` inside a `<SidebarProvider>`.
 *
 * The open state is persisted by the component itself in a cookie, so the
 * layout does not flash on the next load.
 */
export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarAvatarButton
                    size="lg"
                    fallback="NW"
                    title="Northwind"
                    subtitle="Pro plan"
                    trailing={<ChevronsUpDownIcon />}
                  />
                }
              />
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuSection label="Workspaces">
                  {projects.map((project) => (
                    <DropdownMenuItem key={project}>{project}</DropdownMenuItem>
                  ))}
                </DropdownMenuSection>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusIcon />
                  New workspace
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((entry, index) => (
                <SidebarMenuItem key={entry.title}>
                  <SidebarNavButton
                    tooltip={entry.title}
                    isActive={index === 0}
                  >
                    <entry.icon />
                    <span>{entry.title}</span>
                  </SidebarNavButton>
                  {entry.badge ? (
                    <SidebarMenuBadge>{entry.badge}</SidebarMenuBadge>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            {/* SidebarGroupAction sits at `right-3` in a `w-5` box, so the
                chevron needs that much clearance or the two stack. */}
            <SidebarGroupLabel className="pr-9" render={<CollapsibleTrigger />}>
              Projects
              <ChevronDownIcon className="ml-auto transition-transform group-data-open/collapsible:rotate-180" />
            </SidebarGroupLabel>
            <SidebarGroupAction aria-label="New project">
              <PlusIcon />
            </SidebarGroupAction>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {projects.map((project) => (
                    <SidebarMenuItem key={project}>
                      <SidebarNavButton tooltip={project}>
                        <FolderIcon />
                        <span>{project}</span>
                      </SidebarNavButton>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarNavSubButton>Overview</SidebarNavSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarNavSubButton>Deployments</SidebarNavSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarNavButton tooltip="Support">
              <LifeBuoyIcon />
              <span>Support</span>
            </SidebarNavButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarAvatarButton fallback="AL" title="Ada Lovelace" />
                }
              />
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem>
                  <SettingsIcon />
                  Settings
                  <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CircleHelpIcon />
                  Keyboard shortcuts
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOutIcon />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
