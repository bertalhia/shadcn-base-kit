"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

/**
 * A search box whose term lives in the URL.
 *
 * Search is the textbook case for `useQueryState`: a reload keeps the results,
 * and the link is worth sending to someone. nuqs throttles the history writes,
 * so binding straight to the input is safe.
 *
 * Pages using this need a `<Suspense>` boundary — `useQueryState` reads
 * `useSearchParams()` underneath.
 */
export function SearchInput({
  queryKey = "q",
  placeholder = "Search",
  clearLabel = "Clear search",
  className,
}: {
  queryKey?: string;
  placeholder?: string;
  clearLabel?: string;
  className?: string;
}) {
  const [query, setQuery] = useQueryState(
    queryKey,
    parseAsString.withDefault(""),
  );

  return (
    <InputGroup className={className}>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        value={query}
        placeholder={placeholder}
        onChange={(event) => setQuery(event.target.value || null)}
      />
      {query ? (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            variant="ghost"
            size="icon-xs"
            aria-label={clearLabel}
            onClick={() => setQuery(null)}
          >
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  );
}
