"use client";

import { useState } from "react";

export default function Playground() {
  const [code, setCode] = useState(`const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello from Node.js!');
});
server.listen(3000);
`);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput("");
    const res = await fetch("/api/node", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });
    const data = await res.json();
    if (data.previewUrl) {
      setOutput(data.previewUrl);
    } else {
      setOutput(data.error || "Unknown error");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Node.js Coding Playground</h1>
      <textarea
        rows={10}
        cols={60}
        style={{ fontSize: 14 }}
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <br />
      <button
        style={{ marginTop: 20 }}
        disabled={loading}
        onClick={runCode}
      >
        {loading ? "Running..." : "Run Node.js Server"}
      </button>
      <div style={{ marginTop: 24 }}>
        {output &&
          (output.startsWith("http") ? (
            <a href={output} target="_blank" rel="noopener noreferrer">
              View Live Server Output
            </a>
          ) : (
            <pre style={{ color: "red" }}>{output}</pre>
          ))}
      </div>
    </div>
  );
}
