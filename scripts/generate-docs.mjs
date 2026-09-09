/**
 * Writes the markdown twin of every file under `src/`, plus the `llms.txt`
 * index that points at them.
 *
 * The facts come from the TypeScript AST, never from a regex over the source:
 * exported names, their signatures, the `cva` variants, the `data-slot` values,
 * what each file imports and who imports it back. Rerun it after any change to
 * `src/` and the docs cannot drift.
 *
 * Prose survives. Anything between `<!-- notes -->` and `<!-- /notes -->` in a
 * generated file is read back and written out untouched, and its first line
 * becomes that entry's description in `llms.txt`.
 *
 *     node scripts/generate-docs.mjs
 *     node scripts/generate-docs.mjs --check   # exits 1 if the docs are stale
 */

import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const ROOT = path.resolve(import.meta.dirname, "..");
const DOCS = path.join(ROOT, "docs");
const NOTES_OPEN = "<!-- notes -->";
const NOTES_CLOSE = "<!-- /notes -->";
const PLACEHOLDER = "_No notes yet._";

/** The order here is the order of the sections in `llms.txt`. */
const AREAS = [
  {
    slug: "ui",
    dir: "src/components/ui",
    title: "UI components",
    blurb:
      "Written by `shadcn add`, on the `base-rhea` style (Base UI, not Radix). Never hand-edit one; run `pnpm dlx shadcn@latest add <name> --overwrite` instead.",
    upstream: (name) => `https://ui.shadcn.com/docs/components/base/${name}.md`,
  },
  {
    slug: "shared",
    dir: "src/components/shared",
    title: "Shared components",
    blurb:
      "Ours. The standardized pieces a screen composes from, built on top of `ui/`. Start here before reaching for a primitive.",
  },
  {
    slug: "examples",
    dir: "src/components/examples",
    title: "Example screens",
    blurb:
      "Reference screens. Read one to see how the pieces fit together on a real page.",
  },
  {
    slug: "lib",
    dir: "src/lib",
    title: "Library wrappers",
    blurb:
      "One file per external library or service. Screens import the wrapper, never the library, so a format decision changes in one place.",
  },
  {
    slug: "utils",
    dir: "src/utils",
    title: "Utilities",
    blurb: "Pure helpers with no dependencies of their own.",
  },
  { slug: "hooks", dir: "src/hooks", title: "Hooks", blurb: "React hooks." },
  {
    slug: "schemas",
    dir: "src/schemas",
    title: "Schemas",
    blurb: "Zod schemas, reused across forms.",
  },
  {
    slug: "constants",
    dir: "src/constants",
    title: "Constants",
    blurb: "Static data.",
  },
  {
    slug: "actions",
    dir: "src/actions",
    title: "Server actions",
    blurb: "Server actions.",
  },
];

const GUIDES = [
  [
    "start-here.md",
    "What this kit is, and the five rules that matter before you write anything.",
  ],
  [
    "file-structure.md",
    "Where a file goes, and how to tell a component from a helper.",
  ],
  [
    "forms.md",
    "React Hook Form + Zod + Field. Holds for every form, from one input to a hundred.",
  ],
  [
    "state-url.md",
    "nuqs. What belongs in the URL, what stays in `useState`, and the Suspense trap.",
  ],
  [
    "responsive.md",
    "Phone width is the default. What keeps breaking, and how to check it.",
  ],
  [
    "libraries.md",
    "One library per job, wrapped once. The table, and what each wrapper owns.",
  ],
  [
    "styling.md",
    "Tailwind v4, the token set, and the Base UI data attributes you style against.",
  ],
  [
    "writing-ui-copy.md",
    "Labels, descriptions and errors. When a line of help text earns its place.",
  ],
];

// --- reading the source ------------------------------------------------------

/** @returns {string[]} every `.ts`/`.tsx` file in `dir`, sorted, without the extension. */
function listModules(dir) {
  const abs = path.join(ROOT, dir);
  let entries;
  try {
    entries = readdirSync(abs);
  } catch {
    return [];
  }
  return entries
    .filter(
      (f) => (f.endsWith(".ts") || f.endsWith(".tsx")) && !f.endsWith(".d.ts"),
    )
    .map((f) => f.replace(/\.tsx?$/, ""))
    .sort();
}

function fileFor(dir, name) {
  for (const ext of [".tsx", ".ts"]) {
    const abs = path.join(ROOT, dir, name + ext);
    try {
      statSync(abs);
      return abs;
    } catch {}
  }
  return null;
}

function parse(absPath) {
  const text = readFileSync(absPath, "utf8");
  const source = ts.createSourceFile(
    absPath,
    text,
    ts.ScriptTarget.Latest,
    /* setParentNodes */ true,
    absPath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  return { text, source };
}

/** The prose of a JSDoc block, with the `*` gutter already stripped by the parser. */
function jsDocOf(node) {
  const blocks = node.jsDoc;
  if (!blocks?.length) return "";
  const comment = blocks.at(-1).comment;
  const text =
    typeof comment === "string" ? comment : ts.getTextOfJSDocComment(comment);
  return (text ?? "").trim();
}

/** JSDoc hangs off the statement, not off the declaration inside it. */
function docCarrier(node) {
  if (ts.isVariableDeclaration(node)) return node.parent.parent;
  return node;
}

function hasExportModifier(node) {
  return Boolean(
    node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword),
  );
}

function isComponentName(name) {
  return /^[A-Z]/.test(name);
}

function initializerOf(node) {
  if (ts.isVariableDeclaration(node)) return node.initializer;
  return undefined;
}

function isCvaCall(node) {
  return (
    node &&
    ts.isCallExpression(node) &&
    ts.isIdentifier(node.expression) &&
    node.expression.text === "cva"
  );
}

function kindOf(node, name) {
  if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node))
    return "type";
  if (ts.isFunctionDeclaration(node))
    return isComponentName(name) ? "component" : "function";
  const init = initializerOf(node);
  if (isCvaCall(init)) return "variants";
  if (init && (ts.isArrowFunction(init) || ts.isFunctionExpression(init))) {
    return isComponentName(name) ? "component" : "function";
  }
  if (init && ts.isCallExpression(init) && isComponentName(name))
    return "component";
  return "const";
}

/** The signature an caller has to satisfy, printed the way the source writes it. */
function signatureOf(node, name, source) {
  if (ts.isTypeAliasDeclaration(node)) {
    return `type ${name}${typeParamsText(node, source)} = ${node.type.getText(source)}`;
  }
  if (ts.isInterfaceDeclaration(node)) return node.getText(source);

  const fn = ts.isFunctionDeclaration(node) ? node : initializerOf(node);
  if (
    fn &&
    (ts.isFunctionDeclaration(fn) ||
      ts.isArrowFunction(fn) ||
      ts.isFunctionExpression(fn))
  ) {
    const params = fn.parameters
      .map((p) => {
        const label = ts.isIdentifier(p.name) ? p.name.text : "props";
        const type = p.type ? `: ${p.type.getText(source)}` : "";
        return `${label}${type}`;
      })
      .join(", ");
    const returns = fn.type ? `: ${fn.type.getText(source)}` : "";
    return `${name}${typeParamsText(fn, source)}(${params})${returns}`;
  }

  if (ts.isVariableDeclaration(node) && node.type) {
    return `const ${name}: ${node.type.getText(source)}`;
  }
  return `const ${name}`;
}

function typeParamsText(node, source) {
  if (!node.typeParameters?.length) return "";
  return `<${node.typeParameters.map((t) => t.getText(source)).join(", ")}>`;
}

/** The `variants` and `defaultVariants` of a `cva()` call, ready for a table. */
function variantsOf(node) {
  const call = initializerOf(node);
  if (!isCvaCall(call)) return null;
  const config = call.arguments[1];
  if (!config || !ts.isObjectLiteralExpression(config)) return null;

  const read = (key) =>
    config.properties.find(
      (p) =>
        ts.isPropertyAssignment(p) &&
        propertyName(p.name) === key &&
        ts.isObjectLiteralExpression(p.initializer),
    )?.initializer;

  const variants = read("variants");
  if (!variants) return null;
  const defaults = read("defaultVariants");

  const defaultFor = new Map();
  for (const p of defaults?.properties ?? []) {
    if (ts.isPropertyAssignment(p) && ts.isStringLiteralLike(p.initializer)) {
      defaultFor.set(propertyName(p.name), p.initializer.text);
    }
  }

  return variants.properties
    .filter(
      (p) =>
        ts.isPropertyAssignment(p) &&
        ts.isObjectLiteralExpression(p.initializer),
    )
    .map((p) => ({
      name: propertyName(p.name),
      options: p.initializer.properties
        .map((o) => propertyName(o.name))
        .filter(Boolean),
      default: defaultFor.get(propertyName(p.name)) ?? null,
    }));
}

function propertyName(name) {
  if (!name) return null;
  if (ts.isIdentifier(name) || ts.isStringLiteralLike(name)) return name.text;
  return null;
}

function collect(absPath) {
  const { text, source } = parse(absPath);
  const declarations = new Map();
  const exported = [];
  const reexports = [];
  const imports = [];
  const slots = new Set();

  const remember = (name, node) => {
    if (name && !declarations.has(name)) declarations.set(name, node);
  };

  for (const statement of source.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name) {
      remember(statement.name.text, statement);
      if (hasExportModifier(statement)) exported.push(statement.name.text);
    } else if (ts.isVariableStatement(statement)) {
      for (const decl of statement.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name)) continue;
        remember(decl.name.text, decl);
        if (hasExportModifier(statement)) exported.push(decl.name.text);
      }
    } else if (
      ts.isTypeAliasDeclaration(statement) ||
      ts.isInterfaceDeclaration(statement)
    ) {
      remember(statement.name.text, statement);
      if (hasExportModifier(statement)) exported.push(statement.name.text);
    } else if (ts.isExportDeclaration(statement)) {
      const from = statement.moduleSpecifier?.text;
      for (const el of statement.exportClause?.elements ?? []) {
        if (from) reexports.push({ name: el.name.text, from });
        else exported.push(el.name.text);
      }
    } else if (ts.isImportDeclaration(statement)) {
      imports.push({
        from: statement.moduleSpecifier.text,
        typeOnly: Boolean(statement.importClause?.isTypeOnly),
      });
    }
  }

  const visit = (node) => {
    if (ts.isJsxAttribute(node) && node.name.getText(source) === "data-slot") {
      const value = node.initializer;
      if (value && ts.isStringLiteral(value)) slots.add(value.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);

  const seen = new Set();
  const api = [];
  for (const name of exported) {
    if (seen.has(name)) continue;
    seen.add(name);
    const node = declarations.get(name);
    if (!node) {
      api.push({ name, kind: "const", signature: `const ${name}`, doc: "" });
      continue;
    }
    api.push({
      name,
      kind: kindOf(node, name),
      signature: signatureOf(node, name, source),
      doc: jsDocOf(docCarrier(node)),
      variants: variantsOf(node),
    });
  }

  return {
    api,
    reexports,
    imports,
    slots: [...slots].sort(),
    clientComponent: text.startsWith('"use client"'),
    fileDoc: fileDocOf(source),
  };
}

/**
 * A JSDoc block that documents the module rather than the declaration under it:
 * one that sits before the first import, or that is followed by a blank line.
 */
function fileDocOf(source) {
  const first = source.statements[0];
  if (!first) return "";
  const doc = jsDocOf(first);
  if (!doc) return "";
  if (ts.isImportDeclaration(first)) return doc;
  return "";
}

// --- the graph of who imports whom -------------------------------------------

function moduleKey(area, name) {
  return `${area.slug}/${name}`;
}

function resolveSpecifier(spec) {
  if (!spec.startsWith("@/")) return null;
  const rel = spec.slice(2);
  for (const area of AREAS) {
    const prefix = `${area.dir.replace(/^src\//, "")}/`;
    if (rel.startsWith(prefix))
      return moduleKey(area, rel.slice(prefix.length));
  }
  return null;
}

// --- writing the markdown ----------------------------------------------------

function readNotes(absDoc) {
  let existing;
  try {
    existing = readFileSync(absDoc, "utf8");
  } catch {
    return "";
  }
  const open = existing.indexOf(NOTES_OPEN);
  const close = existing.indexOf(NOTES_CLOSE);
  if (open === -1 || close === -1 || close < open) return "";
  const notes = existing.slice(open + NOTES_OPEN.length, close).trim();
  return notes === PLACEHOLDER ? "" : notes;
}

/** The first paragraph of the notes, flattened onto one line for `llms.txt`. */
function summaryFrom(notes, fallback) {
  const first = notes
    .split(/\n\s*\n/)[0]
    ?.replace(/\s+/g, " ")
    .trim();
  if (first) return first;
  const flat = fallback
    .split(/\n\s*\n/)[0]
    ?.replace(/\s+/g, " ")
    .trim();
  return flat || "";
}

/** Words a plain capitalise would mangle: "Ui Copy", "State Url", "Otp". */
const ACRONYMS = new Map(
  Object.entries({
    ui: "UI",
    url: "URL",
    otp: "OTP",
    cpf: "CPF",
    cnpj: "CNPJ",
    css: "CSS",
    api: "API",
    id: "ID",
  }),
);

function title(name) {
  return name
    .split("-")
    .map(
      (part) =>
        ACRONYMS.get(part) ?? part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join(" ");
}

function importLine(area, name, api) {
  const names = api.filter((e) => e.kind !== "type").map((e) => e.name);
  const types = api.filter((e) => e.kind === "type").map((e) => e.name);
  const from = `@/${area.dir.replace(/^src\//, "")}/${name}`;
  const lines = [];
  const clause = (prefix, list) => {
    const oneLine = `import ${prefix}{ ${list.join(", ")} } from "${from}";`;
    if (oneLine.length <= 80) return oneLine;
    return `import ${prefix}{\n${list.map((n) => `  ${n},`).join("\n")}\n} from "${from}";`;
  };
  if (names.length) lines.push(clause("", names));
  if (types.length) lines.push(clause("type ", types));
  return lines.join("\n");
}

function renderModule({ area, name, info, usedBy }) {
  const out = [];
  out.push(`# ${title(name)}`);
  out.push("");
  out.push(NOTES_OPEN);
  const notes = readNotes(path.join(DOCS, area.slug, `${name}.md`));
  // Nothing hand-written yet: seed the block from whatever the source already
  // says about itself, so the first read is useful and the prose is editable.
  const seed = info.fileDoc || info.api.find((e) => e.doc)?.doc || "";
  out.push(notes || seed || PLACEHOLDER);
  out.push(NOTES_CLOSE);
  out.push("");

  const meta = [
    `**Source** \`${area.dir}/${name}.${info.tsx ? "tsx" : "ts"}\``,
  ];
  if (area.upstream)
    meta.push(`**Upstream** [${name}.md](${area.upstream(name)})`);
  if (info.clientComponent) meta.push("**Client component**");
  out.push(meta.join(" · "));
  out.push("");

  const imported = importLine(area, name, info.api);
  if (imported) {
    out.push("## Import", "", "```tsx", imported, "```", "");
  }

  if (info.api.length) {
    out.push("## Exports", "");
    for (const entry of info.api) {
      out.push(`### \`${entry.name}\` — ${entry.kind}`, "");
      if (entry.doc) out.push(entry.doc, "");
      out.push("```ts", entry.signature, "```", "");
      if (entry.variants?.length) {
        out.push("| Variant | Options | Default |", "| --- | --- | --- |");
        for (const v of entry.variants) {
          const options = v.options.map((o) => `\`${o}\``).join(" ");
          out.push(
            `| \`${v.name}\` | ${options} | ${v.default ? `\`${v.default}\`` : "—"} |`,
          );
        }
        out.push("");
      }
    }
  }

  if (info.reexports.length) {
    out.push("## Re-exports", "");
    for (const r of info.reexports)
      out.push(`- \`${r.name}\` from \`${r.from}\``);
    out.push("");
  }

  if (info.slots.length) {
    out.push("## Data slots", "");
    out.push(
      "Style against these rather than adding a class of your own: " +
        info.slots.map((s) => `\`[data-slot="${s}"]\``).join(", ") +
        ".",
      "",
    );
  }

  const external = [
    ...new Set(
      info.imports
        .map((i) => i.from)
        .filter((f) => !f.startsWith("@/") && !f.startsWith(".")),
    ),
  ];
  const internal = [
    ...new Set(
      info.imports.map((i) => i.from).filter((f) => f.startsWith("@/")),
    ),
  ];
  if (external.length || internal.length) {
    out.push("## Depends on", "");
    if (external.length)
      out.push(`- Packages: ${external.map((d) => `\`${d}\``).join(", ")}`);
    if (internal.length)
      out.push(
        `- In this project: ${internal.map((d) => `\`${d}\``).join(", ")}`,
      );
    out.push("");
  }

  if (usedBy.length) {
    const shown = usedBy.slice(0, 8).map((k) => `[${k}](../${k}.md)`);
    const rest = usedBy.length - shown.length;
    out.push("## Used by", "");
    out.push(shown.join(", ") + (rest > 0 ? `, and ${rest} more` : ""));
    out.push("");
  }

  return `${out
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()}\n`;
}

function renderIndex(sections, projectName, tagline) {
  const out = [];
  out.push(`# ${projectName}`);
  out.push("");
  out.push(`> ${tagline}`);
  out.push("");
  out.push(
    "Every file under `src/` has a markdown twin below. Read the twin before you write against the file: it carries the exported names, the real signatures, the `cva` variants and the `data-slot` hooks, and it is regenerated from the AST so it cannot drift. `docs/` is generated by `node scripts/generate-docs.mjs`; the prose inside each `<!-- notes -->` block is hand-written and survives a rerun.",
  );
  out.push("");
  out.push("## Start here");
  out.push("");
  out.push(
    "- [AGENTS.md](AGENTS.md): the rules that override your defaults. Read it first, every session.",
  );
  out.push("- [README.md](README.md): what the kit is and how to run it.");
  out.push("");
  out.push("## Guides");
  out.push("");
  for (const [file, blurb] of GUIDES) {
    out.push(
      `- [${title(file.replace(/\.md$/, ""))}](docs/guides/${file}): ${blurb}`,
    );
  }
  out.push("");

  for (const section of sections) {
    if (!section.entries.length) continue;
    out.push(`## ${section.area.title}`);
    out.push("");
    out.push(section.area.blurb);
    out.push("");
    for (const entry of section.entries) {
      const suffix = entry.summary ? `: ${entry.summary}` : "";
      out.push(
        `- [${title(entry.name)}](docs/${section.area.slug}/${entry.name}.md)${suffix}`,
      );
    }
    out.push("");
  }

  return `${out.join("\n").trim()}\n`;
}

// --- main --------------------------------------------------------------------

function main() {
  const check = process.argv.includes("--check");
  const pkg = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8"));

  const modules = [];
  for (const area of AREAS) {
    for (const name of listModules(area.dir)) {
      const abs = fileFor(area.dir, name);
      if (!abs) continue;
      const info = collect(abs);
      info.tsx = abs.endsWith(".tsx");
      modules.push({ area, name, info, key: moduleKey(area, name) });
    }
  }

  const usedBy = new Map();
  for (const mod of modules) {
    for (const imported of mod.info.imports) {
      const key = resolveSpecifier(imported.from);
      if (!key || key === mod.key) continue;
      if (!usedBy.has(key)) usedBy.set(key, []);
      usedBy.get(key).push(mod.key);
    }
  }

  const written = new Map();
  const sections = AREAS.map((area) => ({ area, entries: [] }));

  for (const mod of modules) {
    const body = renderModule({
      area: mod.area,
      name: mod.name,
      info: mod.info,
      usedBy: [...new Set(usedBy.get(mod.key) ?? [])].sort(),
    });
    written.set(path.join(DOCS, mod.area.slug, `${mod.name}.md`), body);

    const notes = readNotes(path.join(DOCS, mod.area.slug, `${mod.name}.md`));
    const fallback =
      mod.info.fileDoc || mod.info.api.find((e) => e.doc)?.doc || "";
    sections
      .find((s) => s.area.slug === mod.area.slug)
      .entries.push({ name: mod.name, summary: summaryFrom(notes, fallback) });
  }

  const index = renderIndex(sections, pkg.name, pkg.description ?? "");
  written.set(path.join(ROOT, "llms.txt"), index);

  let stale = 0;
  for (const [file, body] of written) {
    let current = null;
    try {
      current = readFileSync(file, "utf8");
    } catch {}
    if (current === body) continue;
    stale += 1;
    if (check) {
      console.error(`stale: ${path.relative(ROOT, file)}`);
      continue;
    }
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, body);
  }

  // A component deleted from `src/` leaves its markdown behind otherwise.
  for (const area of AREAS) {
    const dir = path.join(DOCS, area.slug);
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      continue;
    }
    for (const file of entries) {
      const abs = path.join(dir, file);
      if (written.has(abs)) continue;
      stale += 1;
      if (check) console.error(`orphan: ${path.relative(ROOT, abs)}`);
      else rmSync(abs);
    }
  }

  if (check && stale > 0) {
    console.error(
      `\n${stale} file(s) out of date. Run: node scripts/generate-docs.mjs`,
    );
    process.exit(1);
  }
  console.log(
    check
      ? "docs are up to date"
      : `${written.size} file(s) written from ${modules.length} module(s)`,
  );
}

main();
