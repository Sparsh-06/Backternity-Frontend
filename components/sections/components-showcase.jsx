"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, Database, Shield, Cloud, Zap, Cog } from "lucide-react";

const componentCategories = [
  {
    title: "Authentication",
    description: "Secure user management and access control systems",
    icon: Shield,
    count: "4 components",
    examples: ["JWT Authentication", "Multi-Factor Auth", "OAuth Integration"],
  },
  {
    title: "Database",
    description: "Database integrations and data management solutions",
    icon: Database,
    count: "3 components",
    examples: ["MongoDB Setup", "PostgreSQL", "Prisma Integration"],
  },
  {
    title: "Storage",
    description: "File upload and cloud storage management",
    icon: Cloud,
    count: "2 components",
    examples: ["AWS S3 Upload", "File Processing", "CDN Integration"],
  },
  {
    title: "Middleware",
    description: "Request processing and utility functions",
    icon: Cog,
    count: "3 components",
    examples: ["Rate Limiting", "CORS Setup", "Request Validation"],
  },
  {
    title: "Logging",
    description: "Application monitoring and error tracking",
    icon: Code,
    count: "2 components",
    examples: ["Winston Logger", "Error Tracking", "Performance Monitoring"],
  },
  {
    title: "Performance",
    description: "Optimization and background processing",
    icon: Zap,
    count: "2 components",
    examples: ["Worker Threads", "Caching", "Job Queues"],
  },
];

export default function ComponentsShowcase() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Soft background accents */}
      <motion.div
        initial={{ opacity: 0.05, scale: 0.9 }}
        animate={{ opacity: [0.05, 0.15, 0.05], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background/80"
      />
      <motion.div
        initial={{ opacity: 0.08, scale: 0.8 }}
        animate={{ opacity: [0.08, 0.18, 0.08], scale: [0.8, 1, 0.8] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/3 top-1/4 w-[20rem] sm:w-[24rem] lg:w-[28rem] h-[20rem] sm:h-[24rem] lg:h-[28rem] bg-primary/10 rounded-full blur-[100px] sm:blur-[120px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 tracking-tight">
            Production-Ready Components
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Over 20 modular backend components designed for scalability, security, and speed.
            Each follows best practices and integrates seamlessly with your stack.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.08 }}
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0 },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20"
        >
          {componentCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={index}
                className="group relative p-4 sm:p-6 rounded-xl border border-white/[0.05] bg-gradient-to-br from-background/50 to-background/40 backdrop-blur-sm hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:border-primary/20 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                {/* Soft highlight ring */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

                <div className="flex items-center mb-3 sm:mb-4 relative z-10">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-primary/10 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-primary/15 transition-colors flex-shrink-0">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-base sm:text-lg truncate">
                      {category.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{category.count}</p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                  {category.description}
                </p>

                <ul className="space-y-1.5 sm:space-y-2 relative z-10">
                  {category.examples.map((example, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-muted-foreground flex items-center"
                    >
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full mr-2 sm:mr-3 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      <span className="truncate">{example}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center px-4 sm:px-0"
        >
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-[0_8px_24px_-6px_rgba(0,200,129,0.25)] hover:shadow-[0_8px_32px_-4px_rgba(0,200,129,0.35)] text-sm sm:text-base"
          >
            Browse All Components
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
