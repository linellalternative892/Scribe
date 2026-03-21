import type { Metadata } from "next";
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
  Palette,
  Code2,
  Rocket,
  Search,
} from "lucide-react";
import { DocsLayout } from "@/components/layout/DocsLayout";
import { Callout } from "@/components/content/Callout";
import { CodeBlock } from "@/components/content/CodeBlock";
import { CodeTabs } from "@/components/content/CodeTabs";
import { ApiEndpoint } from "@/components/content/ApiEndpoint";
import { Steps } from "@/components/content/Steps";
import { Card } from "@/components/content/Card";
import { CardGrid } from "@/components/content/CardGrid";
import type { TOCItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Component Showcase",
  description:
    "See every Scribe component in action — Callouts, CodeTabs, ApiEndpoint, Steps, Cards, CodeBlock, and more.",
};

const toc: TOCItem[] = [
  { id: "callouts", title: "Callouts", level: 2 },
  { id: "code-block", title: "Code Block", level: 2 },
  { id: "code-tabs", title: "Code Tabs", level: 2 },
  { id: "api-endpoint", title: "API Endpoint", level: 2 },
  { id: "steps", title: "Steps", level: 2 },
  { id: "cards", title: "Cards", level: 2 },
  { id: "typography", title: "Typography", level: 2 },
];

export default function DocsIndexPage() {
  return (
    <DocsLayout tableOfContents={toc}>
      {/* Hero */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          v1.0 — Component Showcase
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
          Scribe Component Showcase
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Every component that ships with Scribe, rendered live. This is exactly
          what your documentation will look like — dark mode, light mode,
          responsive, accessible.
        </p>
      </div>

      <hr className="border-border my-8" />

      {/* ── Callouts ── */}
      <section id="callouts">
        <h2 className="text-xl font-semibold text-foreground tracking-tight mt-10 mb-4 pb-2 border-b border-border">
          Callouts
        </h2>
        <p className="text-muted-foreground leading-7 my-4">
          Five types for every situation. Each with its own icon and color
          scheme.
        </p>

        <Callout type="info" title="Informational">
          Use info callouts for general notes, tips, or context that helps the
          reader understand the topic better.
        </Callout>

        <Callout type="success" title="Success">
          Great for confirming something worked, showing correct examples, or
          highlighting best practices.
        </Callout>

        <Callout type="warning" title="Warning">
          Draw attention to potential issues, breaking changes, or things that
          require extra care.
        </Callout>

        <Callout type="danger" title="Danger">
          Reserved for critical warnings — data loss, security risks, or
          irreversible actions.
        </Callout>

        <Callout type="tip" title="Pro Tip">
          Share insider knowledge, shortcuts, or advanced techniques that save
          developers time.
        </Callout>
      </section>

      {/* ── Code Block ── */}
      <section id="code-block">
        <h2 className="text-xl font-semibold text-foreground tracking-tight mt-10 mb-4 pb-2 border-b border-border">
          Code Block
        </h2>
        <p className="text-muted-foreground leading-7 my-4">
          Syntax highlighting for 30+ languages with a copy button, language
          label, and optional filename header.
        </p>

        <CodeBlock language="typescript" filename="src/index.ts">
          {`import Scribe from "scribe-docs";

const docs = new Scribe({
  name: "My API",
  version: "2.0",
  theme: {
    primaryColor: "#6366f1",
    darkMode: true,
  },
});

// Register your API endpoints
docs.endpoint("POST", "/users", {
  description: "Create a new user",
  bodyParams: [
    { name: "email", type: "string", required: true },
    { name: "role", type: '"admin" | "member"' },
  ],
});

docs.build();`}
        </CodeBlock>

        <CodeBlock language="python" filename="main.py">
          {`from scribe import Scribe

app = Scribe(
    name="My API",
    version="2.0",
    base_url="https://api.example.com",
)

@app.endpoint("POST", "/users")
def create_user(email: str, role: str = "member"):
    """Create a new user account."""
    return {"id": "usr_01J8X...", "email": email, "role": role}`}
        </CodeBlock>

        <CodeBlock language="bash" filename="Terminal">
          {`# Install Scribe and create your docs
git clone https://github.com/RapierCraft/Scribe.git my-docs
cd my-docs && npm install
npm run dev

# Open http://localhost:3000/docs`}
        </CodeBlock>
      </section>

      {/* ── Code Tabs ── */}
      <section id="code-tabs">
        <h2 className="text-xl font-semibold text-foreground tracking-tight mt-10 mb-4 pb-2 border-b border-border">
          Code Tabs
        </h2>
        <p className="text-muted-foreground leading-7 my-4">
          Multi-language code examples in a single tabbed container. Perfect for
          showing the same API call in different languages.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              language: "bash",
              code: `curl -X POST https://api.example.com/v1/payments \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2000,
    "currency": "usd",
    "customer": "cus_abc123"
  }'`,
            },
            {
              label: "JavaScript",
              language: "javascript",
              code: `const response = await fetch("https://api.example.com/v1/payments", {
  method: "POST",
  headers: {
    "Authorization": "Bearer sk_live_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount: 2000,
    currency: "usd",
    customer: "cus_abc123",
  }),
});

const payment = await response.json();
console.log(payment.id); // "pay_01HXZ7..."`,
            },
            {
              label: "Python",
              language: "python",
              code: `import requests

response = requests.post(
    "https://api.example.com/v1/payments",
    headers={"Authorization": "Bearer sk_live_..."},
    json={
        "amount": 2000,
        "currency": "usd",
        "customer": "cus_abc123",
    },
)

payment = response.json()
print(payment["id"])  # "pay_01HXZ7..."`,
            },
            {
              label: "Go",
              language: "go",
              code: `package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

func main() {
    body, _ := json.Marshal(map[string]interface{}{
        "amount":   2000,
        "currency": "usd",
        "customer": "cus_abc123",
    })

    req, _ := http.NewRequest("POST",
        "https://api.example.com/v1/payments",
        bytes.NewBuffer(body))
    req.Header.Set("Authorization", "Bearer sk_live_...")
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
}`,
            },
          ]}
        />
      </section>

      {/* ── API Endpoint ── */}
      <section id="api-endpoint">
        <h2 className="text-xl font-semibold text-foreground tracking-tight mt-10 mb-4 pb-2 border-b border-border">
          API Endpoint
        </h2>
        <p className="text-muted-foreground leading-7 my-4">
          Structured API documentation with method badges, parameter tables,
          multi-language request examples, and response status switching.
        </p>

        <ApiEndpoint
          method="POST"
          path="/v1/payments"
          description="Create a new payment intent. The payment will be in a 'requires_payment_method' state until a payment method is attached and confirmed."
          bodyParams={[
            {
              name: "amount",
              type: "integer",
              required: true,
              description: "Amount in cents. Minimum 50.",
              example: "2000",
            },
            {
              name: "currency",
              type: "string",
              required: true,
              description: "Three-letter ISO 4217 currency code.",
              example: '"usd"',
            },
            {
              name: "customer",
              type: "string",
              required: false,
              description: "ID of the customer to associate with this payment.",
              example: '"cus_abc123"',
            },
            {
              name: "description",
              type: "string",
              required: false,
              description: "Arbitrary string for your own records.",
            },
            {
              name: "metadata",
              type: "object",
              required: false,
              description:
                "Key-value pairs for storing additional information.",
            },
          ]}
          requestExamples={[
            {
              label: "cURL",
              language: "bash",
              code: `curl -X POST https://api.example.com/v1/payments \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"amount": 2000, "currency": "usd"}'`,
            },
            {
              label: "JavaScript",
              language: "javascript",
              code: `const payment = await fetch("/v1/payments", {
  method: "POST",
  headers: { "Authorization": "Bearer sk_live_..." },
  body: JSON.stringify({ amount: 2000, currency: "usd" }),
}).then(r => r.json());`,
            },
            {
              label: "Python",
              language: "python",
              code: `payment = requests.post(
    "/v1/payments",
    headers={"Authorization": "Bearer sk_live_..."},
    json={"amount": 2000, "currency": "usd"},
).json()`,
            },
          ]}
          responses={[
            {
              status: 201,
              description: "Created",
              body: `{
  "id": "pay_01HXZ7KBPM2QGQAZ5JRPEY8AX",
  "object": "payment",
  "amount": 2000,
  "currency": "usd",
  "status": "requires_payment_method",
  "client_secret": "pay_01HXZ7..._secret_QZKpHnHF",
  "created_at": "2026-03-21T10:00:00Z"
}`,
            },
            {
              status: 400,
              description: "Bad Request",
              body: `{
  "error": {
    "type": "invalid_request",
    "message": "Amount must be at least 50 cents.",
    "param": "amount",
    "code": "amount_too_small"
  }
}`,
            },
            {
              status: 401,
              description: "Unauthorized",
              body: `{
  "error": {
    "type": "authentication_error",
    "message": "Invalid API key provided.",
    "code": "invalid_api_key"
  }
}`,
            },
          ]}
        />

        <ApiEndpoint
          method="GET"
          path="/v1/payments/:id"
          description="Retrieve a payment by its unique identifier."
          pathParams={[
            {
              name: "id",
              type: "string",
              required: true,
              description: 'The payment ID (starts with "pay_").',
              example: '"pay_01HXZ7..."',
            },
          ]}
          queryParams={[
            {
              name: "expand",
              type: "string[]",
              required: false,
              description:
                "Related objects to expand inline. Supports: customer, invoice.",
              example: '["customer"]',
            },
          ]}
          responses={[
            {
              status: 200,
              description: "OK",
              body: `{
  "id": "pay_01HXZ7KBPM2QGQAZ5JRPEY8AX",
  "object": "payment",
  "amount": 2000,
  "currency": "usd",
  "status": "succeeded",
  "customer": "cus_abc123",
  "created_at": "2026-03-21T10:00:00Z"
}`,
            },
            {
              status: 404,
              description: "Not Found",
              body: `{
  "error": {
    "type": "not_found",
    "message": "No payment found with ID 'pay_invalid'."
  }
}`,
            },
          ]}
        />

        <ApiEndpoint
          method="DELETE"
          path="/v1/payments/:id"
          description="Cancel a payment that has not yet been captured. This action is irreversible."
          pathParams={[
            {
              name: "id",
              type: "string",
              required: true,
              description: "The payment ID to cancel.",
            },
          ]}
          responses={[
            {
              status: 200,
              description: "Cancelled",
              body: `{
  "id": "pay_01HXZ7KBPM2QGQAZ5JRPEY8AX",
  "status": "cancelled",
  "cancelled_at": "2026-03-21T10:05:00Z"
}`,
            },
          ]}
        />
      </section>

      {/* ── Steps ── */}
      <section id="steps">
        <h2 className="text-xl font-semibold text-foreground tracking-tight mt-10 mb-4 pb-2 border-b border-border">
          Steps
        </h2>
        <p className="text-muted-foreground leading-7 my-4">
          Numbered step-by-step instructions with connector lines. Each step
          supports a title, description, and optional embedded content.
        </p>

        <Steps
          steps={[
            {
              title: "Install the SDK",
              description:
                "Choose your language and install the official SDK from your package manager.",
              children: (
                <CodeBlock language="bash">
                  {`npm install @acme/sdk
# or
pip install acme-sdk`}
                </CodeBlock>
              ),
            },
            {
              title: "Configure your API key",
              description:
                "Add your secret key to environment variables. Never commit it to version control.",
              children: (
                <CodeBlock language="bash" filename=".env">
                  {`ACME_API_KEY=sk_live_your_key_here
ACME_WEBHOOK_SECRET=whsec_your_secret_here`}
                </CodeBlock>
              ),
            },
            {
              title: "Create your first payment",
              description:
                "Initialize the client and make your first API call. The SDK handles authentication automatically.",
              children: (
                <CodeBlock language="typescript" filename="checkout.ts">
                  {`import { Acme } from "@acme/sdk";

const acme = new Acme(process.env.ACME_API_KEY);

const payment = await acme.payments.create({
  amount: 2000,
  currency: "usd",
  description: "Premium subscription",
});

console.log(payment.client_secret);`}
                </CodeBlock>
              ),
            },
            {
              title: "Handle the webhook",
              description:
                "Listen for payment events to fulfil orders, send receipts, and update your database.",
              children: (
                <CodeBlock language="typescript" filename="webhook.ts">
                  {`app.post("/webhooks/acme", async (req, res) => {
  const event = acme.webhooks.verify(
    req.body,
    req.headers["acme-signature"],
  );

  if (event.type === "payment.succeeded") {
    await fulfillOrder(event.data.id);
  }

  res.json({ received: true });
});`}
                </CodeBlock>
              ),
            },
            {
              title: "Go live",
              description:
                'Switch from test mode to live mode by replacing your API key. No code changes needed — the SDK handles everything.',
            },
          ]}
        />
      </section>

      {/* ── Cards ── */}
      <section id="cards">
        <h2 className="text-xl font-semibold text-foreground tracking-tight mt-10 mb-4 pb-2 border-b border-border">
          Cards
        </h2>
        <p className="text-muted-foreground leading-7 my-4">
          Navigation cards with icons, descriptions, badges, and hover
          animations. Great for landing pages and section indexes.
        </p>

        <CardGrid cols={2}>
          <Card
            title="Quick Start"
            description="Get up and running in under 5 minutes with our step-by-step guide."
            icon={<Rocket className="h-4 w-4" />}
          />
          <Card
            title="API Reference"
            description="Complete endpoint documentation with examples in every language."
            icon={<Code2 className="h-4 w-4" />}
          />
          <Card
            title="SDKs & Libraries"
            description="Official SDKs for JavaScript, Python, Go, Ruby, and PHP."
            icon={<Package className="h-4 w-4" />}
            badge="New"
          />
          <Card
            title="Webhooks"
            description="Receive real-time events and build reliable event-driven workflows."
            icon={<Webhook className="h-4 w-4" />}
          />
        </CardGrid>

        <h3 className="text-base font-semibold text-foreground mt-8 mb-4">
          Three-column layout
        </h3>

        <CardGrid cols={3}>
          <Card
            title="Authentication"
            description="API keys, OAuth2, and token management."
            icon={<Key className="h-4 w-4" />}
          />
          <Card
            title="Rate Limits"
            description="Understand concurrency limits and throttling."
            icon={<Shield className="h-4 w-4" />}
          />
          <Card
            title="Error Codes"
            description="Complete reference for all error responses."
            icon={<Terminal className="h-4 w-4" />}
          />
          <Card
            title="Global Coverage"
            description="135+ currencies across 47 countries."
            icon={<Globe className="h-4 w-4" />}
          />
          <Card
            title="Theming"
            description="Customize colors, fonts, and layout."
            icon={<Palette className="h-4 w-4" />}
            badge="Pro"
          />
          <Card
            title="Search"
            description='Built-in full-text search. Press "/" to try it.'
            icon={<Search className="h-4 w-4" />}
          />
        </CardGrid>
      </section>

      {/* ── Typography ── */}
      <section id="typography">
        <h2 className="text-xl font-semibold text-foreground tracking-tight mt-10 mb-4 pb-2 border-b border-border">
          Typography
        </h2>
        <p className="text-muted-foreground leading-7 my-4">
          All standard Markdown elements are pre-styled through the MDX
          component system.
        </p>

        <h3 className="text-base font-semibold text-foreground mt-6 mb-3">
          Inline code
        </h3>
        <p className="text-muted-foreground leading-7 my-4">
          Use{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.15rem] font-mono text-[0.85em] text-foreground">
            inline code
          </code>{" "}
          for variable names, function calls like{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.15rem] font-mono text-[0.85em] text-foreground">
            createPayment()
          </code>
          , or HTTP methods like{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.15rem] font-mono text-[0.85em] text-foreground">
            POST /v1/payments
          </code>
          .
        </p>

        <h3 className="text-base font-semibold text-foreground mt-6 mb-3">
          Lists
        </h3>
        <ul className="text-muted-foreground leading-7 my-4 ml-6 list-disc space-y-1">
          <li>Unordered lists use disc markers</li>
          <li>
            They support{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.15rem] font-mono text-[0.85em] text-foreground">
              inline code
            </code>{" "}
            and <strong className="text-foreground">bold text</strong>
          </li>
          <li>Nested content renders cleanly at any depth</li>
        </ul>

        <ol className="text-muted-foreground leading-7 my-4 ml-6 list-decimal space-y-1">
          <li>Ordered lists use decimal numbering</li>
          <li>Perfect for sequential instructions</li>
          <li>Each item aligns with consistent spacing</li>
        </ol>

        <h3 className="text-base font-semibold text-foreground mt-6 mb-3">
          Blockquote
        </h3>
        <blockquote className="my-4 border-l-4 border-primary pl-6 italic text-muted-foreground">
          &ldquo;The best API documentation is the one developers actually
          read.&rdquo;
          <br />— Every developer advocate, ever.
        </blockquote>

        <h3 className="text-base font-semibold text-foreground mt-6 mb-3">
          Table
        </h3>
        <div className="my-6 w-full overflow-y-auto">
          <table className="w-full border-collapse border border-border text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="border border-border px-4 py-2 text-left font-bold">
                  Status
                </th>
                <th className="border border-border px-4 py-2 text-left font-bold">
                  Meaning
                </th>
                <th className="border border-border px-4 py-2 text-left font-bold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-2">
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    200
                  </code>
                </td>
                <td className="border border-border px-4 py-2 text-muted-foreground">
                  Success
                </td>
                <td className="border border-border px-4 py-2 text-muted-foreground">
                  Process the response body
                </td>
              </tr>
              <tr className="bg-muted/50">
                <td className="border border-border px-4 py-2">
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    401
                  </code>
                </td>
                <td className="border border-border px-4 py-2 text-muted-foreground">
                  Unauthorized
                </td>
                <td className="border border-border px-4 py-2 text-muted-foreground">
                  Check your API key
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    429
                  </code>
                </td>
                <td className="border border-border px-4 py-2 text-muted-foreground">
                  Rate Limited
                </td>
                <td className="border border-border px-4 py-2 text-muted-foreground">
                  Back off and retry with exponential delay
                </td>
              </tr>
              <tr className="bg-muted/50">
                <td className="border border-border px-4 py-2">
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    500
                  </code>
                </td>
                <td className="border border-border px-4 py-2 text-muted-foreground">
                  Server Error
                </td>
                <td className="border border-border px-4 py-2 text-muted-foreground">
                  Retry or contact support
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocsLayout>
  );
}
