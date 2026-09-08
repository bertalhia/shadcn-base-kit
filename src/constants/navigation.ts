import {
  ChartLineIcon,
  InboxIcon,
  LayoutDashboardIcon,
  UsersIcon,
} from "lucide-react";

/** Shared by the sidebar and the command menu, so the two never disagree. */
export const navigation = [
  { title: "Dashboard", icon: LayoutDashboardIcon, badge: null },
  { title: "Inbox", icon: InboxIcon, badge: "12" },
  { title: "Customers", icon: UsersIcon, badge: null },
  { title: "Reports", icon: ChartLineIcon, badge: null },
];

export const projects = ["Northwind", "Acme storefront", "Internal tooling"];
