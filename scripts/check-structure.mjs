import fs from "node:fs";
import path from "node:path";

/**
 * Structural rules that a linter has no opinion about.
 *
 * These are conventions that were written down and then broken anyway, which
 * is the argument for checking them instead of documenting them.
 */

const failures = [];

function walk(dir, visit) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, visit);
    } else {
      visit(full);
    }
  }
}

// A file with no JSX is not a component. Helpers, constants and clients live
// in src/lib/, even when only components import them.
walk("src/components", (file) => {
  if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
    failures.push(
      `${file.replace(/\\/g, "/")} is a .ts file under src/components — move it to src/lib/`,
    );
  }
});

if (failures.length) {
  console.error("Structure check failed:\n");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  console.error("");
  process.exit(1);
}
