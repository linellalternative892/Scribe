import { ScribeConfig } from "./src/lib/types";

const config: ScribeConfig = {
  // Site metadata
  name: "Acme API",
  description: "The fastest way to build payment infrastructure. Simple, reliable, and developer-first.",
  url: "https://docs.acme.dev",

  // Branding
  logo: {
    light: "/logo-light.svg",
    dark: "/logo-dark.svg",
    text: "Acme API",
  },

  // Theme
  theme: {
    primaryColor: "#6366f1", // indigo-500
    font: "Inter",
    monoFont: "JetBrains Mono",
    radius: "0.5rem",
  },

  // Navigation
  navigation: [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "/docs" },
        { title: "Installation", href: "/docs/getting-started/installation" },
        { title: "Quick Start", href: "/docs/getting-started/quickstart" },
        { title: "Authentication", href: "/docs/getting-started/authentication" },
      ],
    },
    {
      title: "API Reference",
      items: [
        { title: "Endpoints", href: "/docs/api/endpoints" },
        { title: "Request Format", href: "/docs/api/request-format" },
        { title: "Response Format", href: "/docs/api/response-format" },
        { title: "Error Codes", href: "/docs/api/errors" },
        { title: "Rate Limits", href: "/docs/api/rate-limits" },
      ],
    },
    {
      title: "Guides",
      items: [
        { title: "Configuration", href: "/docs/guides/configuration" },
        { title: "Webhooks", href: "/docs/guides/webhooks" },
        { title: "SDKs", href: "/docs/guides/sdks", badge: "New" },
        { title: "Deployment", href: "/docs/guides/deployment" },
        { title: "Theming", href: "/docs/guides/theming" },
      ],
    },
    {
      title: "Resources",
      items: [
        { title: "Changelog", href: "/docs/changelog" },
        { title: "Status Page", href: "https://status.acme.dev", external: true },
        { title: "Community", href: "https://discord.gg/acme", external: true },
      ],
    },
  ],

  // Top navigation bar links
  topNav: [
    { href: "/docs", label: "Docs" },
    { href: "/docs/api/endpoints", label: "API Reference" },
    { href: "/docs/guides/sdks", label: "SDKs" },
    { href: "https://github.com/rapiercraft/scribe", label: "GitHub", external: true },
  ],

  // Top bar actions
  actions: {
    primaryButton: { label: "Get Started", href: "/docs/getting-started/installation" },
    secondaryButton: { label: "GitHub", href: "https://github.com/rapiercraft/scribe" },
  },

  // Search
  search: {
    enabled: true,
    shortcut: "/",
  },

  // Version switcher
  versions: ["v2.0", "v1.9", "v1.8"],

  // Footer
  footer: {
    links: [
      { title: "GitHub", href: "https://github.com/rapiercraft/scribe" },
      { title: "Twitter", href: "https://twitter.com/acmeapi" },
      { title: "Discord", href: "https://discord.gg/acme" },
    ],
    copyright: "Acme Inc.",
  },

  // SEO
  seo: {
    titleTemplate: "%s | Acme API Docs",
    ogImage: "/og-image.png",
  },
};

export default config;
