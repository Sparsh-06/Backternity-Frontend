"use client";

import { useState } from "react";
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle,
  MailIcon,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-28 lg:py-32 bg-gradient-to-b from-[#001510] via-neutral-950 to-black text-neutral-100">


      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-switzer-semibold text-white mb-4 tracking-tight">
            Get in <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed font-switzer-light">
            For partnerships, collaborations, or custom backend components — let’s build something powerful together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl border border-neutral-800/60 bg-neutral-900/50 backdrop-blur-sm hover:border-emerald-500/25 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)] transition-all duration-300"
          >
            <div className="flex items-center mb-6">
              <MessageSquare className="w-5 h-5 text-emerald-400 mr-3" />
              <h3 className="text-lg font-medium text-white">Send us a message</h3>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-1">Message sent!</h4>
                <p className="text-sm text-neutral-400">
                  We’ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm text-neutral-400 mb-2"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="bg-neutral-950/50 border-neutral-800 focus:ring-1 focus:ring-emerald-400/40"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-neutral-400 mb-2"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="bg-neutral-950/50 border-neutral-800 focus:ring-1 focus:ring-emerald-400/40"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm text-neutral-400 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      className="w-full px-3 py-2 rounded-md bg-neutral-950/50 border border-neutral-800 text-neutral-200 text-sm placeholder:text-neutral-500 focus:ring-1 focus:ring-emerald-400/40 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-emerald-500 to-teal-400 text-neutral-950 font-medium hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-neutral-900/30 border-t-neutral-900 rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <div className="p-8 rounded-2xl border border-neutral-800/60 bg-neutral-900/50 backdrop-blur-sm hover:border-emerald-500/25 transition-all duration-300">
              <h3 className="text-lg font-medium text-white mb-5">
                Reach us directly
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium text-white mb-1 flex items-center">
                    <MailIcon className="w-4 h-4 mr-2 text-emerald-400" />
                    Email
                  </div>
                  <p className="text-neutral-400">team@backternity.dev</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="p-8 rounded-2xl border border-neutral-800/60 bg-neutral-900/50 backdrop-blur-sm hover:border-emerald-500/25 transition-all duration-300">
              <h3 className="text-lg font-medium text-white mb-5">
                Quick Answers
              </h3>
              <div className="space-y-4 text-sm text-neutral-400">
                <div>
                  <div className="font-medium text-white mb-1">
                    Are components free?
                  </div>
                  <p>Yes — they’re absolutely free to use.</p>
                </div>
                <div>
                  <div className="font-medium text-white mb-1">
                    Do you offer custom work?
                  </div>
                  <p>Absolutely — we build scalable backend systems tailored to your stack.</p>
                </div>
                <div>
                  <div className="font-medium text-white mb-1">
                    How often are updates released?
                  </div>
                  <p>Monthly — with new components, optimizations, and features.</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
