"use client";

import { createColumnHelper } from "@tanstack/react-table";
import {
  ArrowUpRightIcon,
  MoreHorizontalIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import * as React from "react";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { DropdownMenuSection } from "@/components/shared/menu-section";
import { SearchInput } from "@/components/shared/search-input";
import { Section } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DataTable,
  DataTableColumnHeader,
  type DataTableFeatures,
  DataTableViewOptions,
} from "@/components/ui/data-table";
import { DateRangePicker } from "@/components/ui/date-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatDate } from "@/lib/date";
import { notify } from "@/lib/notify";
import { formatCents } from "@/utils/number";

type Order = {
  id: string;
  customer: string;
  email: string;
  status: "paid" | "pending" | "refunded" | "failed";
  total: number;
  placedAt: string;
};

const orders: Order[] = [
  {
    id: "3312",
    customer: "Rita Okafor",
    email: "rita@example.com",
    status: "paid",
    total: 18900,
    placedAt: "2026-08-14",
  },
  {
    id: "3311",
    customer: "Tomas Silva",
    email: "tomas@example.com",
    status: "pending",
    total: 4500,
    placedAt: "2026-08-14",
  },
  {
    id: "3310",
    customer: "Mei Chen",
    email: "mei@example.com",
    status: "paid",
    total: 24300,
    placedAt: "2026-08-13",
  },
  {
    id: "3309",
    customer: "Jonas Weber",
    email: "jonas@example.com",
    status: "refunded",
    total: 7800,
    placedAt: "2026-08-12",
  },
  {
    id: "3308",
    customer: "Amara Diallo",
    email: "amara@example.com",
    status: "failed",
    total: 15600,
    placedAt: "2026-08-12",
  },
  {
    id: "3307",
    customer: "Luca Rossi",
    email: "luca@example.com",
    status: "paid",
    total: 3200,
    placedAt: "2026-08-11",
  },
  {
    id: "3306",
    customer: "Sara Haddad",
    email: "sara@example.com",
    status: "paid",
    total: 9900,
    placedAt: "2026-08-11",
  },
  {
    id: "3305",
    customer: "Elin Berg",
    email: "elin@example.com",
    status: "pending",
    total: 12500,
    placedAt: "2026-08-10",
  },
  {
    id: "3304",
    customer: "Kofi Mensah",
    email: "kofi@example.com",
    status: "paid",
    total: 6400,
    placedAt: "2026-08-10",
  },
  {
    id: "3303",
    customer: "Nadia Petrova",
    email: "nadia@example.com",
    status: "paid",
    total: 21000,
    placedAt: "2026-08-09",
  },
  {
    id: "3302",
    customer: "Hugo Martins",
    email: "hugo@example.com",
    status: "refunded",
    total: 5400,
    placedAt: "2026-08-09",
  },
  {
    id: "3301",
    customer: "Yuki Tanaka",
    email: "yuki@example.com",
    status: "paid",
    total: 33100,
    placedAt: "2026-08-08",
  },
];

/** Status carries meaning, so the badge spells it out instead of relying on colour. */
const statusVariant: Record<
  Order["status"],
  "secondary" | "outline" | "destructive"
> = {
  paid: "secondary",
  pending: "outline",
  refunded: "outline",
  failed: "destructive",
};

const columnHelper = createColumnHelper<DataTableFeatures, Order>();

const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all rows on this page"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select order ${row.original.id}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("id", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order" />
    ),
    cell: ({ row }) => <span className="font-medium">#{row.original.id}</span>,
  }),
  columnHelper.accessor("customer", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span>{row.original.customer}</span>
        <span className="text-xs text-muted-foreground">
          {row.original.email}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={statusVariant[row.original.status]}
        className="capitalize"
      >
        {row.original.status}
      </Badge>
    ),
  }),
  columnHelper.accessor("placedAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Placed" />
    ),
    cell: ({ row }) => formatDate(row.original.placedAt),
  }),
  columnHelper.accessor("total", {
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        {formatCents(row.original.total)}
      </div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Order actions" />
          }
        >
          <MoreHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuSection label={`Order #${row.original.id}`}>
            <DropdownMenuItem
              onClick={() => {
                void navigator.clipboard.writeText(row.original.id);
                notify.success("Order number copied.");
              }}
            >
              Copy order number
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ArrowUpRightIcon />
              Open in Stripe
            </DropdownMenuItem>
          </DropdownMenuSection>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Refund</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
]);

/**
 * The orders list.
 *
 * Sorting, filters, page, page size, hidden columns and selection all live in
 * the URL, so a reload lands on the same view and the link is worth sending to
 * someone. `queryPrefix` namespaces them, which is what lets a second table
 * share the page.
 */
export function OrdersTable() {
  const [rows, setRows] = React.useState(orders);
  // The toolbar's search box writes this key; reading it here is what makes
  // the box actually narrow the list rather than just decorate the URL.
  const [query] = useQueryState("orders_q", parseAsString.withDefault(""));

  const visible = React.useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((order) =>
      [order.id, order.customer, order.email, order.status].some((field) =>
        field.toLowerCase().includes(term),
      ),
    );
  }, [rows, query]);

  return (
    <Section
      title="Orders"
      description="Everything placed in the last 30 days."
      actions={
        <ConfirmDialog
          title="Clear the order list?"
          description="This demo table repopulates on reload."
          confirmLabel="Clear list"
          destructive
          onConfirm={() => {
            setRows([]);
            notify.success("List cleared.");
          }}
          trigger={<Button variant="outline">Clear</Button>}
        />
      }
    >
      {visible.length === 0 ? (
        <EmptyState
          title={rows.length === 0 ? "No orders yet" : "Nothing matches that"}
          description={
            rows.length === 0
              ? "Orders show up here the moment a payment clears."
              : `No order matches "${query}".`
          }
          action={
            rows.length === 0 ? (
              <Button onClick={() => setRows(orders)}>
                Restore the demo data
              </Button>
            ) : null
          }
        />
      ) : (
        <DataTable
          columns={columns}
          data={visible}
          queryPrefix="orders"
          toolbar={(table) => (
            <div className="flex flex-wrap items-center gap-2">
              <SearchInput
                queryKey="orders_q"
                placeholder="Search orders"
                className="max-w-xs"
              />
              <Sheet>
                <SheetTrigger render={<Button variant="outline" size="sm" />}>
                  <SlidersHorizontalIcon />
                  Filters
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Filter orders</SheetTitle>
                    <SheetDescription>
                      Narrowing here changes the table behind the sheet.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 p-4">
                    <DateRangePicker
                      queryKey="orders_placed"
                      className="w-full"
                    />
                  </div>
                </SheetContent>
              </Sheet>
              <DataTableViewOptions table={table} />
            </div>
          )}
        />
      )}
    </Section>
  );
}
