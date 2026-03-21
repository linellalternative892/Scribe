import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  Key,
  BookOpen,
  Webhook,
  Package,
  ArrowRight,
  Terminal,
  Globe,
  Shield,
  Clock,
} from "lucide-react";
import { DocsLayout } from "@/components/layout/DocsLayout";
import { Callout } from "@/components/content/Callout";
import { CodeBlock } from "@/components/content/CodeBlock";
import { Card } from "@/components/content/Card";
import { CardGrid } from "@/components/content/CardGrid";
import type { TOCItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "Welcome to Acme API — the fastest way to build payment infrastructure. Simple, reliable, and developer-first.",
};

const toc: TOCItem[] = [
  { id: "what-is-acme-api", title: "What is Acme API?", level: 2 },
  { id: "key-features", title: "Key Features", level: 2 },
  { id: "quick-start", title: "Quick Start", level: 2 },
  { id: "next-steps", title: "Next Steps", level: 2 },
];

export default function DocsIndexPage() {
  return (
    <DocsLayout tableOfContents={toc}>
      {/* Hero */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          v2.0 — Now Generally Available
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
          Acme API Documentation
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          The fastest way to build payment infrastructure. Process payments, manage subscriptions,
          send payouts, and build financial products — all through a single, elegant API.
        </p>

        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="/docs/getting-started/installation"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get started
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/docs/api/endpoints"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/60 transition-colors"
          >
            <Terminal className="h-4 w-4" />
            API Reference
          </Link>
        </div>
      </div>

      <hr className="border-border my-8" />

      {/* What is Acme API */}
      <section id="what-is-acme-api">
        <h2 className="text-xl font-semibold text-foreground tracking-tight mt-10 mb-4 pb-2 border-b border-border">
          What is Acme API?
        </h2>
        <p className="text-muted-foreground leading-7 my-4">
          Acme API is a developer-first payment platform that lets you accept payments from anywhere
          in the world. Whether you&apos;re building a SaaS product, marketplace, or e-commerce
          store, Acme handles the complexity of financial infrastructure so you can focus on your
          product.
        </p>
        <p className="text-muted-foreground leading-7 my-4">
          Unlike traditional payment providers, Acme is API-first with no dashboard lock-in.
          Everything you can do in the UI, you can do via the API — with full programmatic control,
          webhooks, and a type-safe SDK for every major language.
        </p>

        <Callout type="info" title="Built for developers">
          Acme API follows REST conventions, returns predictable JSON responses, and uses standard
          HTTP status codes. If you&apos;ve used any modern REST API, you&apos;ll feel right at home.
        </Callout>
      </section>

      {/* Key features */}
      <section id="key-features">
        <h2 className="text-xl font-semibold text-foreground tracking-tight mt-10 mb-4 pb-2 border-b border-border">
          Key Features
        </h2>

        <CardGrid cols={2}>
          <Card
            title="Global Payments"
            description="Accept 135+ currencies across 47 countries. Local payment methods included — cards, wallets, bank transfers."
            icon={<Globe className="h-4 w-4" />}
          />
          <Card
            title="Instant Payouts"
            description="Pay out to bank accounts and debit cards in minutes, not days. Available in 30+ countries."
            icon={<Zap className="h-4 w-4" />}
          />
          <Card
            title="Smart Authentication"
            description="3D Secure 2.0, SCA-ready, fraud scoring, and machine-learning dispute prevention built-in."
            icon={<Shield className="h-4 w-4" />}
          />
          <Card
            title="Subscriptions"
            description="Metered billing, usage-based pricing, trials, and proration — all managed automatically."
            icon={<Clock className="h-4 w-4" />}
          />
          <Card
            title="Official SDKs"
            description="Type-safe SDKs for Node.js, Python, Go, Ruby, and PHP. Auto-generated from OpenAPI spec."
            icon={<Package className="h-4 w-4" />}
            href="/docs/guides/sdks"
            badge="New"
          />
          <Card
            title="Real-time Webhooks"
            description="Get notified instantly when anything changes. Retry logic, signature verification, and replay built-in."
            icon={<Webhook className="h-4 w-4" />}
            href="/docs/guides/webhooks"
          />
        </CardGrid>
      </section>

      {/* Quick start */}
      <section id="quick-start">
        <h2 className="text-xl font-semibold text-foreground tracking-tight mt-10 mb-4 pb-2 border-b border-border">
          Quick Start
        </h2>
        <p className="text-muted-foreground leading-7 my-4">
          Make your first API call in under two minutes. All you need is an API key — no account
          setup required for testing.
        </p>

        <ol className="text-muted-foreground leading-7 my-4 ml-6 list-decimal space-y-1.5">
          <li>
            <Link href="/docs/getting-started/installation" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
              Install the SDK
            </Link>{" "}
            or use the REST API directly with any HTTP client.
          </li>
          <li>
            <Link href="/docs/getting-started/authentication" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
              Authenticate
            </Link>{" "}
            with your API key — pass it in the{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.15rem] font-mono text-[0.85em] text-foreground">
              Authorization
            </code>{" "}
            header.
          </li>
          <li>Create a payment intent and confirm it with the client SDK.</li>
          <li>Listen for the{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.15rem] font-mono text-[0.85em] text-foreground">
              payment.succeeded
            </code>{" "}
            webhook to fulfil the order.
          </li>
        </ol>

        <CodeBlock language="bash" filename="curl example">
{`# Create a payment intent
curl -X POST https://api.acme.dev/v1/payments \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2000,
    "currency": "usd",
    "description": "Order #1234",
    "metadata": {
      "customer_id": "cus_abc123"
    }
  }'`}
        </CodeBlock>

        <CodeBlock language="json" filename="Response">
{`{
  "id": "pay_01HXZ7KBPM2QGQAZ5JRPEY8AX",
  "object": "payment",
  "amount": 2000,
  "currency": "usd",
  "status": "requires_payment_method",
  "client_secret": "pay_01HXZ7..._secret_QZKpHnHF",
  "description": "Order #1234",
  "created_at": "2026-03-21T10:00:00Z",
  "metadata": {
    "customer_id": "cus_abc123"
  }
}`}
        </CodeBlock>

        <Callout type="warning" title="Keep your API key secret">
          Never expose your secret API key (
          <code className="font-mono text-xs">sk_live_...</code>) in client-side code or public
          repositories. Use{" "}
          <code className="font-mono text-xs">pk_live_...</code> public keys in the browser.
        </Callout>
      </section>

      {/* Next steps */}
      <section id="next-steps">
        <h2 className="text-xl font-semibold text-foreground tracking-tight mt-10 mb-4 pb-2 border-b border-border">
          Next Steps
        </h2>
        <p className="text-muted-foreground leading-7 my-4">
          Ready to build? Pick your path below.
        </p>

        <CardGrid cols={2}>
          <Card
            title="Installation"
            description="Install the SDK for your language and configure your environment."
            href="/docs/getting-started/installation"
            icon={<Terminal className="h-4 w-4" />}
          />
          <Card
            title="Authentication"
            description="Learn how API keys work and how to secure your integration."
            href="/docs/getting-started/authentication"
            icon={<Key className="h-4 w-4" />}
          />
          <Card
            title="API Reference"
            description="Complete endpoint documentation with examples in every language."
            href="/docs/api/endpoints"
            icon={<BookOpen className="h-4 w-4" />}
          />
          <Card
            title="Webhooks Guide"
            description="Receive real-time events and build reliable event-driven workflows."
            href="/docs/guides/webhooks"
            icon={<Webhook className="h-4 w-4" />}
          />
        </CardGrid>
      </section>
    </DocsLayout>
  );
}
