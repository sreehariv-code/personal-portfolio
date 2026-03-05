# 🏗 ARCHITECTURE.md
Interactive RPG Portfolio – Technical Architecture

Author: Sreehari P V

---

# 1️⃣ System Overview

The application is divided into two layers:

1. Game Layer (Phaser)
2. UI Layer (React)

Game handles:
- Movement
- Collision
- Map rendering
- Triggers

React handles:
- Modals
- Project data
- Resume content
- AI chatbot
- Professional UI

---

# 2️⃣ Application Structure

Next.js App Router

```
/app
 ├── page.tsx (Landing)
 ├── game/page.tsx (Game container)

/game
 ├── scenes/
 ├── systems/
 ├── config/

/components
 ├── overlays/
 ├── ui/

```
---

# 3️⃣ Phaser Integration Strategy

Phaser runs inside a client component.

Game config:
- Arcade physics
- Scale.RESIZE
- Camera follow player
- Scene-based architecture

Scenes:
- MainTownScene
- InteriorScene
- UIScene (optional lightweight overlay triggers)

---

# 4️⃣ State Management

Game State:
Managed inside Phaser scene.

UI State:
Managed using React context or Zustand.

Overlay Trigger Flow:

Player overlaps trigger →
Emit event →
React listens →
Open modal →
Pause scene →
Close modal →
Resume scene

---

# 5️⃣ Data Layer

Projects stored as:
projects.json

Structure:
- title
- description
- techStack
- liveUrl
- repoUrl
- metrics
- architectureNotes

Future:
- Move to CMS or database if needed.

---

# 6️⃣ AI Integration (Future Phase)

Endpoint:
POST /api/ai-chat

Flow:
- User asks question
- Send context (resume + project data)
- Return structured response
- Render in overlay chat UI

Optional:
Vector search for resume embeddings.

---

# 7️⃣ Performance Strategy

✔ Lazy load scenes  
✔ Destroy scene assets when exiting  
✔ Use spritesheets  
✔ Avoid large tilemaps  
✔ Cap physics checks  

Target:
60 FPS on mid-range mobile device

---

# 8️⃣ Deployment

Hosting:
Vercel

Assets:
Served from public folder

Monitoring:
Optional analytics for user interactions

---

# 9️⃣ Scalability

Future upgrades:
- Multiple towns
- Quest system
- Gamification badges
- AI dynamic NPC responses