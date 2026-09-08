/**
 * Pattern masking shared by every masked input.
 *
 * A pattern is a string of placeholders and literals:
 * `#` a digit, `A` a letter, `*` either. Anything else is a literal that the
 * mask inserts on its own.
 *
 *     applyMask("11987654321", "(##) #####-####") // "(11) 98765-4321"
 */

const PLACEHOLDERS: Record<string, RegExp> = {
  "#": /\d/,
  A: /[a-zA-Z]/,
  "*": /[a-zA-Z0-9]/,
};

export function isPlaceholder(char: string) {
  return char in PLACEHOLDERS;
}

/** Drops everything the pattern would have inserted, leaving typed content. */
export function stripMask(value: string, pattern: string) {
  const literals = new Set([...pattern].filter((char) => !isPlaceholder(char)));
  return [...value].filter((char) => !literals.has(char)).join("");
}

/**
 * Formats as far as the input allows, and stops at the first character that
 * does not fit — so a half-typed value stays readable while it is typed.
 */
export function applyMask(value: string, pattern: string) {
  const raw = stripMask(value, pattern);
  let out = "";
  let index = 0;

  for (const slot of pattern) {
    if (index >= raw.length) break;

    const matcher = PLACEHOLDERS[slot];
    if (!matcher) {
      out += slot;
      continue;
    }

    const char = raw[index];
    if (!matcher.test(char)) {
      // Skip the offending character rather than dropping the rest.
      index += 1;
      continue;
    }

    out += char;
    index += 1;
  }

  return out;
}

/** Longest raw value a pattern can hold, for `maxLength` on the input. */
export function maskCapacity(pattern: string) {
  return [...pattern].filter(isPlaceholder).length;
}

/**
 * Picks the first pattern the raw value still fits, so a field can widen as
 * you type — CPF up to 11 digits, then CNPJ up to 14.
 */
export function applyVariablePattern(value: string, patterns: string[]) {
  const sorted = [...patterns].sort(
    (a, b) => maskCapacity(a) - maskCapacity(b),
  );
  const raw = stripMask(value, sorted[0]);
  const pattern =
    sorted.find((p) => raw.length <= maskCapacity(p)) ?? sorted.at(-1) ?? "";
  return applyMask(raw, pattern);
}
