"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeSnippet from "./ui/code-snippet";
import { CodeBlock } from "@/components/ui/code-block";
import { ExpandableCodeBlock } from "./ui/expandableCodeBlock";
import ApiTestButton from "./ui/API-test";

export default function ComponentViewer({ component }) {
  const [copied, setCopied] = useState(null);

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const renderCodeBlock = (id, title, content, label = ".env") => (
    <section id={id} aria-labelledby={`${id}-title`} tabIndex={-1} className="my-12">
      <h2
        id={`${id}-title`}
        className="text-2xl font-semibold mb-4 text-foreground tracking-tight"
      >
        {title}
      </h2>
      <div className="relative bg-black/40 rounded-lg overflow-hidden border border-white/10">
        <pre
          className="p-4 overflow-x-auto text-sm font-mono text-foreground/90 leading-relaxed"
          tabIndex={0}
        >
          {content.trim()}
        </pre>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 hover:bg-white/10 text-muted-foreground hover:text-accent transition-all"
          onClick={() => copy(content, id)}
          aria-label={`Copy code from ${title} section`}
        >
          {copied === id ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
        </Button>
      </div>
    </section>
  );

  return (
    <article className="p-2 space-y-12 max-w-3xl pb-40" aria-live="polite" tabIndex={-1}>
      {/* HEADER */}
      <header>
        <h1 className="text-4xl font-bold mb-3 text-foreground leading-tight" tabIndex={-1}>
          {component.name}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">{component.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4" aria-label="Component tags">
          {component.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-white/5 text-foreground/80 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"
          aria-label="Component version and type"
        >
          <span className="font-semibold">v{component.version}</span>
          <span aria-hidden="true">•</span>
          <span className="capitalize">{component.type}</span>
        </div>
      </header>

      {/* OVERVIEW */}
      {component.documentation?.overview && (
        <section
          id="overview"
          aria-labelledby="overview-title"
          tabIndex={-1}
          className="max-w-none text-foreground/90 leading-relaxed"
        >
          <h2 id="overview-title" className="text-2xl font-semibold mb-4 tracking-tight">
            Overview
          </h2>
          <ReactMarkdown>{component.documentation.overview}</ReactMarkdown>
        </section>
      )}

      {/* PREREQUISITE */}
      {component.documentation?.prerequisite && (
        <section
          id="prerequisite"
          aria-labelledby="prerequisite-title"
          tabIndex={-1}
          className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-sm leading-relaxed"
        >
          <h2 id="prerequisite-title" className="sr-only">
            Prerequisite
          </h2>
          <p className="text-foreground/90 mb-2 font-semibold text-amber-400">
            {component.documentation.prerequisite.title}
          </p>
          <p className="text-foreground/80 mb-3">{component.documentation.prerequisite.description}</p>
          <a
            href={component.documentation.prerequisite.link}
            className="inline-flex items-center text-amber-400 hover:text-amber-300 font-medium transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Learn more about prerequisite: ${component.documentation.prerequisite.linkText}`}
          >
            {component.documentation.prerequisite.linkText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-1"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5h6v6m-6-6L4.5 19.5m15-9v9h-9"
              />
            </svg>
          </a>
        </section>
      )}

      {/* INSTALLATION */}
      {component.documentation?.installation && (
        <section id="installation" tabIndex={-1} aria-labelledby="installation-title">
          <h2 id="installation-title" className="text-2xl font-semibold mb-4 tracking-tight">
            Installation
          </h2>
          <CodeSnippet command={component.documentation.installation} label="CLI" />
        </section>
      )}

      {/* COMMAND DETAILS */}
      {component.documentation?.commandDetails && (
        <section id="command-details" aria-labelledby="command-details-title" tabIndex={-1}>
          <h2 id="command-details-title" className="text-2xl font-semibold mb-4 tracking-tight">
            What This Command Does
          </h2>
          <p className="text-[15px] leading-relaxed text-foreground/90 mb-6">
            {component.documentation.commandDetails.purpose}
          </p>

          {["creates", "modifies"].map((key) => {
            const data = component.documentation.commandDetails[key];
            if (!data) return null;

            return (
              <section key={key} aria-label={key === "creates" ? "Files and folders created" : "Files to be modified"}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                  {key === "creates" ? "Files & Folders Created" : "Files to be modified"}
                </h3>

                <div className="overflow-x-auto rounded-lg border border-white/10 bg-black/40">
                  <table className="min-w-full table-fixed text-sm text-left text-foreground/90">
                    <colgroup>
                      <col style={{ width: "35%" }} />
                      <col style={{ width: "65%" }} />
                    </colgroup>
                    <thead className="border-b border-white/10 text-muted-foreground uppercase text-[11px]">
                      <tr>
                        <th className="px-4 py-3 font-semibold">File / Path</th>
                        <th className="px-4 py-3 font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, i) => {
                        const [path, ...descParts] = item.split("–");
                        const desc = descParts.join("–").trim();
                        return (
                          <tr
                            key={i}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          >
                            <td
                              className={`px-4 py-3 font-mono whitespace-nowrap align-top ${
                                key === "creates" ? "text-cyan-400" : "text-emerald-400"
                              }`}
                            >
                              {path.trim()}
                            </td>
                            <td className="px-4 py-3 text-foreground/80">{desc}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}
        </section>
      )}

      {/* CONFIGURATION */}
      {component.documentation?.configuration &&
        renderCodeBlock("configuration", "Configuration", component.documentation.configuration)}

      {/* FRONTEND USAGE */}
      {component.documentation?.frontendUsage && (
        <section id="frontend-usage" tabIndex={-1} aria-labelledby="frontend-usage-title">
          <h2 id="frontend-usage-title" className="text-2xl font-semibold mb-4 tracking-tight">
            Frontend Integration
          </h2>
          <p className="text-[15px] leading-relaxed text-foreground/90 mb-4">
            {component.documentation.frontendUsage.overview}
          </p>

          <div className="space-y-4">
            {component.documentation.frontendUsage.endpoints?.map((ep, i) => (
              <div key={i} className="w-full">
                <ApiTestButton endpoint={ep} />
              </div>
            ))}
          </div>

          {component.documentation.frontendUsage.example && (
            <ExpandableCodeBlock
              code={component.documentation.frontendUsage.example}
              filename="frontend-example.js"
              language="javascript"
            />
          )}
        </section>
      )}

      {/* USAGE */}
      {component.documentation?.usage && (
        <section id="usage" tabIndex={-1} aria-labelledby="usage-title">
          <h2 id="usage-title" className="text-2xl font-semibold mb-4 tracking-tight">
            Usage
          </h2>
          <CodeBlock
            language="javascript"
            filename="usage-example.js"
            tabs={[
              {
                name: "server.js",
                code: component.documentation.usage,
                language: "javascript",
              },
            ]}
          />
        </section>
      )}
    </article>
  );
}
