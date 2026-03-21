/**
 * Search index generator for Scribe.
 *
 * Run at build time via: npm run generate-search
 * Output: public/search-index.json
 *
 * This script walks the scribe.config.ts navigation tree, reads each MDX/MD
 * page from the file system, extracts headings + first paragraph for
 * description, and writes a flat JSON array that the client-side search modal
 * reads from /public/search-index.json.
 */

import fs from "fs";
import path from "path";
import type { SearchItem, NavItem } from "../src/lib/types";

const ROOT = path.resolve(__dirname, "..");
const PAGES_DIR = path.join(ROOT, "src", "app");
const OUT_FILE = path.join(ROOT, "public", "search-index.json");

// Dynamically load config (transpiled by tsx)
async function loadConfig() {
  // tsx handles the TypeScript import
  const { default: config } = await import("../scribe.config");
  return config;
}

/** Recursively collect all nav items into a flat list */
function flattenNav(items: NavItem[], section = ""): Array<{ href: string; title: string; section: string }> {
  const result: Array<{ href: string; title: string; section: string }> = [];
  for (const item of items) {
    if (item.href && !item.external) {
      result.push({ href: item.href, title: item.title, section });
    }
    if (item.items) {
      const parentSection = section || item.title;
      result.push(...flattenNav(item.items, parentSection));
    }
  }
  return result;
}

/** Convert a route path like /docs/api/endpoints to a file path */
function routeToFilePath(href: string): string[] {
  // Try: src/app{href}/page.tsx, src/app{href}/page.mdx, src/app{href}.mdx
  const base = path.join(PAGES_DIR, href);
  return [
    path.join(base, "page.tsx"),
    path.join(base, "page.mdx"),
    path.join(base, "page.md"),
    base + ".mdx",
    base + ".md",
  ];
}

/** Extract the first h1/h2 and first paragraph from file content */
function extractContent(content: string): { title?: string; description?: string; keywords: string[] } {
  // Extract headings (# or ## prefixed lines)
  const headingMatch = content.match(/^#{1,2}\s+(.+)$/m);
  const title = headingMatch ? headingMatch[1].trim() : undefined;

  // Extract first non-empty paragraph (lines that aren't headings, code, imports, etc.)
  const lines = content.split("\n");
  let description = "";
  for (const line of lines) {
    const trimmed = line.trim();
    if (
      trimmed &&
      !trimmed.startsWith("#") &&
      !trimmed.startsWith("```") &&
      !trimmed.startsWith("import ") &&
      !trimmed.startsWith("export ") &&
      !trimmed.startsWith("<") &&
      !trimmed.startsWith("//") &&
      !trimmed.startsWith("*") &&
      !trimmed.startsWith("-") &&
      trimmed.length > 20
    ) {
      // Strip JSX/MDX component syntax and markdown links
      description = trimmed
        .replace(/<[^>]+>/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[`*_]/g, "")
        .substring(0, 160);
      if (description.length > 30) break;
    }
  }

  // Extract keywords from all headings
  const allHeadings = Array.from(content.matchAll(/^#{1,4}\s+(.+)$/gm));
  const keywordsSet = new Set(
    allHeadings
      .map((m) => m[1].toLowerCase().trim())
      .flatMap((h) => h.split(/[\s,.-]+/))
      .filter((k) => k.length > 2)
  );

  return { title, description, keywords: Array.from(keywordsSet) };
}

async function main() {
  const config = await loadConfig();
  const navItems = flattenNav(config.navigation);

  const index: SearchItem[] = [];
  let idCounter = 0;

  for (const nav of navItems) {
    // Look for the file
    const candidates = routeToFilePath(nav.href);
    let fileContent = "";
    let found = false;

    for (const candidate of candidates) {
      if (fs.existsSync(candidate)) {
        fileContent = fs.readFileSync(candidate, "utf8");
        found = true;
        break;
      }
    }

    const { description, keywords } = found
      ? extractContent(fileContent)
      : { description: `${nav.title} documentation.`, keywords: [] };

    index.push({
      id: `page-${idCounter++}`,
      title: nav.title,
      description: description || `${nav.title} documentation.`,
      href: nav.href,
      section: nav.section,
      type: "page",
      keywords,
    });
  }

  // Ensure public dir exists
  const publicDir = path.join(ROOT, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(index, null, 2));
  console.log(`Search index written to ${OUT_FILE} (${index.length} entries)`);
}

main().catch((err) => {
  console.error("Failed to generate search index:", err);
  process.exit(1);
});
