"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { contactData } from "@/lib/contact";

export const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="relative group">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/logo.svg"
                alt="a+A Architects logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain shrink-0"
              />

              <div className="flex flex-col justify-center">
                <span className="text-xl font-medium tracking-tight">
                  a+A Architects
                </span>

                <span className="text-xs text-muted-foreground tracking-widest uppercase">
                  Architecture & Design Studio
                </span>
              </div>
            </motion.div>

            <motion.span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group py-2"
                >
                  {link.label}
                  <motion.span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: navLinks.length * 0.1 }}
              className="flex flex-col items-center gap-1"
            >
              <AnimatedThemeToggler
                variant="circle"
                className="text-muted-foreground hover:text-foreground transition-colors "
              />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden relative w-10 h-10 p-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <motion.span
                  className="w-full h-px bg-foreground absolute"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 0 : -4,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-full h-px bg-foreground absolute"
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                    scaleX: isMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-full h-px bg-foreground absolute"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? 0 : 4,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </Button>
          </motion.div>
        </nav>
      </motion.header>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col justify-center items-center h-full">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-light py-4 block hover:text-muted-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Contact Info in Mobile Menu */}
              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a
                  href={`mailto:${contactData.email}`}
                  className="text-sm text-muted-foreground hover:opacity-70 transition-opacity"
                >
                  {contactData.email}
                </a>
                <div className="text-sm text-muted-foreground">
                  {contactData.phone.map((phoneNumber, index) => (
                    <span key={phoneNumber}>
                      <a
                        href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}
                        className="hover:opacity-70 transition-opacity"
                      >
                        {phoneNumber}
                      </a>
                      {index < contactData.phone.length - 1 && ", "}
                    </span>
                  ))}
                </div>
                <div className="py-2">
                  <AnimatedThemeToggler
                    variant="circle"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm text-foreground hover:bg-foreground/10 transition-colors"
                    text="Toggle Theme"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
