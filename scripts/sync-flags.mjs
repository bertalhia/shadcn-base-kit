import fs from "node:fs";
import path from "node:path";

/**
 * Copies the country flag SVGs into public/ so the browser can fetch them.
 *
 * The alternative is importing the package's React components, but a country
 * list needs every flag, so nothing tree-shakes and roughly 900 KB of SVG ends
 * up in the client bundle. As files, only the rows a person actually sees get
 * fetched, and each one is about a kilobyte and cacheable.
 *
 * Runs before dev and build, so the flags track the installed package version
 * rather than being committed and drifting.
 */

const source = "node_modules/country-flag-icons/3x2";
const target = "public/flags";

if (!fs.existsSync(source)) {
  console.error(
    `sync-flags: ${source} is missing — is country-flag-icons installed?`,
  );
  process.exit(1);
}

fs.mkdirSync(target, { recursive: true });

let copied = 0;
for (const file of fs.readdirSync(source)) {
  if (!file.endsWith(".svg")) continue;
  const to = path.join(target, file.toLowerCase());
  if (!fs.existsSync(to)) {
    fs.copyFileSync(path.join(source, file), to);
    copied += 1;
  }
}

if (copied) {
  console.log(`sync-flags: copied ${copied} flags into ${target}`);
}
