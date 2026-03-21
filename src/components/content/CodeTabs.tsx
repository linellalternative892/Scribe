"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

interface CodeTab {
  label: string;
  language?: string;
  filename?: string;
  code: string;
}

interface CodeTabsProps {
  tabs: CodeTab[];
  className?: string;
}

export function CodeTabs({ tabs, className }: CodeTabsProps) {
  if (tabs.length === 0) return null;

  return (
    <Tabs.Root defaultValue={tabs[0].label} className={cn("my-6", className)}>
      {/* Tab list */}
      <div className="not-prose rounded-t-lg border border-b-0 border-border bg-[#1e1e2e] overflow-x-auto">
        <Tabs.List className="flex items-end px-2 pt-2 gap-0.5">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.label}
              value={tab.label}
              className={cn(
                "group relative px-4 py-2 text-xs font-medium rounded-t-md transition-colors",
                "text-white/40 hover:text-white/70",
                "data-[state=active]:text-white data-[state=active]:bg-[#2d2d3f] data-[state=active]:border-b data-[state=active]:border-b-[#2d2d3f]",
                "border border-transparent data-[state=active]:border-white/10 data-[state=active]:border-b-transparent",
                "outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              )}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>

      {/* Tab panels */}
      {tabs.map((tab) => (
        <Tabs.Content
          key={tab.label}
          value={tab.label}
          className="not-prose focus:outline-none"
        >
          {/* Override the top-level CodeBlock margins since we're inside a tab panel */}
          <div className="[&>div]:mt-0 [&>div]:rounded-t-none [&>div]:border-t-0">
            <CodeBlock
              language={tab.language}
              filename={tab.filename}
            >
              {tab.code}
            </CodeBlock>
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
