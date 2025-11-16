import Link from "next/link";
import {Package } from "lucide-react";
import { IconBrandTwitter } from "@tabler/icons-react";
import { IconBrandLinkedin } from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer
      aria-label="Site Footer"
      className="bg-neutral-950 text-neutral-400 py-16 px-6 md:px-12 border-t border-neutral-800/50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* About Section */}
          <section aria-labelledby="footer-about-title" className="lg:col-span-1">
            <h2 id="footer-about-title" className="text-white font-switzer-semibold text-xl mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Backternity
            </h2>
            <p className="text-sm leading-relaxed mb-6 text-neutral-400 font-switzer-light">
              Modular backend components for modern developers. Build scalable, production-ready backends with one command. Authentication, databases, and messaging that integrate instantly.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/backternity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-emerald-400 transition-colors p-2 hover:bg-emerald-500/10 rounded-lg"
                aria-label="Follow Backternity on LinkedIn"
              >
                <IconBrandLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/backternity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-emerald-400 transition-colors p-2 hover:bg-emerald-500/10 rounded-lg"
                aria-label="Follow Backternity on Twitter"
              >
                <IconBrandTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.npmjs.com/package/backternity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-emerald-400 transition-colors p-2 hover:bg-emerald-500/10 rounded-lg"
                aria-label="View Backternity NPM Package"
              >
                <Package className="w-5 h-5" />
              </a>
            </div>
          </section>

          {/* Components */}
          <nav aria-label="Component navigation">
            <h3 className="text-white font-switzer-semibold text-base mb-4">Popular Components</h3>
            <ul className="space-y-3 text-sm font-switzer-light">
              <li>
                <Link href="/browse/auth-jwt" className="hover:text-emerald-400 transition-colors flex items-start">
                  JWT Authentication
                </Link>
              </li>
              <li>
                <Link href="/browse/mongodb-database" className="hover:text-emerald-400 transition-colors">
                  MongoDB Integration
                </Link>
              </li>
              <li>
                <Link href="/browse/aws-s3-upload" className="hover:text-emerald-400 transition-colors">
                  AWS S3 File Upload
                </Link>
              </li>
              <li>
                <Link href="/browse/razorpay-gateway-express-js" className="hover:text-emerald-400 transition-colors">
                  Razorpay Payment
                </Link>
              </li>
              <li>
                <Link href="/browse" className="hover:text-emerald-400 transition-colors font-switzer-medium text-emerald-400/80">
                  View All Components →
                </Link>
              </li>
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources navigation">
            <h3 className="text-white font-switzer-semibold text-base mb-4">Resources</h3>
            <ul className="space-y-3 text-sm font-switzer-light">
              <li>
                <a 
                  href="https://www.npmjs.com/package/backternity" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  NPM Package
                </a>
              </li>
              <li>
                <a 
                  href="https://nodejs.org/docs" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Node.js Documentation
                </a>
              </li>
              <li>
                <a 
                  href="https://expressjs.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Express.js Docs
                </a>
              </li>
              <li>
                <a 
                  href="https://www.mongodb.com/docs/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  MongoDB Docs
                </a>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company navigation">
            <h3 className="text-white font-switzer-semibold text-base mb-4">Company</h3>
            <ul className="space-y-3 text-sm font-switzer-light">
              <li>
                <Link href="#features" className="hover:text-emerald-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#solutions" className="hover:text-emerald-400 transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-emerald-400 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/browse" className="hover:text-emerald-400 transition-colors">
                  Browse All
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <hr className="border-neutral-800/50 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-switzer-light">
          <p>© {new Date().getFullYear()} Backternity. All rights reserved. Built for developers, by developers.</p>
          <div className="flex items-center gap-6">
            <Link href="#contact" className="hover:text-emerald-400 transition-colors">
              Contact
            </Link>
            <a
              href="mailto:team@backternity.dev"
              className="hover:text-emerald-400 transition-colors"
              aria-label="Email Backternity team"
            >
              team@backternity.dev
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-800/50 text-center">
          <p className="text-xs text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            <strong className="text-neutral-500">Backternity</strong> is the modular backend framework component library that helps developers build scalable Node.js applications with ready-to-use components. 
            Features include JWT authentication, MongoDB integration, PostgreSQL, AWS S3 file uploads, real-time WebSocket support, rate limiting middleware, payment gateway integrations, and much more incoming. 
            Perfect for building REST APIs, microservices, and full-stack applications with Express.js, Next.js, and React.
          </p>
        </div>
      </div>
    </footer>
  );
}
