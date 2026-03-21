"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getConfig } from "@/lib/config";
import { Sidebar } from "../navigation/Sidebar";
import { TopBar } from "../navigation/TopBar";
import { TableOfContents } from "./TableOfContents";
import type { TOCItem } from "@/lib/types";

interface DocsLayoutProps {
  children: React.ReactNode;
  tableOfContents?: TOCItem[];
}

export function DocsLayout({ children, tableOfContents = [] }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsEmbedded(params.get("embedded") === "true");
  }, []);

  // Close sidebar on route change (click outside)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={cn("bg-background", !isEmbedded && "min-h-screen")}>
      {!isEmbedded && <TopBar />}

      <div className={cn(!isEmbedded && "max-w-[1400px] mx-auto")}>
        <div className={cn("relative flex")}>
          {/* Mobile menu toggle */}
          {!isEmbedded && (
            <button
              className="fixed bottom-4 left-4 z-50 lg:hidden bg-card shadow-lg rounded-lg p-2.5 border border-border"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>
          )}

          {/* Left sidebar */}
          {!isEmbedded && (
            <aside
              className={cn(
                "fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300",
                "lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:transform-none lg:flex-shrink-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
              )}
            >
              <div className="h-full overflow-y-auto border-r border-border bg-background px-4 py-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                <Sidebar onNavigate={() => setSidebarOpen(false)} />
              </div>
            </aside>
          )}

          {/* Mobile overlay */}
          {!isEmbedded && sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <main
            className={cn(
              "min-w-0 flex-1",
              isEmbedded ? "py-6 w-full" : "py-8 lg:py-12"
            )}
          >
            <article
              className={cn(
                "max-w-3xl mx-auto",
                isEmbedded ? "px-6" : "px-6 lg:px-10"
              )}
            >
              {children}
            </article>
          </main>

          {/* Right sidebar — Table of Contents */}
          {!isEmbedded && tableOfContents.length > 0 && (
            <aside className="hidden xl:block w-64 flex-shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] py-12 pr-6">
              <TableOfContents items={tableOfContents} />
            </aside>
          )}
        </div>
      </div>

      {/* Footer */}
      {!isEmbedded && <DocsFooter />}
    </div>
  );
}

function DocsFooter() {
  const config = getConfig();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {year} {config.footer?.copyright ?? config.name}. All rights reserved.
        </p>
        {config.footer?.links && config.footer.links.length > 0 && (
          <div className="flex items-center gap-4">
            {config.footer.links.map((link: { title: string; href: string }) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.title}
              </a>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground/60">
          Built with{" "}
          <a
            href="https://github.com/rapiercraft/scribe"
            className="hover:text-muted-foreground transition-colors"
          >
            Scribe
          </a>
        </p>
      </div>
    </footer>
  );
}
