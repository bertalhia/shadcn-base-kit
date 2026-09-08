"use client";

import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  columnFacetingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  type PaginationState,
  type ReactTable,
  type RowData,
  type RowSelectionState,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  type SortingState,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
  type Updater,
  useTable,
} from "@tanstack/react-table";
import { cn } from "cn";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDownIcon,
  EyeOffIcon,
  Settings2Icon,
} from "lucide-react";
import { useQueryStates } from "nuqs";
import * as React from "react";

import { DropdownMenuSection } from "@/components/shared/menu-section";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dataTableSearchParams, dataTableUrlKeys } from "@/lib/search-params";

// New in v9: declare the features this table uses — anything you don't
// register is tree-shaken out of the bundle.
const features = tableFeatures({
  columnFacetingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
});

// Pass this as the first generic argument to `ColumnDef`, `Column`, `Table`,
// and `Row` so each type knows which feature APIs are available.
type DataTableFeatures = typeof features;

function resolveUpdater<T>(updater: Updater<T>, current: T): T {
  return typeof updater === "function"
    ? (updater as (old: T) => T)(current)
    : updater;
}

/**
 * Sorting, filters, page, page size, hidden columns and selection live in the
 * URL, so a reload or a shared link lands on the same view.
 *
 * Two tables on one page need distinct `queryPrefix` values.
 */
function DataTable<TData extends RowData>({
  columns,
  data,
  toolbar,
  queryPrefix,
  pagination = true,
  emptyMessage = "No results.",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  /** Rendered above the table, with the table instance for filters and view options. */
  toolbar?: (table: ReactTable<DataTableFeatures, TData>) => React.ReactNode;
  /** Namespaces the query keys, e.g. `orders` gives `?orders_page=2`. */
  queryPrefix?: string;
  pagination?: boolean;
  emptyMessage?: React.ReactNode;
}) {
  const [search, setSearch] = useQueryStates(dataTableSearchParams, {
    urlKeys: dataTableUrlKeys(queryPrefix),
  });

  const columnVisibility = React.useMemo<ColumnVisibilityState>(
    () => Object.fromEntries(search.hidden.map((id) => [id, false])),
    [search.hidden],
  );

  const rowSelection = React.useMemo<RowSelectionState>(
    () => Object.fromEntries(search.selected.map((id) => [id, true as const])),
    [search.selected],
  );

  const paginationState = React.useMemo<PaginationState>(
    () => ({ pageIndex: search.page, pageSize: search.perPage }),
    [search.page, search.perPage],
  );

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: (updater: Updater<SortingState>) => {
      setSearch({ sort: resolveUpdater(updater, search.sort) });
    },
    onColumnFiltersChange: (updater: Updater<ColumnFiltersState>) => {
      const next = resolveUpdater(updater, search.filters);
      setSearch({
        filters: next.map(({ id, value }) => ({ id, value: String(value) })),
        // A new filter changes which rows come first, so go back to page one.
        page: 0,
      });
    },
    onColumnVisibilityChange: (updater: Updater<ColumnVisibilityState>) => {
      const next = resolveUpdater(updater, columnVisibility);
      setSearch({
        hidden: Object.entries(next)
          .filter(([, visible]) => !visible)
          .map(([id]) => id),
      });
    },
    onRowSelectionChange: (updater: Updater<RowSelectionState>) => {
      const next = resolveUpdater(updater, rowSelection);
      setSearch({
        selected: Object.entries(next)
          .filter(([, selected]) => selected)
          .map(([id]) => id),
      });
    },
    onPaginationChange: (updater: Updater<PaginationState>) => {
      const next = resolveUpdater(updater, paginationState);
      setSearch({ page: next.pageIndex, perPage: next.pageSize });
    },
    state: {
      sorting: search.sort,
      columnFilters: search.filters,
      columnVisibility,
      rowSelection,
      pagination: paginationState,
    },
  });

  return (
    <div
      data-slot="data-table"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {toolbar?.(table)}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination ? <DataTablePagination table={table} /> : null}
    </div>
  );
}

/** Sort and hide a column from its header cell. */
function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  column: Column<DataTableFeatures, TData, TValue>;
  title: string;
}) {
  if (!column.getCanSort()) {
    return (
      <div className={cn(className)} {...props}>
        {title}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-popup-open:bg-accent"
            />
          }
        >
          <span>{title}</span>
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon data-icon="inline-end" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon data-icon="inline-end" />
          ) : (
            <ChevronsUpDownIcon data-icon="inline-end" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOffIcon />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/** Page size, page count, selection count, and the page buttons. */
function DataTablePagination<TData extends RowData>({
  table,
  pageSizeOptions = [10, 20, 25, 30, 40, 50],
  className,
  ...props
}: React.ComponentProps<"div"> & {
  table: ReactTable<DataTableFeatures, TData>;
  pageSizeOptions?: number[];
}) {
  return (
    <div
      data-slot="data-table-pagination"
      className={cn("flex items-center justify-between px-2", className)}
      {...props}
    >
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.state.pagination.pageSize}`}
            onValueChange={(value: string | null) => {
              if (value) {
                table.setPageSize(Number(value));
              }
            }}
          >
            <SelectTrigger size="sm" className="w-17.5">
              <SelectValue placeholder={table.state.pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-25 items-center justify-center text-sm font-medium">
          Page {table.state.pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Toggle column visibility. */
function DataTableViewOptions<TData extends RowData>({
  table,
  label = "View",
  className,
}: {
  table: ReactTable<DataTableFeatures, TData>;
  label?: React.ReactNode;
  className?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={cn("ml-auto hidden lg:flex", className)}
          />
        }
      >
        <Settings2Icon data-icon="inline-start" />
        {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-37.5">
        <DropdownMenuSection label="Toggle columns" />
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value: boolean) =>
                column.toggleVisibility(!!value)
              }
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export {
  DataTable,
  DataTableColumnHeader,
  type DataTableFeatures,
  DataTablePagination,
  DataTableViewOptions,
  features,
};
