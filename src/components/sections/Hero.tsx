"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Code2, Server, Bot, Gauge, Database, ArrowRight, Download } from "lucide-react";
import { resume } from "@/lib/resume";

/* ─── animation variants ─────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

/* ─── static content ─────────────────────────────────────────── */
const FEATURE_CARDS = [
  {
    icon: Gauge,
    title: "Cross-Platform Mobile",
    desc: "iOS + Android from one React Native codebase. Ships to both stores.",
  },
  {
    icon: Code2,
    title: "Performance First",
    desc: "Obsessive about render cycles, bundle size, and Core Web Vitals.",
  },
  {
    icon: Server,
    title: "Full-Stack Ready",
    desc: "From React UI to Node.js API — I can own the whole feature.",
  },
  {
    icon: Bot,
    title: "AI Tooling",
    desc: "LLM integrations and caching layers that actually save time in prod.",
  },
];

const TECH_ICONS = [
  { icon: Code2, label: "React / Next.js" },
  { icon: Gauge, label: "React Native" },
  { icon: Database, label: "Node.js" },
];

/* ─── code card ──────────────────────────────────────────────── */
type TK = "kw" | "fn" | "str" | "key" | "dim" | "comment" | "plain";

interface Token { t: TK; v: string }
type Line = Token[];

const kw   = (v: string): Token => ({ t: "kw",   v });
const fn_  = (v: string): Token => ({ t: "fn",   v });
const str  = (v: string): Token => ({ t: "str",  v });
const key  = (v: string): Token => ({ t: "key",  v });
const dim  = (v: string): Token => ({ t: "dim",  v });
const cmt  = (v: string): Token => ({ t: "comment", v });
const pl   = (v: string): Token => ({ t: "plain", v });

const CODE_LINES: Line[] = [
  [kw("const"), pl(" "), fn_("developer"), pl(" "), dim("= {")],
  [pl("  "), key("name"),   dim(": "), str(`'${resume.basics.name}'`), dim(",")],
  [pl("  "), key("role"),   dim(": "), str("'Software Engineer'"),      dim(",")],
  [pl("  "), key("stack"),  dim(": [")],
  [pl("    "), str("'React'"),        dim(", "), str("'React Native'"), dim(",")],
  [pl("    "), str("'Next.js'"),      dim(", "), str("'Node.js'"),      dim(",")],
  [pl("  "), dim("],")],
  [pl("  "), key("status"), dim(": "), str("'available'"),              dim(",")],
  [dim("} "), kw("as const"), dim(";")],
  [],
  [cmt("// open to full-time & freelance")],
  [kw("export default "), fn_("developer"), dim(";")],
];

/* ─── typing metrics (computed once at module level) ─────────── */
const LINE_LENGTHS = CODE_LINES.map(line =>
  line.reduce((sum, t) => sum + t.v.length, 0)
);
// CUMULATIVE[i] = total chars before line i
const CUMULATIVE: number[] = [0];
for (const len of LINE_LENGTHS) CUMULATIVE.push(CUMULATIVE[CUMULATIVE.length - 1] + len);
const TOTAL_CHARS = CUMULATIVE[CUMULATIVE.length - 1];

function getVisibleTokens(line: Line, charsToShow: number): Token[] {
  const result: Token[] = [];
  let remaining = charsToShow;
  for (const token of line) {
    if (remaining <= 0) break;
    if (token.v.length <= remaining) {
      result.push(token);
      remaining -= token.v.length;
    } else {
      result.push({ t: token.t, v: token.v.slice(0, remaining) });
      break;
    }
  }
  return result;
}

const TOKEN_CLASS: Record<TK, string> = {
  kw:      "text-purple-400",
  fn:      "text-yellow-300",
  str:     "text-green-400",
  key:     "text-blue-300",
  dim:     "text-slate-400",
  comment: "text-slate-500",
  plain:   "text-slate-300",
};

function CodeCard() {
  const [revealedChars, setRevealedChars] = useState(0);
  const [started, setStarted] = useState(false);
  const done = revealedChars >= TOTAL_CHARS;

  // Delay start to sync with the card's fade-in (0.3s delay + 0.5s duration)
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Typing interval: +3 chars every 25ms ≈ 2 seconds total
  useEffect(() => {
    if (!started || done) return;
    const id = setInterval(() => {
      setRevealedChars(c => Math.min(c + 3, TOTAL_CHARS));
    }, 25);
    return () => clearInterval(id);
  }, [started, done]);

  return (
    <motion.div
      custom={0.3}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="relative group"
    >
      {/* glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-700" />

      <div className="relative bg-[#1c1f27] border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden font-mono">
        {/* chrome bar */}
        <div className="bg-[#111318] px-4 py-3 flex items-center justify-between border-b border-slate-700/50">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-slate-500 text-xs px-2 py-0.5 bg-slate-800 rounded">
            developer.ts
          </span>
          <span className="w-12" />
        </div>

        {/* code body */}
        <div className="p-6 overflow-x-auto">
          <pre className="text-[13px] leading-6">
            {CODE_LINES.map((line, li) => {
              const startChar = CUMULATIVE[li];
              const endChar   = CUMULATIVE[li + 1];
              const isFullyVisible = revealedChars >= endChar;
              const isCurrentLine  = !isFullyVisible && revealedChars > startChar;
              // "invisible" keeps the row height so the card never resizes
              const hidden = !isFullyVisible && !isCurrentLine;

              return (
                <div key={li} className={`min-h-[1.5rem]${hidden ? " invisible" : ""}`}>
                  {isFullyVisible && line.map((token, ti) => (
                    <span key={ti} className={TOKEN_CLASS[token.t]}>{token.v}</span>
                  ))}
                  {isCurrentLine && (
                    <>
                      {getVisibleTokens(line, revealedChars - startChar).map((token, ti) => (
                        <span key={ti} className={TOKEN_CLASS[token.t]}>{token.v}</span>
                      ))}
                      <span
                        className="border-r-2 border-primary inline-block h-[0.85em] align-text-bottom ml-px"
                        style={{ animation: "cursor-blink 1s step-end infinite" }}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </pre>
        </div>

        {/* terminal footer */}
        <div className="px-6 py-3 border-t border-slate-700/50 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-slate-500 text-xs">
            {done ? "Ready." : "typing..."}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── main component ─────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative overflow-x-hidden grid-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">

        {/* ── two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: text content ── */}
          <div className="flex flex-col gap-7 text-center lg:text-left items-center lg:items-start">

            {/* availability badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest"
            >
              <Zap size={13} className="fill-primary" />
              Open to full-time &amp; freelance roles
            </motion.div>

            {/* headline */}
            <motion.h1
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-slate-100"
            >
              Hi, I&apos;m Sreehari —{" "}
              <br className="hidden sm:block" />
              I build apps people{" "}
              <span className="text-primary">actually use.</span>
            </motion.h1>

            {/* role subtitle */}
            <motion.div
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 text-base font-semibold text-slate-500 dark:text-slate-400"
            >
              <span>React</span>
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>React Native</span>
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>Next.js</span>
            </motion.div>

            {/* summary */}
            <motion.p
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-lg"
            >
              2+ years shipping production apps across mobile and web. React,
              React Native, Next.js — full stack, real users.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="flex items-center justify-center gap-2 h-13 px-8 py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:-translate-y-0.5 active:scale-95"
              >
                View My Work
                <ArrowRight size={18} />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-13 px-8 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:-translate-y-0.5 active:scale-95"
              >
                <Download size={18} />
                Download CV
              </a>
            </motion.div>

            {/* tech icons + label */}
            <motion.div
              custom={0.5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-5 pt-2"
            >
              <div className="flex items-center gap-3">
                {TECH_ICONS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    title={label}
                    className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-primary"
                  >
                    <Icon size={18} />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-slate-500">
                2 companies · 2 countries · App Store &amp; Play Store
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT: code card ── */}
          <CodeCard />
        </div>

        {/* ── feature cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20 md:mt-28">
          {FEATURE_CARDS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              custom={0.1 * i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="group flex flex-col gap-3 p-5 md:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Icon size={22} />
              </div>
              <h3 className="font-bold text-base md:text-lg">{title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── mobile bottom tag strip ── */}
        <motion.div
          variants={fadeIn}
          custom={0.6}
          initial="hidden"
          animate="visible"
          className="mt-16 flex justify-center md:hidden"
        >
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">
            React&nbsp;•&nbsp;React Native&nbsp;•&nbsp;Next.js&nbsp;•&nbsp;Node.js
          </p>
        </motion.div>
      </div>
    </section>
  );
}
