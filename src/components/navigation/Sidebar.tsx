"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getConfig } from "@/lib/config";
import type { NavItem } from "@/lib/types";

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const config = getConfig();
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation navigation">
      {config.navigation.map((section) => (
        <SidebarSection
          key={section.title}
          section={section}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}

interface SidebarSectionProps {
  section: NavItem;
  pathname: string;
  onNavigate?: () => void;
}

function SidebarSection({ section, pathname, onNavigate }: SidebarSectionProps) {
  // Auto-expand section if any child is active
  const hasActiveChild = section.items?.some((item) =>
    isActive(item, pathname)
  );
  const [expanded, setExpanded] = useState(hasActiveChild ?? true);

  useEffect(() => {
    if (hasActiveChild) setExpanded(true);
  }, [hasActiveChild]);

  return (
    <div className="mb-6">
      <button
        className="flex w-full items-center justify-between mb-1 px-2 py-1 rounded-md hover:bg-muted/50 transition-colors group"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
          {section.title}
        </span>
        {expanded ? (
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        )}
      </button>

      {expanded && section.items && (
        <ul className="space-y-0.5">
          {section.items.map((item) => (
            <SidebarItem
              key={item.href ?? item.title}
              item={item}
              pathname={pathname}
              onNavigate={onNavigate}
              depth={0}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

interface SidebarItemProps {
  item: NavItem;
  pathname: string;
  onNavigate?: () => void;
  depth: number;
}

function SidebarItem({ item, pathname, onNavigate, depth }: SidebarItemProps) {
  const active = item.href ? isActive(item, pathname) : false;
  const hasChildren = item.items && item.items.length > 0;
  const hasActiveChild = hasChildren && item.items?.some((child) => isActive(child, pathname));
  const [expanded, setExpanded] = useState(hasActiveChild ?? false);

  useEffect(() => {
    if (hasActiveChild) setExpanded(true);
  }, [hasActiveChild]);

  if (hasChildren) {
    return (
      <li>
        <button
          className={cn(
            "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
            "hover:bg-muted/50 hover:text-foreground",
            depth > 0 && "pl-4",
            active || hasActiveChild
              ? "text-primary font-medium"
              : "text-muted-foreground"
          )}
          onClick={() => setExpanded(!expanded)}
        >
          <span>{item.title}</span>
          {expanded ? (
            <ChevronDown className="h-3.5 w-3.5 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
          )}
        </button>
        {expanded && (
          <ul className="mt-0.5 space-y-0.5">
            {item.items!.map((child) => (
              <SidebarItem
                key={child.href ?? child.title}
                item={child}
                pathname={pathname}
                onNavigate={onNavigate}
                depth={depth + 1}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  if (!item.href) return null;

  const isExternal = item.external || item.href.startsWith("http");

  return (
    <li>
      <Link
        href={item.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onClick={onNavigate}
        className={cn(
          "flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors duration-150",
          depth > 0 ? "pl-4" : "",
          active
            ? "bg-primary/10 text-primary font-medium"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        )}
      >
        <span className="flex-1 truncate">{item.title}</span>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {item.badge && (
            <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary leading-none">
              {item.badge}
            </span>
          )}
          {isExternal && (
            <ExternalLink className="h-3 w-3 text-muted-foreground/50" />
          )}
        </div>
      </Link>
    </li>
  );
}

function isActive(item: NavItem, pathname: string): boolean {
  if (!item.href) return false;
  if (item.href === "/docs" && pathname === "/docs") return true;
  if (item.href !== "/docs" && pathname.startsWith(item.href)) return true;
  return false;
}
