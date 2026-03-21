"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getConfig } from "@/lib/config";
import { ThemeToggle } from "../ui/ThemeToggle";
import { SearchModal } from "./Search";

export function TopBar() {
  const config = getConfig();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [versionOpen, setVersionOpen] = useState(false);
  const [activeVersion, setActiveVersion] = useState(
    config.versions?.[0] ?? ""
  );

  return (
    <>
      <header className="sticky top-0 z-50 h-14 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto h-full px-4 flex items-center gap-4">
          {/* Logo */}
          <Link href="/docs" className="flex items-center gap-2.5 flex-shrink-0 mr-2">
            <span className="font-semibold text-foreground text-base leading-none">
              {config.logo?.text ?? config.name}
            </span>
          </Link>

          {/* Top nav links */}
          {config.topNav && config.topNav.length > 0 && (
            <nav className="hidden md:flex items-center gap-1">
              {config.topNav.map((link) => {
                const isExternal = link.external || link.href.startsWith("http");
                const isCurrentSection =
                  !isExternal && pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={cn(
                      "flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors",
                      isCurrentSection
                        ? "text-foreground font-medium bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {link.label}
                    {isExternal && (
                      <ExternalLink className="h-3 w-3 opacity-50" />
                    )}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {config.search?.enabled !== false && (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors text-sm"
                aria-label="Search docs"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="hidden sm:block text-xs">Search docs</span>
                <kbd className="hidden sm:flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground ml-2">
                  {config.search?.shortcut ?? "/"}
                </kbd>
              </button>
            )}

            {/* Version switcher */}
            {config.versions && config.versions.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setVersionOpen(!versionOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  {activeVersion}
                  <ChevronDown className="h-3 w-3" />
                </button>
                {versionOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setVersionOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 z-20 min-w-[8rem] rounded-lg border border-border bg-card shadow-lg py-1">
                      {config.versions.map((v) => (
                        <button
                          key={v}
                          onClick={() => {
                            setActiveVersion(v);
                            setVersionOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-3 py-1.5 text-sm transition-colors",
                            v === activeVersion
                              ? "text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Theme toggle */}
            <ThemeToggle />

            {/* CTA buttons */}
            {config.actions?.primaryButton && (
              <Link
                href={config.actions.primaryButton.href}
                className="hidden sm:flex items-center px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {config.actions.primaryButton.label}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Search modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
