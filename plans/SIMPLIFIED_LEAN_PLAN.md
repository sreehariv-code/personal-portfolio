# 🚀 Simplified Lean Portfolio – Project Plan

## 👤 Author
Sreehari P V  
Software Engineer (Frontend Focus)

---

# 1️⃣ Project Vision
Create a **high-performance, interactive dashboard-style portfolio** that captures a "gaming HUD" or "command center" aesthetic without the overhead of a 2D game engine.

**Key Goals:**
- **Speed:** Instant load times (SEO friendly).
- **UX:** Recruiter-first navigation (find info in < 2 clicks).
- **Vibe:** Interactive, animated, and tech-forward.
- **Maintenance:** Clean React code without complex game-loop logic.

---

# 2️⃣ Tech Stack (Lean & Modern)

- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS (for speed and consistency)
- **Animations:** Framer Motion (The "Game-Feel" engine)
- **Icons:** Lucide React (Minimalist/Tech icons)
- **State Management:** Zustand (Simple, fast global state)
- **Deployment:** Vercel

---

# 3️⃣ Information Architecture

The site will behave like a **Single Page Application (SPA)** with "Dashboards" instead of standard pages.

### **Main Layout Components**
1. **The Sidebar/HUD:** Persistent navigation with "System Status" indicators.
2. **The Viewport:** The main area where content sections slide/fade in.
3. **The AI Terminal:** A collapsible side-drawer for the AI Chatbot.

### **Sections**
- **Home/Overview:** Quick "Player Stats" (Experience level, current role, location).
- **Mission Log (Experience):** Vertical timeline of career history.
- **Projects Database:** A grid of cards with hover-effects and detailed modal views.
- **Tech Arsenal (Skills):** Categorized skill badges (Frontend, Mobile, AI/Automation).
- **Comms Link (Contact):** Simple form + social links.

---

# 4️⃣ "Game-Feel" Interactions (No Engine Required)

We can achieve a "gaming" vibe using pure React/CSS/Framer Motion:
- **Layout Transitions:** Sections don't just "appear"; they slide or "decompress" into view.
- **Haptic/Sound:** Optional subtle click sounds and "glitch" animations on hover.
- **Keyboard Shortcuts:** Pressing `K` opens the Project search, `A` opens AI chat, etc.
- **Dynamic Background:** A subtle CSS-driven grid or particle effect (low CPU usage).

---

# 5️⃣ Development Roadmap (2-Week Sprint)

### **Phase 1: The Core (Days 1–4)**
- Initialize Next.js + Tailwind.
- Build the main Layout (Sidebar + Viewport).
- Create `projects.json` and `experience.json`.
- Map the data to simple, clean React components.

### **Phase 2: Interactions & Polishing (Days 5–8)**
- Implement **Framer Motion** transitions between sections.
- Create the "Project Detail" modal system.
- Add "HUD" elements (Status bars, animated borders).

### **Phase 3: AI & Connectivity (Days 9–12)**
- Setup the AI Chatbot drawer.
- Connect to n8n (or direct API) for resume-based responses.
- Implement a simple "Contact" form.

### **Phase 4: Launch (Days 13-14)**
- Mobile responsiveness check (Thumb-friendly dashboard).
- Performance optimization (Lighthouse score 95+).
- Deploy to Vercel.

---

# 6️⃣ Success Criteria
✔ **Loads in < 1.5s.**  
✔ **Feels alive** (everything reacts to the user).  
✔ **Zero "Game Jitter"** on mobile devices.  
✔ **Recruiter-friendly** (info is clear and legible).
