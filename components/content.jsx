"use client";
import { TerminalDemo } from "./ui/TerminalDemo";
import { motion } from "framer-motion";
import {
  Code2,
  Zap,
  Shield,
  Globe,
  Database,
  Lock,
  Activity,
  Layers,
} from "lucide-react";

export default function Content() {
  const architectureSteps = [
    {
      icon: Code2,
      title: "Choose Components",
      description: "Pick from our modular backend building blocks.",
      step: "01",
    },
    {
      icon: Zap,
      title: "Install Instantly",
      description: "Integrate seamlessly with one CLI command.",
      step: "02",
    },
    {
      icon: Shield,
      title: "Deploy Securely",
      description: "Production-ready, scalable, and extendable.",
      step: "03",
    },
  ];

  const capabilities = [
    { icon: Database, text: "Database", desc: "MongoDB, PostgreSQL, Redis" },
    { icon: Lock, text: "Authentication", desc: "JWT, OAuth, MFA, Session" },
    { icon: Activity, text: "Realtime", desc: "WebSockets, SSE, Live updates" },
    { icon: Layers, text: "Middleware", desc: "Logging, CORS, Rate Limiting" },
    { icon: Globe, text: "Utility", desc: "Winston, Bull Queue, Worker Threads" },
    { icon: Shield, text: "Uploads", desc: "AWS S3, Minio, Multer" },
  ];

  return (
    <section
      aria-labelledby="content-heading"
      className="relative overflow-hidden py-20 sm:py-28 md:py-32 bg-gradient-to-b from-neutral-950 via-neutral-950 to-[#001510] text-neutral-100"
    >
      {/* Layered lighting and glows */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vh] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[50vw] h-[60vh] bg-emerald-700/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with meaningful heading */}
        <div className="text-center mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-emerald-500/5 border border-emerald-500/20 rounded-full mb-5 backdrop-blur-sm"
            aria-hidden="true"
          >
            <Layers className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-medium text-emerald-400">
              Backend Development Reimagined
            </span>
          </motion.div>

          <motion.h2
            id="content-heading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-switzer-bold text-white tracking-tight leading-tight mb-4"
          >
            Build Backends{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
              Beautifully & Effortlessly
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-switzer-light"
          >
            Transform your workflow with modular, production-grade backend
            components that accelerate development and reduce friction.
          </motion.p>
        </div>

        {/* Grid: Terminal + Steps */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-2 lg:order-1"
            aria-label="Terminal demo showcasing backend commands"
            role="region"
          >
            {/* Emerald background glows */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px]" aria-hidden="true" />
            <div className="absolute bottom-0 -left-10 w-48 h-48 bg-emerald-400/10 rounded-full blur-[100px]" aria-hidden="true" />
            <div className="relative z-10 rounded-2xl overflow-hidden border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.15)] backdrop-blur-sm">
              <TerminalDemo />
            </div>
          </motion.div>

          {/* Text + Steps */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-3 leading-tight">
                From Concept to Production{" "}
                <span className="text-emerald-400">in Minutes</span>
              </h3>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                Backternity provides enterprise-grade backend modules that fit
                together seamlessly. <strong>Skip the setup — build what matters.</strong>
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {architectureSteps.map((step, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg border border-transparent hover:border-emerald-500/20 bg-neutral-900/40 hover:bg-neutral-900/60 transition-all duration-200"
                  aria-label={`Step ${step.step}: ${step.title}`}
                >
                  <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-emerald-500/10 rounded-md flex-shrink-0" aria-hidden="true">
                    <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-white text-sm sm:text-base">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-neutral-400">{step.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Capabilities */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          aria-labelledby="capabilities-heading"
        >
          <div className="text-center mb-12 sm:mb-16">
            <h3
              id="capabilities-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-2"
            >
              Everything You Need, Simplified
            </h3>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
              Curated modules for every part of your backend stack — designed to
              scale, integrate, and perform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {capabilities.map((cap, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                className="group p-4 sm:p-5 bg-neutral-900/60 border border-neutral-800/60 rounded-xl backdrop-blur-sm hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300"
                aria-label={`${cap.text} capability`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className="p-2 bg-emerald-500/10 rounded-md group-hover:bg-emerald-500/20 transition-all flex-shrink-0"
                    aria-hidden="true"
                  >
                    <cap.icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-white mb-1 group-hover:text-emerald-400 transition-colors text-sm sm:text-base">
                      {cap.text}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-400">{cap.desc}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </div>
    </section>
  );
}
