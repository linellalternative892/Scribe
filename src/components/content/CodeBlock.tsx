"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
}

// Normalize language aliases to Prism-supported values
function normalizeLanguage(lang?: string): string {
  if (!lang) return "text";
  const aliases: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    jsx: "jsx",
    tsx: "tsx",
    sh: "bash",
    shell: "bash",
    zsh: "bash",
    py: "python",
    rb: "ruby",
    yml: "yaml",
    md: "markdown",
    mdx: "markdown",
    html: "html",
    css: "css",
    json: "json",
    graphql: "graphql",
    gql: "graphql",
    sql: "sql",
    go: "go",
    rust: "rust",
    java: "java",
    kotlin: "kotlin",
    swift: "swift",
    cpp: "cpp",
    c: "c",
    cs: "csharp",
    csharp: "csharp",
    php: "php",
    http: "http",
    diff: "diff",
    dockerfile: "dockerfile",
    toml: "toml",
    xml: "xml",
  };
  return aliases[lang.toLowerCase()] ?? lang.toLowerCase();
}

const LANGUAGE_LABELS: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  jsx: "JSX",
  tsx: "TSX",
  python: "Python",
  ruby: "Ruby",
  bash: "Bash",
  go: "Go",
  rust: "Rust",
  java: "Java",
  kotlin: "Kotlin",
  swift: "Swift",
  php: "PHP",
  json: "JSON",
  yaml: "YAML",
  toml: "TOML",
  sql: "SQL",
  html: "HTML",
  css: "CSS",
  graphql: "GraphQL",
  http: "HTTP",
  diff: "Diff",
  dockerfile: "Dockerfile",
  text: "Text",
};

export function CodeBlock({
  children,
  language,
  filename,
  showLineNumbers = false,
  highlightLines = [],
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lang = normalizeLanguage(language);
  const label = LANGUAGE_LABELS[lang] ?? lang.toUpperCase();

  const code = typeof children === "string" ? children.trimEnd() : String(children ?? "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineProps = (lineNumber: number) => {
    const isHighlighted = highlightLines.includes(lineNumber);
    return {
      style: isHighlighted
        ? {
            backgroundColor: "rgba(99, 102, 241, 0.15)",
            borderLeft: "2px solid #6366f1",
            marginLeft: "-1rem",
            paddingLeft: "calc(1rem - 2px)",
            display: "block",
          }
        : {},
    };
  };

  return (
    <div
      className={cn(
        "not-prose my-6 rounded-lg overflow-hidden border border-border",
        className
      )}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between gap-3 bg-[#1e1e2e] border-b border-white/8 px-4 py-2.5">
        <div className="flex items-center gap-2 min-w-0">
          {filename ? (
            <>
              <Terminal className="h-3.5 w-3.5 text-white/40 flex-shrink-0" />
              <span className="text-xs font-mono text-white/60 truncate">{filename}</span>
            </>
          ) : (
            <span className="text-xs font-mono text-white/40 uppercase tracking-wide">
              {label}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 flex-shrink-0 rounded px-2 py-1 text-xs text-white/40 hover:text-white/70 hover:bg-white/8 transition-colors"
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={lang}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        wrapLines={highlightLines.length > 0}
        lineProps={highlightLines.length > 0 ? lineProps : undefined}
        customStyle={{
          margin: 0,
          padding: "1.25rem 1rem",
          borderRadius: 0,
          fontSize: "0.8125rem",
          lineHeight: "1.6",
          background: "#1e1e2e",
        }}
        codeTagProps={{
          style: {
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

// Inline code (used in MDX)
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.15rem] font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  );
}
