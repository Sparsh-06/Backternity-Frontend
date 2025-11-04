"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroHeader } from "./header";
import { CodeBlock } from "./ui/code-block";

//
// === 1. Dynamic Background Grid ===
//
const DynamicGridBackground = () => {
  const colorOptions = [
    "bg-emerald-500/40",
    "bg-emerald-400/40",
    "bg-neutral-800/60",
    "bg-neutral-900/60",
    "bg-neutral-950/60",
  ];

  const [gridColors, setGridColors] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [gridSize, setGridSize] = useState({ cols: 0, rows: 0, total: 0 });
  const gridRef = useRef(null);

  // Auto-fit grid to viewport
  useEffect(() => {
    const calculateGrid = () => {
      const boxSize = 80;
      const gap = 12;
      const totalBoxSize = boxSize + gap;
      const cols = Math.ceil(window.innerWidth / totalBoxSize) + 1;
      const rows = Math.ceil(window.innerHeight / totalBoxSize) + 1;
      const total = cols * rows;

      setGridSize({ cols, rows, total });
      setGridColors(
        Array.from({ length: total }).map(
          () => colorOptions[Math.floor(Math.random() * colorOptions.length)]
        )
      );
    };

    calculateGrid();
    setIsMounted(true);
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  // Subtle shimmer effect
  useEffect(() => {
    if (!isMounted || gridSize.total === 0) return;
    const interval = setInterval(() => {
      setGridColors((prev) =>
        prev.map(
          () => colorOptions[Math.floor(Math.random() * colorOptions.length)]
        )
      );
    }, 800);
    return () => clearInterval(interval);
  }, [isMounted, gridSize.total]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        ref={gridRef}
        className="grid gap-3 w-full h-full opacity-80 blur-[0.4px]"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, 80px)`,
        }}
      >
        {isMounted
          ? gridColors.map((color, i) => (
              <motion.div
                key={i}
                className={`w-20 h-20 rounded-lg ${color}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, delay: i * 0.002 }}
              />
            ))
          : Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="w-20 h-20 rounded-lg bg-emerald-500/10" />
            ))}
      </div>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/80 to-neutral-950/95 backdrop-blur-[2px]" />
    </div>
  );
};

//
// === 2. Command Copy Box ===
//
const CommandCopy = () => {
  const [copied, setCopied] = useState(false);
  const command = "npx backternity@latest init";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.2, ease: "easeOut" }}
      className="mt-8 sm:mt-12 flex flex-col items-center gap-4 sm:gap-6 w-full max-w-2xl mx-auto px-4 sm:px-0"
    >
      {/* === Command Box === */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 16 }}
        onClick={handleCopy}
        className="group relative w-full cursor-pointer overflow-hidden 
          rounded-xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl
          shadow-[0_0_25px_rgba(0,255,180,0.08)] hover:shadow-[0_0_35px_rgba(0,255,180,0.12)]
          transition-all duration-100"
      >
        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-100" />

        {/* Code & Copy Indicator */}
        <div className="relative flex items-center justify-between px-3 py-2">
          <div className="flex-1 overflow-hidden">
            <CodeBlock language="bash" code={command} />
          </div>
        </div>
      </motion.div>

      {/* === CTA Buttons === */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 w-full">
        <motion.a
          href="/browse/auth-jwt"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-emerald-500 text-neutral-950 text-sm font-semibold
            shadow-[0_0_25px_rgba(0,255,180,0.25)] hover:bg-emerald-400 transition-colors duration-200 text-center"
        >
          Browse Components
        </motion.a>

        <motion.a
          href="/docs"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-white/10 text-neutral-300 text-sm font-semibold
            hover:border-emerald-500/30 hover:text-emerald-300 hover:bg-neutral-900/40 
            transition-all duration-200 text-center"
        >
          Documentation
        </motion.a>
      </div>
    </motion.div>
  );
};
//
// === 3. Hero Section ===
//
export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 overflow-hidden">
      <DynamicGridBackground />
      <HeroHeader />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl w-full text-center">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-emerald-500/20 
              bg-emerald-500/5 text-emerald-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Ship features, not infrastructure
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.1] sm:leading-tight"
          >
            <span className="text-neutral-100 drop-shadow-[0_1px_5px_rgba(255,255,255,0.1)]">
              Modular Backend.
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
              Minimal Effort.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-neutral-400 leading-relaxed font-light px-4 sm:px-0"
          >
            Build scalable backends with one command. Authentication, data, and
            messaging that integrate in minutes — so you can focus on features,
            not configuration.
          </motion.p>

          {/* Command + Buttons */}
          <CommandCopy />

          {/* Feature tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-neutral-500 px-4"
          >
            {["Development Ready", "Extendable Ready", "Production Ready"].map((label) => (
              <div key={label} className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="whitespace-nowrap">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-neutral-600"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
