"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Database,
  ShieldCheck,
  Smartphone,
  StickyNote,
  Code,
  ExternalLink,
  Github,
  Layers,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { resume } from "@/lib/resume";
import type { Project, ProjectCategory } from "@/types/resume";

/* ─── animation variants ─────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay },
  }),
};

/* ─── filter tabs config ─────────────────────────────────────── */
type Filter = "all" | ProjectCategory;

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All Projects", value: "all" },
  { label: "Web Apps",     value: "web" },
  { label: "Mobile",       value: "mobile" },
];

/* ─── visual icon map for project cards ─────────────────────── */
const CATEGORY_ICON: Record<string, React.ElementType> = {
  web:      Globe,
  mobile:   Smartphone,
  ai:       Layers,
  fullstack: Code,
};

const CATEGORY_LABEL: Record<string, string> = {
  web:      "Web",
  mobile:   "Mobile",
  ai:       "AI",
  fullstack: "Fullstack",
};

/* ─── featured project visual ────────────────────────────────── */
function FeaturedVisual({ project }: { project: Project }) {
  const nodes = project.category === "mobile"
    ? [Smartphone, Database, ShieldCheck]
    : [Globe, Database, ShieldCheck];

  return (
    <div className="w-full h-full bg-slate-900 flex items-center justify-center relative overflow-hidden p-8">
      {/* subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
      {/* window dots */}
      <div className="absolute top-4 left-4 flex gap-1.5">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      {/* node flow */}
      <div className="relative z-10 flex items-center gap-4">
        {nodes.map((Icon, i) => (
          <div key={i} className="flex items-center gap-4">
            <div
              className={`p-4 rounded-xl border ${
                i === 1
                  ? "bg-primary/20 border-primary/40"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <Icon size={28} className="text-primary" />
            </div>
            {i < nodes.length - 1 && (
              <div className="h-px w-8 bg-slate-600" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── featured project card ──────────────────────────────────── */
function FeaturedCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={0.1}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="mb-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 overflow-hidden shadow-xl flex flex-col lg:flex-row"
    >
      {/* visual */}
      <div className="lg:w-3/5 h-56 lg:h-auto relative">
        <FeaturedVisual project={project} />
      </div>

      {/* info */}
      <div className="lg:w-2/5 p-8 flex flex-col justify-center gap-5">
        <div className="flex items-center gap-2">
          <span className="bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
            Featured
          </span>
          {project.category && (
            <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
              {CATEGORY_LABEL[project.category]}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded-full text-xs font-medium"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg text-sm transition-all"
          >
            <ExternalLink size={15} />
            View Project
          </a>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold py-3 rounded-lg text-sm transition-all"
          >
            <Github size={15} />
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── project grid card ──────────────────────────────────────── */
function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const Icon = CATEGORY_ICON[project.category ?? "web"] ?? Globe;

  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      viewport={{ once: true, margin: "-40px" }}
      className="group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-colors flex flex-col"
    >
      {/* thumbnail */}
      <div className="h-44 bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center">
        <Icon size={48} className="text-slate-300 dark:text-slate-600" />

        {/* hover overlay — desktop only */}
        <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-slate-900/80 to-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-3">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:scale-110 transition-transform"
          >
            <ExternalLink size={16} />
          </a>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-900 hover:scale-110 transition-transform"
          >
            <Github size={16} />
          </a>
        </div>

        {/* category badge */}
        {project.category && (
          <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
            {CATEGORY_LABEL[project.category]}
          </span>
        )}
      </div>

      {/* body */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <h4 className="font-bold text-lg leading-snug">{project.name}</h4>
        <p className="text-slate-500 dark:text-slate-400 text-sm flex-1 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[11px] font-bold"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full text-[11px] font-bold">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* action buttons — mobile only (desktop uses hover overlay) */}
        <div className="flex md:hidden gap-2 pt-1">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-white text-xs font-bold transition-opacity hover:opacity-90"
          >
            <ExternalLink size={13} />
            View
          </a>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Github size={13} />
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── main section ───────────────────────────────────────────── */
export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");

  const allProjects = resume.projects;
  const featured = allProjects[0];
  const gridProjects = allProjects.slice(1);

  const filtered =
    filter === "all"
      ? gridProjects
      : gridProjects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── heading ── */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="text-primary font-bold tracking-widest text-xs uppercase">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-2 mb-3">
            Things I&apos;ve built.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
            A mix of web, mobile, and full-stack projects — some personal, some
            production.
          </p>
        </motion.div>

        {/* ── filter tabs ── */}
        <motion.div
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <TabsList className="h-auto bg-transparent p-0 border-b border-slate-200 dark:border-slate-800 rounded-none w-full justify-start gap-6">
              {FILTERS.map(({ label, value }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="pb-3 px-0 rounded-none bg-transparent text-slate-500 dark:text-slate-400 font-bold text-sm border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* ── featured card ── */}
        <FeaturedCard project={featured} />

        {/* ── project grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.name} project={project} delay={i * 0.08} />
          ))}
        </div>

        {/* ── CTA banner ── */}
        <motion.div
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-20 p-10 bg-primary rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-white overflow-hidden relative"
        >
          <div className="absolute -right-16 -bottom-16 opacity-10">
            <StickyNote size={240} />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-1">
              Interested in working together?
            </h3>
            <p className="text-white/75">
              I&apos;m currently available for freelance projects and full-time roles.
            </p>
          </div>
          <a
            href="#contact"
            className="relative z-10 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg whitespace-nowrap"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
