import { DocsLayout } from "@/components/layout/DocsLayout";

export default function DocsSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Page-level table of contents is passed from individual pages via props.
  // This layout is a pass-through; the DocsLayout wraps the actual page content.
  return <>{children}</>;
}
