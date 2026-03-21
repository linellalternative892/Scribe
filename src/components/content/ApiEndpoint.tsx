"use client";

import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface Parameter {
  name: string;
  type: string;
  required?: boolean;
  description: string;
  default?: string;
  example?: string;
}

interface RequestExample {
  language: string;
  label: string;
  code: string;
}

interface ResponseExample {
  status: number;
  description: string;
  body: string;
}

interface ApiEndpointProps {
  method: HttpMethod;
  path: string;
  description?: string;
  pathParams?: Parameter[];
  queryParams?: Parameter[];
  bodyParams?: Parameter[];
  requestExamples?: RequestExample[];
  responses?: ResponseExample[];
  authRequired?: boolean;
}

const METHOD_STYLES: Record<HttpMethod, string> = {
  GET: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  POST: "bg-blue-500/15 text-blue-500 border-blue-500/30",
  PUT: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  PATCH: "bg-orange-500/15 text-orange-500 border-orange-500/30",
  DELETE: "bg-red-500/15 text-red-500 border-red-500/30",
};

const STATUS_STYLES: Record<number, string> = {
  200: "bg-emerald-500/15 text-emerald-500",
  201: "bg-emerald-500/15 text-emerald-500",
  204: "bg-emerald-500/15 text-emerald-500",
  400: "bg-red-500/15 text-red-500",
  401: "bg-red-500/15 text-red-500",
  403: "bg-red-500/15 text-red-500",
  404: "bg-amber-500/15 text-amber-500",
  422: "bg-orange-500/15 text-orange-500",
  429: "bg-orange-500/15 text-orange-500",
  500: "bg-red-500/15 text-red-500",
};

function statusStyle(status: number): string {
  return (
    STATUS_STYLES[status] ??
    (status < 300 ? "bg-emerald-500/15 text-emerald-500" : "bg-red-500/15 text-red-500")
  );
}

function ParamTable({ params, title }: { params: Parameter[]; title: string }) {
  return (
    <div className="mb-6">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        {title}
      </h4>
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground w-1/4">
                Parameter
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground w-1/6">
                Type
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground w-1/8">
                Required
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {params.map((param, i) => (
              <tr
                key={param.name}
                className={cn(
                  "border-b border-border last:border-0",
                  i % 2 === 0 ? "bg-transparent" : "bg-muted/20"
                )}
              >
                <td className="px-4 py-3 font-mono text-xs text-foreground align-top">
                  {param.name}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground align-top">
                  {param.type}
                </td>
                <td className="px-4 py-3 align-top">
                  {param.required ? (
                    <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-500">
                      Required
                    </span>
                  ) : (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      Optional
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground align-top">
                  {param.description}
                  {param.default !== undefined && (
                    <span className="ml-2 text-xs font-mono text-muted-foreground/60">
                      Default: {param.default}
                    </span>
                  )}
                  {param.example !== undefined && (
                    <span className="ml-2 text-xs font-mono text-muted-foreground/60">
                      Example: {param.example}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ApiEndpoint({
  method,
  path,
  description,
  pathParams,
  queryParams,
  bodyParams,
  requestExamples,
  responses,
  authRequired = true,
}: ApiEndpointProps) {
  const [activeResponse, setActiveResponse] = useState(0);

  const hasParams =
    (pathParams && pathParams.length > 0) ||
    (queryParams && queryParams.length > 0) ||
    (bodyParams && bodyParams.length > 0);

  const hasExamples = requestExamples && requestExamples.length > 0;
  const hasResponses = responses && responses.length > 0;

  return (
    <div className="not-prose my-8 rounded-xl border border-border overflow-hidden">
      {/* Endpoint header */}
      <div className="flex items-center gap-3 bg-muted/30 px-5 py-4 border-b border-border">
        <span
          className={cn(
            "flex-shrink-0 rounded border px-2.5 py-1 text-xs font-mono font-bold tracking-wide",
            METHOD_STYLES[method]
          )}
        >
          {method}
        </span>
        <code className="flex-1 font-mono text-sm text-foreground break-all">{path}</code>
        {authRequired && (
          <span className="hidden sm:flex flex-shrink-0 items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-500">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Auth required
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 space-y-6">
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        {/* Parameters */}
        {hasParams && (
          <div>
            {pathParams && pathParams.length > 0 && (
              <ParamTable params={pathParams} title="Path Parameters" />
            )}
            {queryParams && queryParams.length > 0 && (
              <ParamTable params={queryParams} title="Query Parameters" />
            )}
            {bodyParams && bodyParams.length > 0 && (
              <ParamTable params={bodyParams} title="Request Body" />
            )}
          </div>
        )}

        {/* Request examples */}
        {hasExamples && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Request Examples
            </h4>
            <Tabs.Root defaultValue={requestExamples[0].label}>
              <Tabs.List className="flex items-center gap-1 mb-0 bg-muted/30 rounded-t-lg border border-border border-b-0 px-2 pt-2">
                {requestExamples.map((ex) => (
                  <Tabs.Trigger
                    key={ex.label}
                    value={ex.label}
                    className="px-3 py-1.5 text-xs font-medium rounded-t-md text-muted-foreground data-[state=active]:text-foreground data-[state=active]:bg-background data-[state=active]:border data-[state=active]:border-border data-[state=active]:border-b-background outline-none transition-colors"
                  >
                    {ex.label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              {requestExamples.map((ex) => (
                <Tabs.Content key={ex.label} value={ex.label} className="focus:outline-none">
                  <div className="[&>div]:mt-0 [&>div]:rounded-t-none [&>div]:border-t-0">
                    <CodeBlock language={ex.language}>{ex.code}</CodeBlock>
                  </div>
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </div>
        )}

        {/* Responses */}
        {hasResponses && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Responses
            </h4>
            {/* Status tabs */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              {responses.map((res, i) => (
                <button
                  key={res.status}
                  onClick={() => setActiveResponse(i)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors border",
                    i === activeResponse
                      ? cn(statusStyle(res.status), "border-current/30")
                      : "text-muted-foreground border-border hover:bg-muted/50"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      i === activeResponse
                        ? "bg-current"
                        : "bg-muted-foreground"
                    )}
                  />
                  {res.status}
                  <span className="font-normal opacity-70">{res.description}</span>
                </button>
              ))}
            </div>
            <div className="[&>div]:mt-0">
              <CodeBlock language="json">
                {responses[activeResponse]?.body ?? ""}
              </CodeBlock>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
