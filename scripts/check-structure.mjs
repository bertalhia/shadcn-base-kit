import fs from "node:fs";
import path from "node:path";

/**
 * Structural rules a linter has no opinion about.
 *
 * Next.js is explicitly unopinionated here — its docs call `components` and
 * `lib` "generalized placeholders" — so the layout below is this project's
 * choice, and these checks are what keep it from eroding. They exist because
 * the rules were written down and broken anyway.
 */

const failures = [];

function walk(dir, visit) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, visit);
    } else {
      visit(full.replace(/\\/g, "/"));
    }
  }
}

/** Folders that hold no React, and what each one is for. */
const codeOnly = {
  "src/lib": "integration wrappers — one file per external library or service",
  "src/utils": "pure helpers with no dependencies",
  "src/schemas": "Zod schemas",
  "src/constants": "static data",
  "src/hooks": "React hooks",
};

// A file with no JSX is not a component.
walk("src/components", (file) => {
  if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
    failures.push(
      `${file} — a .ts file does not belong in src/components. Move it to the folder that matches what it is.`,
    );
  }
});

// And the reverse: those folders hold no components.
for (const [dir, purpose] of Object.entries(codeOnly)) {
  walk(dir, (file) => {
    if (file.endsWith(".tsx")) {
      failures.push(`${file} — ${dir} is for ${purpose}, not components.`);
    }
  });
}

// `lib` is for integrations, so every file there has to wrap something we did
// not write: an npm package, or a ui component that owns a singleton we must
// go through — `notify` wraps the toast manager instance that lives in
// `ui/toast`, and reaching for base-ui directly would create a second one.
// A file importing neither is a helper wearing the wrong coat.
walk("src/lib", (file) => {
  if (!file.endsWith(".ts")) return;
  const source = fs.readFileSync(file, "utf8");
  const imports = [...source.matchAll(/from\s+"([^"]+)"/g)].map((m) => m[1]);
  const wrapsSomething = imports.some(
    (specifier) =>
      (!specifier.startsWith("@/") && !specifier.startsWith(".")) ||
      specifier.startsWith("@/components/ui/"),
  );
  if (!wrapsSomething) {
    failures.push(
      `${file} — src/lib is for ${codeOnly["src/lib"]}, and this file wraps nothing. It probably belongs in src/utils or src/constants.`,
    );
  }
});

/**
 * React types that `@types/react` marks `@deprecated`. TypeScript reports
 * these as editor suggestions, not build errors, so they slip in unnoticed.
 */
const deprecatedReactTypes = [
  "FormEvent",
  "MutableRefObject",
  "LegacyRef",
  "PropsWithRef",
  "ClassicElement",
  "CElement",
  "DOMElement",
  "ComponentElement",
  "FunctionComponentElement",
  "ReactComponentElement",
  "EffectCallback",
];

const bannedPatterns = [
  {
    // `: any`, `as any`, `<any>` — never. A generic parameter beats all three.
    pattern: /(:\s*any\b|\bas\s+any\b|<any[,>])/,
    message: "uses `any`",
  },
  {
    // `unknown` is fine at a boundary when it gets narrowed; casting straight
    // through it is `any` with extra steps.
    pattern: /\bas\s+unknown\s+as\b/,
    message: "casts through `unknown`",
  },
  {
    pattern: new RegExp(
      `\\b(?:React\\.)?(${deprecatedReactTypes.join("|")})\\b\\s*[<(]`,
    ),
    message: "uses a React type that @types/react marks deprecated",
  },
];

for (const dir of ["src"]) {
  walk(dir, (file) => {
    if (!/\.tsx?$/.test(file) || file.endsWith(".d.ts")) return;
    const lines = fs.readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
      // Comments and prose are not code.
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
      for (const { pattern, message } of bannedPatterns) {
        if (pattern.test(line)) {
          failures.push(`${file}:${index + 1} — ${message}: ${line.trim()}`);
        }
      }
    });
  });
}

if (failures.length) {
  console.error("Structure check failed:\n");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  console.error("");
  process.exit(1);
}
