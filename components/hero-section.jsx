"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, Settings, Key, Database, Copy, Check } from "lucide-react";
import { HeroHeader } from "./header";
import MeshGradientBackground from "./ui/MeshGradient";

// FeatureCard
const FeatureCard = ({ title, description, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
    className="group relative overflow-hidden rounded-2xl bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 p-4 sm:p-6 hover:border-emerald-500/30 transition-all duration-300"
  >
    <div className="relative z-10">
      <div className="text-emerald-400 mb-3 sm:mb-4">
        <Icon size={26} className="sm:w-8 sm:h-8" />
      </div>
      <h3 className="text-[15px] sm:text-lg font-switzer-semibold text-neutral-100 mb-1 sm:mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-[13px] sm:text-[15px] text-neutral-400 leading-relaxed font-switzer-light">
        {description}
      </p>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </motion.div>
);

// CodeShowcase
const CodeShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const examples = [
    { label: "Init", code: "npx backternity@latest init" },
    { label: "Auth", code: "npx backternity@latest add auth-jwt" },
    { label: "Database", code: "npx backternity@latest add mongodb-database" },
    { label: "Realtime", code: "npx backternity@latest add sse-realtime" },
  ];

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.0, duration: 0.5 }}
      className="rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-neutral-800/50 p-4 sm:p-6 overflow-hidden"
    >
      <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
        {examples.map((ex, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-switzer-medium transition-all duration-200 ${
              activeTab === i
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            {ex.label}
          </button>
        ))}
      </div>
      <div 
        className="relative font-mono text-xs sm:text-sm text-emerald-400 bg-neutral-950/50 rounded-lg p-3 sm:p-4 break-all cursor-pointer hover:bg-neutral-950/70 transition-colors group"
        onClick={() => copyToClipboard(examples[activeTab].code)}
      >
        <div className="flex items-center justify-between">
          <span className="select-none">{examples[activeTab].code}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(examples[activeTab].code);
            }}
            className="ml-2 text-neutral-500 hover:text-emerald-400 transition-colors opacity-0 group-hover:opacity-100"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        
        {/* Copied feedback */}
        {copied && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 rounded-md px-2 py-1 animate-fade">
            Copied!
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 overflow-hidden">
      <MeshGradientBackground />
      <HeroHeader />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20 flex items-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">
          {/* LEFT */}
          {/* Left: Main content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 text-sm font-switzer-medium">
                What's new
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2"
            >
              {" "}
              <a
                href="/browse/razorpay-gateway-express-js"
                className="text-sm font-switzer-light flex items-center gap-1 hover:gap-2 duration-100 transition-all text-neutral-300 hover:text-white"
              >
                {" "}
                Razorpay Payment Component{" "}
                <span>
                  {" "}
                  <MoveRight size={16} />{" "}
                </span>{" "}
              </a>{" "}
            </motion.div>{" "}
            {/* Headline */}{" "}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {" "}
              <h1 className="text-5xl lg:text-7xl font-switzer-bold tracking-tight leading-tight">
                {" "}
                <span className="text-neutral-100">Modular Backend.</span>{" "}
                <br />{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
                  {" "}
                  Minimal Effort.{" "}
                </span>{" "}
              </h1>{" "}
              <p className="text-lg lg:text-xl text-neutral-400 max-w-xl leading-relaxed font-switzer-light">
                {" "}
                Build scalable backends with one command. Authentication, data,
                and messaging that integrate in minutes.{" "}
              </p>{" "}
            </motion.div>{" "}
            {/* CTA */}{" "}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              {" "}
              {/* Full-width command strip */}{" "}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="relative w-full sm:w-[55vw] -mx-4 sm:-mx-6 lg:-mx-[60vw] mb-8 sm:mb-12 lg:left-[80%] lg:right-[50%]"
                onClick={() => copyToClipboard("npx backternity@latest init")}
              >
                {" "}
                <div className="relative backdrop-blur-[1px] border-[1px] overflow-hidden rounded-full border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.15)] group cursor-pointer hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all duration-500">
                  {" "}
                  {/* Animated light beam effect */}{" "}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-emerald-400/30 animate-pulse"></div>{" "}
                  {/* Content container */}{" "}
                  <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-start sm:justify-center">
                    {" "}
                    <div className="flex items-center gap-2 sm:gap-3 relative z-10 sm:ml-[380px] -ml-0">
                      {" "}
                      <span className="text-neutral-500 text-xs sm:text-sm">
                        {" "}
                        ▲{" "}
                      </span>{" "}
                      <code className="font-mono text-xs sm:text-sm text-neutral-300 group-hover:text-emerald-300 transition-colors break-all">
                        {" "}
                        npx backternity@latest init{" "}
                      </code>{" "}
                      <button
                        onClick={() =>
                          copyToClipboard("npx backternity@latest init")
                        }
                        className="ml-1 sm:ml-2 text-neutral-500 hover:text-emerald-400 transition-colors"
                      >
                        {" "}
                        {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
                      </button>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </motion.div>{" "}
              <div className="flex flex-wrap gap-3">
                {" "}
                <motion.a
                  href="/browse/auth-jwt"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full bg-emerald-500 text-neutral-950 font-switzer-semibold shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 transition-colors"
                >
                  {" "}
                  Browse Components{" "}
                </motion.a>{" "}
                <motion.a
                  href="/docs"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full border border-neutral-700 text-neutral-300 font-switzer-medium hover:border-emerald-500/50 hover:text-emerald-300 transition-all"
                >
                  {" "}
                  Documentation{" "}
                </motion.a>{" "}
              </div>{" "}
            </motion.div>{" "}
            {/* Trust indicators */}{" "}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-6 text-sm text-neutral-500 font-switzer-light"
            >
              {" "}
              {["Development Ready", "Extendable", "Developer Friendly"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2">
                    {" "}
                    <svg
                      className="w-5 h-5 text-emerald-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      {" "}
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />{" "}
                    </svg>{" "}
                    <span>{item}</span>{" "}
                  </div>
                )
              )}{" "}
            </motion.div>{" "}
          </div>
          {/* RIGHT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-10 lg:mt-0">
            <div className="col-span-1 sm:col-span-2">
              <FeatureCard
                icon={Settings}
                title="Backend in One Command"
                description="Spin up a fully functional backend with one CLI command — preconfigured routing, environment setup, and modular architecture ready to extend."
                delay={0.4}
              />
            </div>
            <FeatureCard
              icon={Key}
              title="Auth Modules"
              description="Plug in ready-to-use authentication systems — JWT, OAuth, and session-based auth with minimal setup and full TypeScript support."
              delay={0.4}
            />
            <FeatureCard
              icon={Database}
              title="Database Connectors"
              description="Integrate MongoDB, PostgreSQL, or any supported database instantly with typed models and prebuilt CRUD operations."
              delay={0.4}
            />
            <div className="col-span-1 sm:col-span-2">
              <CodeShowcase />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-neutral-600"
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
  );
}
