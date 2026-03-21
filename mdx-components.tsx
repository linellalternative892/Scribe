import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { Callout } from "@/components/content/Callout";
import { CodeBlock, InlineCode } from "@/components/content/CodeBlock";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children, id, ...props }) => (
      <h1
        id={id}
        className="scroll-mt-20 text-3xl font-bold tracking-tight text-foreground mb-6"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, id, ...props }) => (
      <h2
        id={id}
        className="scroll-mt-20 text-xl font-semibold text-foreground tracking-tight mt-10 mb-4 pb-2 border-b border-border"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, id, ...props }) => (
      <h3
        id={id}
        className="scroll-mt-20 text-lg font-semibold text-foreground mt-8 mb-3"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, id, ...props }) => (
      <h4
        id={id}
        className="scroll-mt-20 text-base font-semibold text-foreground mt-6 mb-2"
        {...props}
      >
        {children}
      </h4>
    ),
    h5: ({ children, id, ...props }) => (
      <h5
        id={id}
        className="scroll-mt-20 text-sm font-semibold text-foreground mt-4 mb-1"
        {...props}
      >
        {children}
      </h5>
    ),
    h6: ({ children, id, ...props }) => (
      <h6
        id={id}
        className="scroll-mt-20 text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-4 mb-1"
        {...props}
      >
        {children}
      </h6>
    ),

    // Paragraph
    p: ({ children, ...props }) => (
      <p className="text-muted-foreground leading-7 my-4" {...props}>
        {children}
      </p>
    ),

    // Links
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith("http") ?? false;
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            {...props}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href ?? "#"}
          className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          {...props}
        >
          {children}
        </Link>
      );
    },

    // Lists
    ul: ({ children, ...props }) => (
      <ul
        className="my-4 ml-6 list-disc text-muted-foreground space-y-1.5 [&>li]:leading-7"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="my-4 ml-6 list-decimal text-muted-foreground space-y-1.5 [&>li]:leading-7"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-7" {...props}>
        {children}
      </li>
    ),

    // Blockquote
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-6 border-l-4 border-primary/40 pl-4 italic text-muted-foreground"
        {...props}
      >
        {children}
      </blockquote>
    ),

    // Code (inline)
    code: ({ children, className, ...props }) => {
      // If inside a pre block, the CodeBlock handles rendering
      return <InlineCode>{children}</InlineCode>;
    },

    // Code block (fenced)
    pre: ({ children, ...props }) => {
      // Extract code content and language from the nested <code> element
      const codeEl = (children as React.ReactElement<{ className?: string; children?: string }>);
      const language = codeEl?.props?.className?.replace("language-", "") ?? "text";
      const code = codeEl?.props?.children ?? "";
      return <CodeBlock language={language}>{String(code).trimEnd()}</CodeBlock>;
    },

    // Table
    table: ({ children, ...props }) => (
      <div className="my-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-muted/40 border-b border-border" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }) => (
      <tbody className="[&>tr:last-child]:border-0" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }) => (
      <tr className="border-b border-border/50" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-4 py-2.5 text-left text-xs font-semibold text-foreground"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-4 py-2.5 text-muted-foreground" {...props}>
        {children}
      </td>
    ),

    // Horizontal rule
    hr: () => <hr className="my-8 border-border" />,

    // Image
    img: ({ src, alt, ...props }) => (
      <Image
        src={src as string}
        alt={alt ?? ""}
        width={800}
        height={450}
        className="rounded-lg border border-border my-6 w-full h-auto"
        {...(props as Omit<ImageProps, "src" | "alt" | "width" | "height">)}
      />
    ),

    // Pass-through Scribe components for use in MDX files
    Callout,
    CodeBlock,

    // Spread any additional custom components
    ...components,
  };
}
