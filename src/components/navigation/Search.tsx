"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Search,
  X,
  FileText,
  Zap,
  AlertCircle,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { loadSearchIndex, searchItems } from "@/lib/search";
import type { SearchItem } from "@/lib/types";
import { getConfig } from "@/lib/config";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-emerald-500/15 text-emerald-500",
  POST: "bg-blue-500/15 text-blue-500",
  PUT: "bg-amber-500/15 text-amber-500",
  PATCH: "bg-orange-500/15 text-orange-500",
  DELETE: "bg-red-500/15 text-red-500",
};

export function SearchModal({ open, onClose }: SearchModalProps) {
  const config = getConfig();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Load search index
  useEffect(() => {
    if (open && index.length === 0) {
      setLoading(true);
      loadSearchIndex()
        .then((data) => setIndex(data))
        .finally(() => setLoading(false));
    }
  }, [open, index.length]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
      setActiveIndex(0);
    }
  }, [open]);

  // Global keyboard shortcut
  useEffect(() => {
    const shortcut = config.search?.shortcut ?? "/";
    const handler = (e: KeyboardEvent) => {
      if (
        (e.key === shortcut && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) ||
        (e.key === "k" && (e.metaKey || e.ctrlKey))
      ) {
        e.preventDefault();
        if (!open) {
          // This triggers the parent's open state — we dispatch a custom event
          window.dispatchEvent(new CustomEvent("scribe:open-search"));
        }
      }
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose, config.search?.shortcut]);

  // Search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setActiveIndex(0);
      return;
    }
    const found = searchItems(index, query);
    setResults(found);
    setActiveIndex(0);
  }, [query, index]);

  // Scroll active item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector("[data-active='true']") as HTMLElement;
    if (active) active.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const navigate = useCallback(
    (item: SearchItem) => {
      router.push(item.href);
      onClose();
    },
    [router, onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[activeIndex]) navigate(results[activeIndex]);
    }
  };

  const typeIcon = (type: SearchItem["type"]) => {
    if (type === "endpoint") return <Zap className="h-3.5 w-3.5" />;
    if (type === "error") return <AlertCircle className="h-3.5 w-3.5" />;
    return <FileText className="h-3.5 w-3.5" />;
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm animate-in fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-[15%] z-50 w-full max-w-xl -translate-x-1/2 animate-in fade-in-0 zoom-in-95"
          aria-label="Search documentation"
        >
          <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
            {/* Input row */}
            <div className="flex items-center gap-3 px-4 border-b border-border">
              <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search documentation..."
                className="flex-1 py-4 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="flex-shrink-0 p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[400px] overflow-y-auto">
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
              )}

              {!loading && query && results.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 gap-2">
                  <Search className="h-8 w-8 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                </div>
              )}

              {!loading && !query && (
                <div className="py-8 px-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Type to search the documentation
                  </p>
                </div>
              )}

              {!loading && results.length > 0 && (
                <ul ref={listRef} className="py-2">
                  {results.map((item, i) => (
                    <li key={item.id}>
                      <button
                        data-active={i === activeIndex}
                        onClick={() => navigate(item)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={cn(
                          "w-full flex items-start gap-3 px-4 py-2.5 text-left transition-colors",
                          i === activeIndex ? "bg-muted" : "hover:bg-muted/50"
                        )}
                      >
                        {/* Type icon */}
                        <span className="flex-shrink-0 mt-0.5 text-muted-foreground">
                          {typeIcon(item.type)}
                        </span>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            {item.type === "endpoint" && item.method && (
                              <span
                                className={cn(
                                  "flex-shrink-0 rounded px-1.5 py-0.5 text-[10px] font-mono font-bold leading-none",
                                  METHOD_COLORS[item.method]
                                )}
                              >
                                {item.method}
                              </span>
                            )}
                            <span className="text-sm font-medium text-foreground truncate">
                              {item.type === "endpoint" && item.path
                                ? item.path
                                : item.title}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">
                            {item.description}
                          </p>
                        </div>

                        {/* Section badge + arrow */}
                        <div className="flex-shrink-0 flex items-center gap-2">
                          <span className="hidden sm:block text-[10px] text-muted-foreground/60 bg-muted/80 rounded px-1.5 py-0.5">
                            {item.section}
                          </span>
                          {i === activeIndex && (
                            <ArrowRight className="h-3.5 w-3.5 text-primary" />
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <CornerDownLeft className="h-3 w-3" /> Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="font-mono">↑↓</kbd> Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="font-mono">ESC</kbd> Close
              </span>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
