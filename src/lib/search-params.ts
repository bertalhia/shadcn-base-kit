// Imported from `nuqs/server` so this file is safe in both server and client
// components — it carries no "use client" directive.
import {
  createLoader,
  createParser,
  createSerializer,
  parseAsArrayOf,
  parseAsIndex,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

/**
 * One TanStack Table sort entry.
 *
 * `?sort=email:desc` <=> `{ id: "email", desc: true }`
 */
const parseAsSort = createParser({
  parse(query) {
    const [id = "", direction = ""] = query.split(":");
    if (!id) {
      return null;
    }
    const desc =
      parseAsStringLiteral(["asc", "desc"]).parse(direction) ?? "asc";
    return { id, desc: desc === "desc" };
  },
  serialize(value) {
    return `${value.id}:${value.desc ? "desc" : "asc"}`;
  },
  eq(a, b) {
    return a.id === b.id && a.desc === b.desc;
  },
});

/**
 * One TanStack Table column filter.
 *
 * `?filters=email:acme` <=> `{ id: "email", value: "acme" }`
 *
 * Values land as strings, which is what the `includesString` filter expects.
 * For a filter that carries structured data, reach for `parseAsJson` instead.
 */
const parseAsColumnFilter = createParser({
  parse(query) {
    const separator = query.indexOf(":");
    if (separator < 1) {
      return null;
    }
    return {
      id: query.slice(0, separator),
      value: query.slice(separator + 1),
    };
  },
  serialize(value) {
    return `${value.id}:${String(value.value ?? "")}`;
  },
  eq(a, b) {
    return a.id === b.id && a.value === b.value;
  },
});

/**
 * Every piece of `<DataTable />` state that survives a reload.
 *
 * `page` is one-based in the URL and zero-based in state, which is what
 * `parseAsIndex` does. `hidden` and `selected` carry ids, so the URL stays
 * short when nothing is hidden and nothing is selected.
 */
export const dataTableSearchParams = {
  page: parseAsIndex.withDefault(0),
  perPage: parseAsInteger.withDefault(10),
  sort: parseAsArrayOf(parseAsSort).withDefault([]),
  filters: parseAsArrayOf(parseAsColumnFilter).withDefault([]),
  hidden: parseAsArrayOf(parseAsString).withDefault([]),
  selected: parseAsArrayOf(parseAsString).withDefault([]),
};

export type DataTableSearchParams = typeof dataTableSearchParams;

/**
 * Prefixed URL keys, so two tables on the same page don't fight over `?page`.
 *
 * ```ts
 * useQueryStates(dataTableSearchParams, {
 *   urlKeys: dataTableUrlKeys("orders"),
 * })
 * // → ?orders_page=2&orders_sort=total:desc
 * ```
 */
export function dataTableUrlKeys(prefix?: string) {
  if (!prefix) {
    return undefined;
  }

  return Object.fromEntries(
    Object.keys(dataTableSearchParams).map((key) => [key, `${prefix}_${key}`]),
  ) as Record<keyof DataTableSearchParams, string>;
}

/** Read table state in a server component or route handler. */
export const loadDataTableSearchParams = createLoader(dataTableSearchParams);

/** Build a link that opens the table on a given page, sort, or filter. */
export const serializeDataTableSearchParams = createSerializer(
  dataTableSearchParams,
);

export { parseAsColumnFilter, parseAsSort };
