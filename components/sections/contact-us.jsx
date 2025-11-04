"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight mb-3">
            Get in touch
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Questions, partnerships, or custom backend work — we’re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="rounded-xl border border-white/[0.05] bg-card/40 backdrop-blur-sm p-8">
            <div className="flex items-center mb-6">
              <MessageSquare className="w-5 h-5 text-primary/80 mr-3" />
              <h3 className="text-lg font-medium text-foreground">Send a message</h3>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-1">
                  Message sent
                </h4>
                <p className="text-sm text-muted-foreground">
                  We’ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="bg-background/60 border-white/[0.05] focus:ring-1 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
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
                    className="bg-background/60 border-white/[0.05] focus:ring-1 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or question..."
                    className="w-full px-3 py-2 rounded-md bg-background/60 border border-white/[0.05] text-foreground text-sm placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/40 focus:border-transparent resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="rounded-xl border border-white/[0.05] bg-card/40 backdrop-blur-sm p-8">
              <h3 className="text-lg font-medium text-foreground mb-5">Reach us directly</h3>
              <div className="space-y-5 text-sm">
                <div>
                  <div className="text-foreground font-medium mb-1">Email</div>
                  <p className="text-muted-foreground">hello@backternity.com</p>
                </div>
                <div>
                  <div className="text-foreground font-medium mb-1">GitHub Issues</div>
                  <p className="text-muted-foreground">github.com/backternity/components</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="rounded-xl border border-white/[0.05] bg-card/40 backdrop-blur-sm p-8">
              <h3 className="text-lg font-medium text-foreground mb-5">Follow us</h3>
              <div className="flex space-x-3">
                {[Github, Twitter, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-2 rounded-md border border-white/[0.05] hover:border-primary/20 hover:bg-primary/5 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="rounded-xl border border-white/[0.05] bg-card/40 backdrop-blur-sm p-8">
              <h3 className="text-lg font-medium text-foreground mb-5">Quick Answers</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-foreground font-medium mb-1">Are components free?</div>
                  <p className="text-muted-foreground">Yes — open source and MIT licensed.</p>
                </div>
                <div>
                  <div className="text-foreground font-medium mb-1">Do you offer custom work?</div>
                  <p className="text-muted-foreground">
                    Yes, we design and build tailored backend components.
                  </p>
                </div>
                <div>
                  <div className="text-foreground font-medium mb-1">How often are updates released?</div>
                  <p className="text-muted-foreground">
                    Monthly releases with improvements and fixes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
