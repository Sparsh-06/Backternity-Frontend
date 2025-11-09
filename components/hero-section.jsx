"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { HeroHeader } from "./header";
import MeshGradientBackground from "./ui/MeshGradient";

// Mesh Gradient Background Component

// Feature card component
const FeatureCard = ({ title, description, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
    className="group relative overflow-hidden rounded-2xl bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 p-6 hover:border-emerald-500/30 transition-all duration-300"
  >
    <div className="relative z-10">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-switzer-semibold text-neutral-100 mb-2">{title}</h3>
      <p className="text-sm text-neutral-400 leading-relaxed font-switzer-light">{description}</p>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </motion.div>
);

// Code snippet showcase
const CodeShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);
  const examples = [
    { label: "Init", code: "npx backternity@latest init" },
    { label: "Auth", code: "auth.login({ email, password })" },
    { label: "Database", code: "db.users.find({ active: true })" },
    { label: "Realtime", code: "events.publish('user:joined', payload)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.0, duration: 0.5 }}
      className="rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-neutral-800/50 p-6 overflow-hidden"
    >
      <div className="flex gap-2 mb-4">
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
      <div className="font-mono text-sm text-emerald-400 bg-neutral-950/50 rounded-lg p-4 select-none">
        {examples[activeTab].code}
      </div>
    </motion.div>
  );
};

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 overflow-hidden">
      {/* Mesh Gradient Background */}
      <MeshGradientBackground/>
      <HeroHeader/>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 w-full items-center">
          {/* Left: Main content */}
          <div className="space-y-8">
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
              animate={{ opacity: 1, y: 0}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2"
            >
              <a
                href="/browse/razorpay-gateway-express-js"
                className="text-sm font-switzer-light flex items-center gap-1 hover:gap-2 duration-100 transition-all text-neutral-300 hover:text-white"
              >
                Razorpay Payment Component{" "}
                <span>
                  <MoveRight size={16} />
                </span>
              </a>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-5xl lg:text-7xl font-switzer-bold tracking-tight leading-tight">
                <span className="text-neutral-100">Modular Backend.</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
                  Minimal Effort.
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-neutral-400 max-w-xl leading-relaxed font-switzer-light">
                Build scalable backends with one command. Authentication, data,
                and messaging that integrate in minutes.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/50 w-fit group cursor-pointer hover:border-neutral-700 transition-colors">
                <span className="text-neutral-500 text-sm">▲</span>
                <code className="font-mono text-sm text-neutral-300 group-hover:text-white transition-colors font-switzer-light">
                  npx backternity@latest init
                </code>
              </div>

              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="/browse/auth-jwt"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full bg-emerald-500 text-neutral-950 font-switzer-semibold shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 transition-colors"
                >
                  Browse Components
                </motion.a>
                <motion.a
                  href="/docs"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full border border-neutral-700 text-neutral-300 font-switzer-medium hover:border-emerald-500/50 hover:text-emerald-300 transition-all"
                >
                  Documentation
                </motion.a>
              </div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-6 text-sm text-neutral-500 font-switzer-light"
            >
              {["Development Ready", "Extendable", "Developer Friendly"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-emerald-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item}</span>
                  </div>
                )
              )}
            </motion.div>
          </div>

          {/* Right: Bento grid features */}
          <div className="grid grid-cols-2 gap-4 p-6">
            <div className="col-span-2">
              <FeatureCard
                icon="⚙️"
                title="Backend in One Command"
                description="Spin up a fully functional backend with one CLI command — preconfigured routing, environment setup, and modular architecture ready to extend."
                delay={0.4}
              />
            </div>

            <FeatureCard
              icon="🔑"
              title="Auth Modules"
              description="Plug in ready-to-use authentication systems — JWT, OAuth, and session-based auth with minimal setup and full TypeScript support."
              delay={0.6}
            />

            <FeatureCard
              icon="🗄️"
              title="Database Connectors"
              description="Integrate MongoDB, PostgreSQL, or any supported database instantly with typed models and prebuilt CRUD operations."
              delay={0.8}
            />

            <div className="col-span-2">
              <CodeShowcase />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-600"
      >
        <svg
          className="w-6 h-6"
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