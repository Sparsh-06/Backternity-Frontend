"use client";
import { TerminalDemo } from "./ui/TerminalDemo";
import { motion } from "framer-motion";
import { Code2, Zap, Shield, Globe, Database, Lock, Activity, Layers } from "lucide-react";

export default function Content() {
  const architectureSteps = [
    {
      icon: Code2,
      title: "Choose Components",
      description: "Pick from our various backend modules",
      step: "01",
    },
    {
      icon: Zap,
      title: "Install Instantly",
      description: "One command to integrate seamlessly",
      step: "02",
    },
    {
      icon: Shield,
      title: "Deploy Securely",
      description: "Production & Expandable - ready modules",
      step: "03",
    },
  ];

  const capabilities = [
    { icon: Database, text: "Database", desc: "MongoDB, PostgreSQL, Redis" },
    { icon: Lock, text: "Authentication", desc: "JWT, OAuth, MFA, Session" },
    { icon: Activity, text: "Real-time", desc: "WebSockets, SSE, Live updates" },
    { icon: Layers, text: "Middleware", desc: "Logging, CORS, Rate limiting" },
    { icon: Globe, text: "Utility", desc: "Winston, Bull Queue, Worker Threads" },
    { icon: Shield, text: "Upload", desc: "AWS, Minio, Drag and Drop, Multer" },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Elegant background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background/90">
        {/* Subtle geometric texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff'%3E%3Cpath opacity='0.3' d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Ambient motion glows */}
        <motion.div
          initial={{ opacity: 0.08, scale: 0.8 }}
          animate={{ opacity: [0.08, 0.18, 0.08], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 w-[28rem] h-[28rem] bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0.05, scale: 1.1 }}
          animate={{ opacity: [0.05, 0.12, 0.05], scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-1/4 w-[22rem] h-[22rem] bg-primary/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full mb-4 sm:mb-5 backdrop-blur-sm"
          >
            <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-primary/80" />
            <span className="text-xs sm:text-sm font-medium text-primary/80">Backend Development Reimagined</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 sm:mb-5 tracking-tight"
          >
            Build Backends <span className="block text-primary font-bold">Beautifully & Effortlessly</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
          >
            Transform your development workflow with modular, developer-ready backend components.
            Focus on innovation — not boilerplate.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            {/* Soft glows - smaller on mobile */}
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-20 h-20 sm:w-28 sm:h-28 bg-primary/5 rounded-full blur-xl sm:blur-2xl" />
            <div className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 w-24 h-24 sm:w-36 sm:h-36 bg-primary/5 rounded-full blur-2xl sm:blur-3xl" />

            <div className="relative z-10 transform hover:scale-[1.015] transition-transform duration-500">
              <TerminalDemo />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6 sm:space-y-8 order-1 lg:order-2"
          >
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-2 sm:mb-3">
                From Concept to Production <span className="text-primary font-semibold">in Minutes</span>
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Backternity delivers enterprise-grade backend building blocks that integrate seamlessly into your server.  
                <b> Skip setup — ship faster.</b>
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-2 sm:space-y-3">
              {architectureSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-muted/30 transition-all duration-200"
                >
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-md flex-shrink-0">
                    <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-foreground text-sm sm:text-base">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 sm:mt-20"
        >
          <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-2 sm:mb-3">Everything You Need, Simplified</h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Thoughtfully designed modules covering every layer and application building of modern backend development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                className="group p-4 sm:p-5 bg-card/60 border border-border/60 rounded-xl backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-2.5 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-all flex-shrink-0">
                    <cap.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors text-sm sm:text-base">
                      {cap.text}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{cap.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
