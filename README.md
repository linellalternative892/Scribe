<div align="center">

<img src="public/scribe-logo.svg" alt="Scribe" width="72" height="72" />

# Scribe

**Beautiful documentation, zero vendor lock-in.**

The open-source alternative to Mintlify — built on Next.js App Router.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

[Demo](https://scribedocs.vercel.app) · [Quick Start](#quick-start) · [Components](#components) · [Configuration](#configuration)

</div>

<br />

<img src="public/screenshots/full-page-dark.png" alt="Scribe — dark mode documentation" width="100%" />

<br />

---

## Quick Start

```bash
git clone https://github.com/RapierCraft/scribe.git my-docs
cd my-docs && npm install
npm run dev
```

Open [http://localhost:3000/docs](http://localhost:3000/docs). Your first page is at `src/app/docs/page.mdx`.

---

## Features

#### Components
| | |
|---|---|
| **Callout** | Info, warning, success, and danger blocks with icons |
| **CodeTabs** | Multi-language examples with syntax highlighting and copy button |
| **ApiEndpoint** | HTTP method badge, parameter table, request/response examples |
| **Steps** | Numbered step sequences with optional per-step code |
| **Cards** | Navigation cards with icons and hover effects |
| **CodeBlock** | 30+ languages, line highlighting, one-click copy |

#### Navigation
| | |
|---|---|
| **Sidebar** | Collapsible groups, badge support, external link indicators |
| **Search** | Full-text search with keyboard navigation (`/` to open) |
| **Table of Contents** | Auto-generated, scroll-tracking active state |
| **Version Switcher** | Dropdown to switch between API versions |

#### Developer Experience
| | |
|---|---|
| **Single config file** | Everything in `scribe.config.ts` — no scattered env vars |
| **MDX support** | Drop any component directly into `.mdx` pages |
| **shadcn/ui compatible** | CSS variables wired to shadcn — drop in any component |
| **Dark / light mode** | Built-in, zero flash, system preference aware |
| **Server Components** | App Router native — no legacy React patterns |

---

## Why Scribe?

|  | Mintlify | Docusaurus | Nextra | Fumadocs | **Scribe** |
|---|:---:|:---:|:---:|:---:|:---:|
| **Free** | ✗ | ✓ | ✓ | ✓ | ✓ |
| **Self-hosted** | ✗ | ✓ | ✓ | ✓ | ✓ |
| **Next.js App Router** | ✗ | ✗ | ✗ | ✓ | ✓ |
| **API docs component** | ✓ | ✗ | ✗ | ✗ | ✓ |
| **Code tabs** | ✓ | Plugin | ✗ | Plugin | ✓ |
| **Full-text search** | Paid | Plugin | ✓ | ✓ | ✓ |
| **shadcn/ui compatible** | ✗ | ✗ | ✗ | Partial | ✓ |
| **Vendor lock-in** | ✓ | ✗ | ✗ | ✗ | ✗ |

---

## Screenshots

<table>
<tr>
<td width="50%">
<img src="public/screenshots/hero-dark.png" alt="Dark mode" />
<p align="center"><sub>Dark mode</sub></p>
</td>
<td width="50%">
<img src="public/screenshots/hero-light.png" alt="Light mode" />
<p align="center"><sub>Light mode</sub></p>
</td>
</tr>
<tr>
<td colspan="2">
<img src="public/screenshots/search-results.png" alt="Built-in search" />
<p align="center"><sub>Full-text search</sub></p>
</td>
</tr>
</table>

---

## Configuration

One file controls everything.

```typescript
// scribe.config.ts
const config: ScribeConfig = {
  name: "My Product",
  description: "The fastest way to ship your API.",
  url: "https://docs.myproduct.com",
  logo: { light: "/logo-light.svg", dark: "/logo-dark.svg" },
  theme: { primaryColor: "#6366f1", font: "Inter" },
  navigation: [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "/docs" },
        { title: "Quick Start", href: "/docs/quickstart" },
      ],
    },
  ],
  search: { enabled: true, shortcut: "/" },
  versions: ["v2.0", "v1.9"],
};
```

Change `primaryColor` and every component updates. Compatible with any shadcn/ui theme.

---

## Deploy

| Platform | Command |
|---|---|
| **Vercel** | `vercel deploy` |
| **Netlify** | `netlify deploy --build` |
| **Docker** | `docker build -t my-docs . && docker run -p 3000:3000 my-docs` |
| **Static** | Add `output: "export"` to `next.config.js`, then `npm run build` |
| **Self-hosted** | `npm run build && npm start` |

---

## Used By

*Building something with Scribe? [Open a PR](https://github.com/RapierCraft/scribe/pulls) to add your project here.*

---

## Contributing

```bash
git clone https://github.com/RapierCraft/scribe.git
cd scribe && npm install && npm run dev
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

[MIT](LICENSE) — use it for anything, forever.

---

<div align="center">

If Scribe saved you from a $150/mo docs bill, a ⭐ helps others find it.

**[Star on GitHub](https://github.com/RapierCraft/scribe)**

</div>
