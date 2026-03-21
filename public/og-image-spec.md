# OG Image Specification

**Dimensions**: 1200 × 630 px
**Format**: PNG (generated) / SVG (source)
**File**: `public/og-image.png`

## Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                           1200×630   │
│  Background: #09090b (zinc-950) with subtle radial glow              │
│             centered indigo (#6366f1, 8% opacity)                    │
│                                                                       │
│  ┌────────────────────────────┐                                      │
│  │  [Logo 64×64]  Scribe      │   ← top-left, 60px from edges       │
│  └────────────────────────────┘                                      │
│                                                                       │
│                                                                       │
│   Beautiful documentation,               ← 72px, white, Inter bold  │
│   zero vendor lock-in.                                               │
│                                                                       │
│   The open-source Mintlify alternative   ← 28px, zinc-400, Inter    │
│   built on Next.js App Router.                                       │
│                                                                       │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Component preview strip (3 cards, 32px gap):                │   │
│  │  [Callout card] [CodeTabs card] [ApiEndpoint card]           │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│   MIT License · Next.js 15 · TypeScript   ← 20px, zinc-500          │
│                                                         60px bottom  │
└─────────────────────────────────────────────────────────────────────┘
```

## Colors

| Element | Color | Notes |
|---|---|---|
| Background | `#09090b` | zinc-950 |
| Background glow | `#6366f1` at 8% | Radial, centered |
| Logo accent | `#6366f1` | indigo-500 |
| Headline | `#fafafa` | zinc-50 |
| Subheadline | `#a1a1aa` | zinc-400 |
| Badges | `#27272a` border, `#3f3f46` bg | zinc-800/700 |
| Card bg | `#18181b` | zinc-900 |
| Card border | `#27272a` | zinc-800 |

## Typography

| Element | Font | Size | Weight |
|---|---|---|---|
| "Scribe" wordmark | Inter | 32px | 700 |
| Headline | Inter | 68px | 800 |
| Subheadline | Inter | 26px | 400 |
| Badges | Inter Mono | 18px | 500 |

## Component Preview Cards

Each card is 320×110px, `bg-zinc-900`, `border border-zinc-800`, `rounded-lg`.

**Card 1 — Callout**:
- Amber left border (4px)
- Warning icon + "Breaking Change" heading (14px, white)
- Body text (12px, zinc-400): "The v2 API requires authentication..."

**Card 2 — Code Tabs**:
- Tab strip: JavaScript | Python | cURL (active tab underlined in indigo)
- Code block: dark bg, `fetch('/api/data')` in syntax-highlighted monospace

**Card 3 — API Endpoint**:
- `POST` badge (green pill) + `/api/v1/users` path (white mono)
- Parameter rows (12px, zinc-400): `email string required`

## Generation

To produce the final PNG, use Satori + sharp (or Puppeteer screenshot):

```ts
// scripts/generate-og.ts
import satori from "satori";
import sharp from "sharp";
import fs from "fs";

// Render OG component → SVG string → PNG via sharp
```

Or open `http://localhost:3000/api/og` once the framework is wired up —
Next.js ImageResponse can render this at runtime.
