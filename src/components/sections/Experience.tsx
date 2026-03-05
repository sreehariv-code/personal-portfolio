"use client";

import { motion } from "framer-motion";
import {
  Clock,
  BarChart2,
  Briefcase,
  Smartphone,
  Layers,
  Braces,
  Paintbrush,
  Server,
  Zap,
  Bot,
  Database,
  Settings,
  GraduationCap,
  Trophy,
} from "lucide-react";
import { resume } from "@/lib/resume";

/* ─── animation variants ─────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay },
  }),
};

const popIn = {
  hidden: { opacity: 0, scale: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 18, delay },
  }),
};

/* ─── date helpers ───────────────────────────────────────────── */
const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

function formatDate(dateStr: string): string {
  if (dateStr === "Present") return "Present";
  const [year, month] = dateStr.split("-");
  return `${MONTHS[parseInt(month, 10) - 1]} ${year}`;
}

function getDuration(start: string, end: string): string {
  if (end === "Present") return "Present";
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = end.split("-").map(Number);
  const months = (ey - sy) * 12 + (em - sm);
  const years = Math.floor(months / 12);
  const rem   = months % 12;
  if (years === 0) return `${rem}mo`;
  if (rem   === 0) return `${years} yr${years > 1 ? "s" : ""}`;
  return `${years} yr${years > 1 ? "s" : ""} ${rem}mo`;
}

/* ─── icon per company ───────────────────────────────────────── */
const COMPANY_ICON: Record<string, React.ElementType> = {
  "Appmaker.xyz":                    Smartphone,
  "UVJ Technologies (Calpine Group)": Briefcase,
};

/* ─── tech stack definition ──────────────────────────────────── */
const FRONTEND_TILES = [
  { icon: Layers,       label: "React / Next.js" },
  { icon: Braces,       label: "TypeScript"       },
  { icon: Paintbrush,   label: "Tailwind CSS"     },
  { icon: Smartphone,   label: "React Native"     },
];

const BACKEND_TILES = [
  { icon: Server,       label: "Node.js / NestJS" },
  { icon: Zap,          label: "Express / Flask"  },
  { icon: Bot,          label: "LLMs / AI"        },
  { icon: Database,     label: "Redis / Supabase" },
];

const TOOL_CHIPS = [
  "Docker", "Git", "GitHub Actions",
  "Vercel", "Postman", "CI/CD",
];

/* ─── sub-components ─────────────────────────────────────────── */

/** Vertical timeline of experience entries */
function Timeline() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
        <Clock size={22} className="text-primary" />
        Professional Journey
      </h2>

      {/* timeline track */}
      <div className="relative space-y-10 before:absolute before:inset-0 before:left-[18px] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
        {resume.experience.map((exp, i) => {
          const Icon = COMPANY_ICON[exp.company] ?? Briefcase;
          const isCurrent = exp.endDate === "Present";
          const duration  = getDuration(exp.startDate, exp.endDate);

          return (
            <motion.div
              key={exp.company}
              custom={i * 0.12}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="relative flex items-start gap-6"
            >
              {/* node */}
              <motion.div
                custom={i * 0.12 + 0.05}
                variants={popIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className={`relative z-10 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                  isCurrent
                    ? "bg-primary text-white shadow-[0_0_16px_rgba(19,91,236,0.45)]"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-500 border-4 border-background-light dark:border-background-dark"
                }`}
              >
                <Icon size={15} />
              </motion.div>

              {/* card */}
              <div className="flex-1 bg-white dark:bg-slate-900/50 p-5 md:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold">{exp.role}</h3>
                    {exp.highlights[0].startsWith("Won 1st place") && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-500 border border-amber-400/20">
                        <Trophy size={10} />
                        Hackathon Winner
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      isCurrent
                        ? "bg-primary/10 text-primary uppercase tracking-widest"
                        : "text-slate-400"
                    }`}
                  >
                    {duration}
                  </span>
                </div>

                <p className="text-primary font-medium text-sm mb-4">
                  {exp.company}&nbsp;·&nbsp;
                  {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                </p>

                <ul className="space-y-1.5 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {exp.highlights.slice(0, 3).map((h, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* tech chips */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {exp.techStack.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* education node */}
        <motion.div
          custom={resume.experience.length * 0.12}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="relative flex items-start gap-6"
        >
          <motion.div
            custom={resume.experience.length * 0.12 + 0.05}
            variants={popIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="relative z-10 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-500 border-4 border-background-light dark:border-background-dark"
          >
            <GraduationCap size={15} />
          </motion.div>
          <div className="flex-1 bg-white dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
              <h3 className="text-base font-bold">
                {resume.education[0].degree} — {resume.education[0].field}
              </h3>
              <span className="text-xs text-slate-400 font-bold">
                {resume.education[0].startYear} – {resume.education[0].endYear}
              </span>
            </div>
            <p className="text-primary font-medium text-sm">
              {resume.education[0].institution}&nbsp;·&nbsp;
              {resume.education[0].location}
            </p>
            {resume.education[0].cgpa && (
              <p className="text-slate-500 text-sm mt-1">
                CGPA: {resume.education[0].cgpa}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/** Icon + label tile */
function SkillTile({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
      className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60 hover:border-primary/30 transition-colors cursor-default"
    >
      <Icon size={18} className="text-primary flex-shrink-0" />
      <span className="text-sm font-medium">{label}</span>
    </motion.div>
  );
}

/** Grouped tech stack panel */
function TechStack() {
  return (
    <motion.div
      variants={fadeUp}
      custom={0.1}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
        <BarChart2 size={22} className="text-primary" />
        Tech Stack
      </h2>

      <div className="space-y-6">
        {/* Frontend */}
        <div className="bg-white dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Layers size={14} /> Frontend
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {FRONTEND_TILES.map((t) => (
              <SkillTile key={t.label} {...t} />
            ))}
          </div>
        </div>

        {/* Backend & AI */}
        <div className="bg-white dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Database size={14} /> Backend &amp; AI
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {BACKEND_TILES.map((t) => (
              <SkillTile key={t.label} {...t} />
            ))}
          </div>
        </div>

        {/* Workflow & Tools */}
        <div className="bg-white dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Settings size={14} /> Workflow &amp; Tools
          </h3>
          <div className="flex flex-wrap gap-2">
            {TOOL_CHIPS.map((chip) => (
              <span
                key={chip}
                className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold border border-primary/20"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── main section ───────────────────────────────────────────── */
export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 md:py-28 border-t border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── section header ── */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-primary font-bold tracking-widest text-xs uppercase">
            Career
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mt-2 mb-4">
            Where I&apos;ve worked
            <br />
            and what I&apos;ve shipped.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
            2+ years across startups and product companies, writing code that
            runs in production.
          </p>
        </motion.div>

        {/* ── 12-col grid ── */}
        <div
          id="skills"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        >
          <div className="lg:col-span-7">
            <Timeline />
          </div>
          <div className="lg:col-span-5">
            <TechStack />
          </div>
        </div>
      </div>
    </section>
  );
}
