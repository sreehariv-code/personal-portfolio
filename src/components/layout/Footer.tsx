import { Terminal, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white">
            <Terminal size={16} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-base">
            sreehari<span className="text-primary">.dev</span>
          </span>
        </div>

        {/* credit */}
        <p className="text-slate-500 dark:text-slate-400 text-sm order-3 md:order-2">
          Built with{" "}
          <span className="text-primary font-medium">Next.js</span>
          {" "}and{" "}
          <span className="text-red-500">♥</span>
          {" "}© {new Date().getFullYear()}
        </p>

        {/* back to top */}
        <a
          href="#"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors order-2 md:order-3"
        >
          Back to top
          <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
