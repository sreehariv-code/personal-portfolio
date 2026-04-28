"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Menu, X, Download } from "lucide-react";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md"
          : "border-transparent bg-background-light dark:bg-background-dark"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-primary"
          onClick={closeMenu}
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-white">
            <Terminal size={18} strokeWidth={2.5} />
          </div>
          <span className="text-slate-900 dark:text-slate-100 text-lg font-bold tracking-tight">
            sreehari<span className="text-primary">.dev</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 h-10 px-5 rounded-lg bg-primary text-white text-sm font-bold tracking-wide transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
          >
            <Download size={15} strokeWidth={2.5} />
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

    </header>

    {/* Side drawer — rendered outside <header> so it can overlay the full page */}
    <AnimatePresence>
      {menuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[55] bg-slate-900/50 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            className="fixed top-0 right-0 h-full w-72 z-[60] bg-background-light dark:bg-background-dark flex flex-col shadow-2xl md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <a
                href="#"
                onClick={closeMenu}
                className="flex items-center gap-2 text-primary"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white">
                  <Terminal size={16} strokeWidth={2.5} />
                </div>
                <span className="text-slate-900 dark:text-slate-100 text-base font-bold tracking-tight">
                  sreehari<span className="text-primary">.dev</span>
                </span>
              </a>
              <button
                onClick={closeMenu}
                aria-label="Close menu"
                className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-6 py-6 gap-1 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.05 }}
                  className="py-3 px-2 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Resume CTA */}
            <div className="px-6 py-6 border-t border-slate-200 dark:border-slate-800">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 h-11 w-full rounded-lg bg-primary text-white text-sm font-bold transition-all hover:bg-primary/90 active:scale-95"
              >
                <Download size={15} strokeWidth={2.5} />
                Download Resume
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
