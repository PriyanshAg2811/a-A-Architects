"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="text-lg font-medium group relative inline-block">
              Elena Vasquez
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300"
              />
            </Link>
            <p className="text-xs text-muted-foreground mt-1">
              Architecture & Design Studio
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {["Work", "About", "Services", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-foreground transition-colors relative group"
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300"
                />
              </Link>
            ))}
          </motion.nav>

          {/* Copyright */}
          <motion.p
            className="text-xs text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            &copy; {currentYear} Elena Vasquez Architects. All rights reserved.
          </motion.p>
        </div>

        {/* Back to Top */}
        <motion.div
          className="mt-8 pt-8 border-t border-border flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
            whileHover={{ y: -2 }}
          >
            <motion.svg
              className="w-4 h-4 rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </motion.svg>
            Back to Top
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
