"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, Code2, Shield, TrendingUp } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Backend Developer",
    company: "TechFlow Inc.",
    content:
      "Backternity's JWT authentication saved us weeks of boilerplate. Secure, type-safe, and effortlessly integrated.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Engineering Lead",
    company: "DataStream Solutions",
    content:
      "The MongoDB integration removed all schema chaos. Clean APIs, fast queries, and robust error handling.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Full Stack Developer",
    company: "CloudTech",
    content:
      "Rate limiting and caching let us scale without stress. We built resilient infrastructure in days, not weeks.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "CTO",
    company: "InnovateLabs",
    content:
      "Every component breathes security — validation, encryption, and audit logging baked in. Trust by design.",
    rating: 5,
  },
];

const stats = [
  { label: "Lines of Code Saved", value: "25k+" },
  { label: "Active Developers", value: "2.3k+" },
  { label: "Faster Development", value: "80%" },
  { label: "Security Score", value: "99.97%" },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-3 sm:mb-4">
            Developers who trust Backternity
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            Real feedback from engineers building scalable systems with modular backend components.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group border border-white/[0.05] bg-card/40 rounded-xl p-6 backdrop-blur-sm hover:border-primary/20 transition-all duration-300"
            >
              <div className="relative mb-5">
                <Quote className="absolute -top-1 -left-1 w-5 h-5 text-primary/15" />
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                  “{t.content}”
                </p>
              </div>

              <div className="flex mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-3.5 h-3.5 text-primary/80 fill-current opacity-80"
                  />
                ))}
              </div>

              <div>
                <div className="font-medium text-foreground">{t.name}</div>
                <div className="text-sm text-muted-foreground">
                  {t.role} — <span className="text-primary/70">{t.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-white/[0.05] pt-12"
        >
          {stats.map((s, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl font-semibold text-foreground">
                {s.value}
              </div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Trust Line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-6 text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-primary/80" />
            <span>SOC 2 Certified</span>
          </div>
          <span className="hidden sm:block w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-primary/80" />
            <span>99.9% Uptime SLA</span>
          </div>
          <span className="hidden sm:block w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-primary/80" />
            <span>Open Source</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
