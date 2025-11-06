"use client";
import ReactMarkdown from "react-markdown";

import { useState } from "react";
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
    <section id={id}>
      <h2 className="text-2xl font-semibold mb-4 text-foreground tracking-tight">
        {title}
      </h2>
      <div className="relative bg-black/40 rounded-lg overflow-hidden border border-white/10">
        <pre className="p-4 overflow-x-auto text-sm font-mono text-foreground/90 leading-relaxed">
          {content.trim()}
        </pre>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 hover:bg-white/10 text-muted-foreground hover:text-accent transition-all"
          onClick={() => copy(content, id)}
        >
          {copied === id ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
    </section>
  );

  return (
    <div className="p-2 space-y-12 max-w-3xl pb-40">
      {/* HEADER */}
      <header>
        <h1 className="text-4xl font-bold mb-3 text-foreground leading-tight">
          {component.name}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          {component.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {component.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-white/5 text-foreground/80 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-semibold">v{component.version}</span>
          <span>•</span>
          <span className="capitalize">{component.type}</span>
        </div>
      </header>

      {/* OVERVIEW */}
            {component.documentation?.overview && (
  <section id="overview">
    <h2 className="text-2xl font-semibold mb-4 text-foreground tracking-tight">
      Overview
    </h2>

    <div className="prose prose-invert prose-sm max-w-none text-foreground/90 leading-relaxed">
      <ReactMarkdown>{component.documentation.overview}</ReactMarkdown>
    </div>
  </section>
)}

      {/* PREREQUISITE */}
      {component.documentation?.prerequisite && (
        <section id="prerequisite">
          <h2 className="text-2xl font-semibold mb-4 text-foreground tracking-tight">
            Prerequisite
          </h2>

          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-sm leading-relaxed">
            <p className="text-foreground/90 mb-2">
              <span className="font-semibold text-amber-400">
                {component.documentation.prerequisite.title}
              </span>
            </p>
            <p className="text-foreground/80 mb-3">
              {component.documentation.prerequisite.description}
            </p>
            <a
              href={component.documentation.prerequisite.link}
              className="inline-flex items-center text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              <span>{component.documentation.prerequisite.linkText}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5h6v6m-6-6L4.5 19.5m15-9v9h-9"
                />
              </svg>
            </a>
          </div>
        </section>
      )}

      {/* INSTALLATION */}
      {component.documentation?.installation && (
        <section id="installation">
          <h2 className="text-2xl font-semibold mb-4 text-foreground tracking-tight">
            Installation
          </h2>
          <CodeSnippet
            command={component.documentation.installation}
            label="CLI"
          />
        </section>
      )}

      {/* COMMAND DETAILS */}
      {component.documentation?.commandDetails && (
        <section id="command-details">
          <h2 className="text-2xl font-semibold mb-4 text-foreground tracking-tight">
            What This Command Does
          </h2>

          <p
            className="text-[15px] leading-relaxed text-foreground/90 mb-6"
            id="command-details"
          >
            {component.documentation.commandDetails.purpose}
          </p>

          <div className="space-y-8">
            {["creates", "modifies"].map((key) => {
              const data = component.documentation.commandDetails[key];
              if (!data) return null;

              return (
                <div key={key}>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                    {key === "creates"
                      ? "Files & Folders Created"
                      : "Files to be modified"}
                  </h3>

                  <div className="overflow-x-auto rounded-lg border border-white/10 bg-black/40">
                    <table className="min-w-full table-fixed text-sm text-left text-foreground/90">
                      {/* ✅ Fix: No whitespace text nodes inside colgroup */}
                      <colgroup>
                        <col style={{ width: "35%" }} />
                        <col style={{ width: "65%" }} />
                      </colgroup>

                      <thead className="border-b border-white/10 text-muted-foreground uppercase text-[11px]">
                        <tr>
                          <th className="px-4 py-3 font-semibold">
                            File / Path
                          </th>
                          <th className="px-4 py-3 font-semibold">
                            Description
                          </th>
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
                                  key === "creates"
                                    ? "text-cyan-400"
                                    : "text-emerald-400"
                                }`}
                              >
                                {path.trim()}
                              </td>
                              <td className="px-4 py-3 text-foreground/80">
                                {desc}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* CONFIGURATION */}
      {component.documentation?.configuration &&
        renderCodeBlock(
          "configuration",
          "Configuration",
          component.documentation.configuration
        )}

      {/* FRONTEND USAGE */}
      {component.documentation?.frontendUsage && (
        <section id="frontend-usage">
          <h2 className="text-2xl font-semibold mb-4 text-foreground tracking-tight">
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
        <section id="usage">
          <h2 className="text-2xl font-semibold mb-4 text-foreground tracking-tight">
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
    </div>
  );
}
