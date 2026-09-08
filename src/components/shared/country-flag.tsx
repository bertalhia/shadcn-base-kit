import { cn } from "cn";
import Image from "next/image";
import type * as React from "react";

/**
 * A country's flag, as a real SVG file.
 *
 * Not the emoji: Windows ships no flag glyphs, so `🇧🇷` falls back to the two
 * regional-indicator letters and every row reads "br Brazil".
 *
 * Not the package's React components either — a country list needs all 250, so
 * nothing tree-shakes and roughly 900 KB of SVG lands in the client bundle. As
 * files the browser fetches only the rows a person actually sees, at about a
 * kilobyte each. `scripts/sync-flags.mjs` copies them into `public/flags`
 * before dev and build.
 *
 * `next/image` skips optimisation for a `.svg` source on its own, which is
 * what the docs recommend rather than turning on `dangerouslyAllowSVG`.
 */
export function CountryFlag({
  code,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Image>, "src" | "alt"> & {
  /** ISO 3166-1 alpha-2, e.g. `BR`. Case-insensitive. */
  code: string;
}) {
  return (
    <Image
      src={`/flags/${code.toLowerCase()}.svg`}
      // The country name sits beside it everywhere this is used, so the flag
      // is decoration and repeating the name would only add noise.
      alt=""
      aria-hidden
      width={18}
      height={12}
      className={cn("h-3 w-4.5 shrink-0 rounded-xs object-cover", className)}
      {...props}
    />
  );
}
