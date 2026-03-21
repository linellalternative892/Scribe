# Contributing to Scribe

Thank you for your interest in contributing. Scribe is MIT-licensed and welcomes contributions of all kinds — bug fixes, new components, documentation improvements, and feature ideas.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Contributing a Component](#contributing-a-component)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

---

## Getting Started

**Prerequisites:**

- Node.js 20 or later
- npm 10 or later (comes with Node.js 20)
- Git

**Local setup:**

```bash
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/scribe.git
cd scribe

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000/docs](http://localhost:3000/docs). The demo documentation at `src/app/docs/` serves as both the live preview and a test bed for all components.

---

## Development Workflow

```bash
# Create a branch for your work
git checkout -b fix/callout-icon-alignment
# or
git checkout -b feat/accordion-component

# Make your changes, then verify everything builds
npm run build

# Lint and format before committing
npm run lint
npx prettier --write "src/**/*.{ts,tsx,css}"

# Commit with a conventional commit message
git commit -m "fix(callout): align icon vertically with first line of text"

# Push and open a PR against main
git push origin fix/callout-icon-alignment
```

**Branch naming:**

| Type | Pattern | Example |
|---|---|---|
| Bug fix | `fix/description` | `fix/code-tabs-overflow` |
| New feature | `feat/description` | `feat/accordion-component` |
| Documentation | `docs/description` | `docs/theming-guide` |
| Refactor | `refactor/description` | `refactor/sidebar-types` |

---

## Code Style

Scribe uses **Prettier** for formatting and **ESLint** with the Next.js ruleset for linting. Both run automatically in CI. Please format before pushing to avoid noisy diffs.

**Format all files:**

```bash
npx prettier --write "src/**/*.{ts,tsx,css,md}"
```

**Lint:**

```bash
npm run lint
```

**Key conventions:**

- TypeScript everywhere — no `.js` files in `src/`
- Explicit prop types for all components — no implicit `any`
- Named exports for components — no default exports from component files
- `cn()` from `@/lib/utils` for conditional class names — no template literals for Tailwind
- Use `lucide-react` for icons — don't add other icon libraries
- Server Components by default; add `"use client"` only when state or browser APIs are required

**Example component structure:**

```tsx
// src/components/content/MyComponent.tsx

import { cn } from "@/lib/utils";

interface MyComponentProps {
  title: string;
  description?: string;
  className?: string;
}

export function MyComponent({ title, description, className }: MyComponentProps) {
  return (
    <div className={cn("rounded-lg border border-border p-4", className)}>
      <p className="font-medium text-foreground">{title}</p>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
```

---

## Submitting a Pull Request

1. **Keep PRs focused.** One concern per PR — don't bundle an unrelated bug fix with a new feature.
2. **Write a clear description.** Explain *what* you changed and *why*. Link to the issue if one exists.
3. **Test your changes.** Run `npm run build` to catch type errors and build failures before submitting.
4. **Update documentation.** If you changed how something works, update the relevant `.mdx` file in `src/app/docs/`.
5. **No breaking changes without discussion.** If your change modifies a public prop interface or removes a feature, open an issue first to discuss it.

**PR title format** (mirrors conventional commits):

```
fix(callout): align icon with first line of text
feat(steps): add optional icon per step
docs(readme): add Docker deploy instructions
refactor(sidebar): extract NavGroup into its own file
```

---

## Contributing a Component

Components live in `src/components/content/`. If you're adding a new documentation component, follow this checklist:

- [ ] **Props are fully typed** with a `interface XxxProps` block above the component
- [ ] **Accepts a `className` prop** and merges it with `cn()` — allows callers to override spacing
- [ ] **Uses CSS variables** (`text-foreground`, `bg-muted`, `border-border`) — not hardcoded colors — so it respects light/dark mode and the user's `primaryColor` setting
- [ ] **Keyboard accessible** — if interactive (tabs, dialogs, dropdowns), uses the appropriate Radix UI primitive
- [ ] **Mobile-friendly** — tested at 375px width
- [ ] **Documented in the demo** — add a usage example to `src/app/docs/` so it appears in the live preview
- [ ] **No new dependencies** without prior discussion in an issue — bundle size matters

**Lucide icon usage:**

```tsx
// Good — named import, tree-shakeable
import { AlertTriangle } from "lucide-react";

// Bad — wildcard import
import * as Icons from "lucide-react";
```

---

## Reporting Bugs

Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md) when opening an issue.

Include:

- What you expected to happen
- What actually happened (error message, screenshot if visual)
- Steps to reproduce (minimal reproduction preferred)
- Your environment: OS, Node.js version, Next.js version, browser

---

## Requesting Features

Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md) when opening an issue.

Before opening, search existing issues to avoid duplicates. Good feature requests include:

- A concrete use case (not just "it would be nice if...")
- What you'd expect the API/props to look like
- Whether you'd be willing to implement it yourself

---

## Questions

For general questions, open a [GitHub Discussion](https://github.com/RapierCraft/scribe/discussions) rather than an issue. Issues are for bugs and confirmed feature requests.
