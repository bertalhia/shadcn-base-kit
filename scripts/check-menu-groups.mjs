import fs from "node:fs";
import path from "node:path";

/**
 * Base UI reads a group context from menu label parts, so a label rendered
 * outside its group throws at render:
 *
 *   Base UI: MenuGroupContext is missing. Menu group parts must be used
 *   within <Menu.Group> or <Menu.RadioGroup>.
 *
 * TypeScript cannot see it — the props are valid either way — so it only
 * shows up when someone opens that menu. This walks the JSX tag stack per
 * file and checks each label has a group open above it.
 */

const rules = [
  {
    label: "DropdownMenuLabel",
    groups: ["DropdownMenuGroup", "DropdownMenuRadioGroup"],
  },
  {
    label: "ContextMenuLabel",
    groups: ["ContextMenuGroup", "ContextMenuRadioGroup"],
  },
  { label: "MenubarLabel", groups: ["MenubarGroup", "MenubarRadioGroup"] },
  { label: "SelectLabel", groups: ["SelectGroup"] },
];

const labels = new Set(rules.map((rule) => rule.label));
const groupFor = new Map(rules.map((rule) => [rule.label, rule.groups]));

const failures = [];

function walk(dir, visit) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, visit);
    else visit(full.replace(/\\/g, "/"));
  }
}

walk("src", (file) => {
  if (!file.endsWith(".tsx")) return;
  const source = fs.readFileSync(file, "utf8");

  const stack = [];
  // Matches an opening, closing or self-closing JSX tag with a capitalised name.
  const tags = source.matchAll(/<(\/?)([A-Z][A-Za-z]*)([^>]*?)(\/?)>/g);

  for (const tag of tags) {
    const [, closing, name, attrs, selfClosing] = tag;

    if (closing) {
      const index = stack.lastIndexOf(name);
      if (index !== -1) stack.length = index;
      continue;
    }

    if (labels.has(name)) {
      const wanted = groupFor.get(name) ?? [];
      // Only a label inside a menu being composed is a call site. One in a
      // wrapper component's own definition has no Content around it, and the
      // group requirement lands on whoever renders that wrapper.
      const insideMenu = stack.some((open) =>
        /(Menu|Select)Content$/.test(open),
      );
      if (insideMenu && !wanted.some((group) => stack.includes(group))) {
        const line = source.slice(0, tag.index).split("\n").length;
        failures.push(
          `${file}:${line} — <${name}> needs a ${wanted.join(" or ")} above it, or Base UI throws when the menu opens`,
        );
      }
    }

    const isSelfClosing = selfClosing === "/" || attrs.trimEnd().endsWith("/");
    if (!isSelfClosing) stack.push(name);
  }
});

if (failures.length) {
  console.error("Menu group check failed:\n");
  for (const failure of failures) console.error(`  ${failure}`);
  console.error("");
  process.exit(1);
}
