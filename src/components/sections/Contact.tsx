"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Linkedin, Github, Twitter } from "lucide-react";
import { toast } from "sonner";
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

/* ─── core expertise tags ────────────────────────────────────── */
const EXPERTISE = ["React / Next.js", "React Native", "Node.js", "TypeScript"];

/* ─── social links ───────────────────────────────────────────── */
const SOCIALS = [
  {
    label:  "LinkedIn",
    href:   resume.basics.linkedin,
    icon:   Linkedin,
    hover:  "hover:bg-primary hover:border-primary hover:text-white",
  },
  {
    label:  "GitHub",
    href:   resume.basics.github,
    icon:   Github,
    hover:  "hover:bg-slate-900 hover:border-slate-900 hover:text-white dark:hover:bg-white dark:hover:border-white dark:hover:text-slate-900",
  },
  {
    label:  "Twitter",
    href:   "#",
    icon:   Twitter,
    hover:  "hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white",
  },
];

/* ─── contact section ────────────────────────────────────────── */
export default function Contact() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSending(true);

    /* Simulate a short send delay then show success */
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent!", {
        description: "Thanks! I'll get back to you within 24 hours.",
      });
      setName("");
      setEmail("");
      setMessage("");
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden border-t border-slate-200 dark:border-slate-800"
    >
      {/* glow blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* ── LEFT: form ── */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 leading-snug">
                Got a project in mind?{" "}
                <br />
                <span className="text-primary">Let&apos;s talk.</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md">
                I&apos;m currently open to full-time roles and freelance work.
                If you have something interesting, reach out — I usually reply
                within a day.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
              {/* name + email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* message */}
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="What are you working on?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none placeholder:text-slate-400"
                />
              </div>

              {/* submit */}
              <button
                type="submit"
                disabled={sending}
                className="self-start flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all group"
              >
                {sending ? "Sending..." : "Send it"}
                <Send
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </button>
            </form>
          </motion.div>

          {/* ── RIGHT: info + socials ── */}
          <motion.div
            variants={fadeUp}
            custom={0.15}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-between gap-10 py-2"
          >
            <div className="space-y-10">
              {/* personal blurb */}
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Best way to reach me is email. I&apos;m also on LinkedIn if you
                want to connect first.
              </p>

              {/* contact info */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Contact Information</h3>
                <a
                  href={`mailto:${resume.basics.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-primary transition-colors">
                    {resume.basics.email}
                  </span>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-violet-500/10 dark:bg-violet-500/20 flex items-center justify-center text-violet-500">
                    <MapPin size={20} />
                  </div>
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {resume.basics.location}
                  </span>
                </div>
              </div>

              {/* socials */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Follow Me</h3>
                <div className="flex gap-3">
                  {SOCIALS.map(({ label, href, icon: Icon, hover }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`w-14 h-14 rounded-xl border border-slate-300 dark:border-slate-700 flex items-center justify-center transition-all duration-300 ${hover}`}
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* core expertise card */}
            <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                Core Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {EXPERTISE.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
