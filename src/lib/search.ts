import type { SearchItem } from "./types";

// In production, this index is generated at build time via `npm run generate-search`
// and loaded from /public/search-index.json. During development, we use a sample set.
let cachedIndex: SearchItem[] | null = null;

export async function loadSearchIndex(): Promise<SearchItem[]> {
  if (cachedIndex) return cachedIndex;

  try {
    const res = await fetch("/search-index.json");
    if (res.ok) {
      cachedIndex = await res.json();
      return cachedIndex as SearchItem[];
    }
  } catch {
    // Fall through to sample data
  }

  // Sample data for development / first run
  cachedIndex = SAMPLE_SEARCH_INDEX;
  return cachedIndex;
}

export function searchItems(index: SearchItem[], query: string): SearchItem[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase().trim();
  const terms = q.split(/\s+/);

  const scored = index.map((item) => {
    const haystack = [
      item.title,
      item.description,
      item.section,
      item.path ?? "",
      item.errorCode ?? "",
      ...(item.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();

    let score = 0;

    for (const term of terms) {
      if (item.title.toLowerCase().includes(term)) score += 10;
      if (item.description.toLowerCase().includes(term)) score += 5;
      if (item.section.toLowerCase().includes(term)) score += 3;
      if (haystack.includes(term)) score += 1;
    }

    // Exact title match boost
    if (item.title.toLowerCase() === q) score += 50;
    // Starts-with title boost
    if (item.title.toLowerCase().startsWith(q)) score += 20;

    return { item, score };
  });

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map(({ item }) => item);
}

const SAMPLE_SEARCH_INDEX: SearchItem[] = [
  {
    id: "intro",
    title: "Introduction",
    description: "Overview of Acme API and what you can build with it.",
    href: "/docs",
    section: "Getting Started",
    type: "page",
    keywords: ["overview", "welcome", "start", "about"],
  },
  {
    id: "installation",
    title: "Installation",
    description: "Install the Acme SDK or use the REST API directly.",
    href: "/docs/getting-started/installation",
    section: "Getting Started",
    type: "page",
    keywords: ["install", "npm", "yarn", "pip", "sdk", "setup"],
  },
  {
    id: "quickstart",
    title: "Quick Start",
    description: "Make your first API call in under 5 minutes.",
    href: "/docs/getting-started/quickstart",
    section: "Getting Started",
    type: "page",
    keywords: ["quickstart", "first call", "hello world", "example"],
  },
  {
    id: "authentication",
    title: "Authentication",
    description: "Secure your API requests using API keys and OAuth tokens.",
    href: "/docs/getting-started/authentication",
    section: "Getting Started",
    type: "page",
    keywords: ["auth", "api key", "bearer", "oauth", "token", "security"],
  },
  {
    id: "endpoints",
    title: "Endpoints",
    description: "Complete reference for all Acme API endpoints.",
    href: "/docs/api/endpoints",
    section: "API Reference",
    type: "page",
    keywords: ["endpoints", "routes", "rest", "http"],
  },
  {
    id: "endpoint-create-payment",
    title: "POST /payments",
    description: "Create a new payment intent.",
    href: "/docs/api/endpoints#create-payment",
    section: "API Reference",
    type: "endpoint",
    method: "POST",
    path: "/payments",
    keywords: ["create", "payment", "intent", "charge"],
  },
  {
    id: "endpoint-get-payment",
    title: "GET /payments/:id",
    description: "Retrieve a payment by its unique ID.",
    href: "/docs/api/endpoints#get-payment",
    section: "API Reference",
    type: "endpoint",
    method: "GET",
    path: "/payments/:id",
    keywords: ["get", "retrieve", "payment", "fetch"],
  },
  {
    id: "endpoint-list-payments",
    title: "GET /payments",
    description: "List all payments with optional filters.",
    href: "/docs/api/endpoints#list-payments",
    section: "API Reference",
    type: "endpoint",
    method: "GET",
    path: "/payments",
    keywords: ["list", "payments", "filter", "paginate"],
  },
  {
    id: "endpoint-refund",
    title: "POST /refunds",
    description: "Initiate a full or partial refund for a payment.",
    href: "/docs/api/endpoints#refund",
    section: "API Reference",
    type: "endpoint",
    method: "POST",
    path: "/refunds",
    keywords: ["refund", "cancel", "reverse"],
  },
  {
    id: "errors",
    title: "Error Codes",
    description: "Understand and handle Acme API error responses.",
    href: "/docs/api/errors",
    section: "API Reference",
    type: "page",
    keywords: ["errors", "status codes", "exceptions", "troubleshoot"],
  },
  {
    id: "error-401",
    title: "401 Unauthorized",
    description: "Invalid or missing API key.",
    href: "/docs/api/errors#401",
    section: "API Reference",
    type: "error",
    errorCode: "401",
    keywords: ["unauthorized", "auth", "api key", "invalid"],
  },
  {
    id: "error-422",
    title: "422 Unprocessable Entity",
    description: "Request body failed validation.",
    href: "/docs/api/errors#422",
    section: "API Reference",
    type: "error",
    errorCode: "422",
    keywords: ["validation", "invalid", "body", "schema"],
  },
  {
    id: "error-429",
    title: "429 Too Many Requests",
    description: "You have exceeded your rate limit.",
    href: "/docs/api/errors#429",
    section: "API Reference",
    type: "error",
    errorCode: "429",
    keywords: ["rate limit", "throttle", "too many requests"],
  },
  {
    id: "rate-limits",
    title: "Rate Limits",
    description: "Default limits per tier and how to handle 429 responses.",
    href: "/docs/api/rate-limits",
    section: "API Reference",
    type: "page",
    keywords: ["rate limit", "throttle", "429", "quotas"],
  },
  {
    id: "webhooks",
    title: "Webhooks",
    description: "Receive real-time event notifications from Acme API.",
    href: "/docs/guides/webhooks",
    section: "Guides",
    type: "page",
    keywords: ["webhooks", "events", "callbacks", "notifications", "http"],
  },
  {
    id: "sdks",
    title: "SDKs",
    description: "Official SDKs for Node.js, Python, Go, and Ruby.",
    href: "/docs/guides/sdks",
    section: "Guides",
    type: "page",
    keywords: ["sdk", "library", "client", "node", "python", "go", "ruby"],
  },
  {
    id: "configuration",
    title: "Configuration",
    description: "Configure Scribe to match your product's branding and navigation.",
    href: "/docs/guides/configuration",
    section: "Guides",
    type: "page",
    keywords: ["config", "scribe.config", "setup", "customize"],
  },
  {
    id: "theming",
    title: "Theming",
    description: "Customize colors, fonts, and dark mode for your docs site.",
    href: "/docs/guides/theming",
    section: "Guides",
    type: "page",
    keywords: ["theme", "colors", "dark mode", "fonts", "css", "branding"],
  },
  {
    id: "deployment",
    title: "Deployment",
    description: "Deploy your Scribe docs to Vercel, Netlify, or any Node host.",
    href: "/docs/guides/deployment",
    section: "Guides",
    type: "page",
    keywords: ["deploy", "vercel", "netlify", "hosting", "production"],
  },
];
