# 🎮 Interactive Portfolio – Project Plan

## 👤 Author
Sreehari P V  
Software Engineer – React, React Native, Node.js, Next.js, AI Automations (n8n)

---

# 1️⃣ Project Vision

Create a mobile-friendly interactive portfolio website designed like a 2D top-down RPG world (inspired by classic Pokémon games).

Users can:
- Navigate using touch joystick (mobile)
- Enter buildings representing portfolio sections
- Interact with NPCs
- View professional UI overlays with project details
- Access an AI-powered assistant trained on resume & experience

Goal:
Deliver a unique yet recruiter-friendly experience that balances creativity and professionalism.

---

# 2️⃣ High-Level Architecture

## Tech Stack

Frontend:
- Next.js (App Router)
- React
- Phaser.js (Game Engine)
- TypeScript

Mobile Controls:
- Custom joystick OR nipplejs

Backend:
- Next.js API routes / Node.js
- AI integration endpoint (future phase)

Hosting:
- Vercel

---

# 3️⃣ Core Structure

```
/
├── app/
│   ├── page.tsx (Landing)
│   ├── game/
│   │    └── page.tsx (Game world)
│
├── game/
│   ├── scenes/
│   ├── assets/
│   ├── maps/
│
├── components/
│   ├── ui/
│   ├── overlays/
│
├── lib/
│
├── public/
│
└── PLAN.md
```

---

# 4️⃣ World Design (Game → Portfolio Mapping)

Town Layout:

Town Center → About Me  
Dev House → Skills  
Projects Lab → Projects  
AI Lab → Automations  
Experience Tower → Career Timeline  

Optional:
Secret Portal → Easter Egg

---

# 5️⃣ Asset Plan

## Player Sprite
- 4 directions
- Idle animation
- Walking animation
- 32x32 or 48x48 resolution

## NPCs
- Recruiter NPC
- AI Assistant NPC
- Dev Mentor NPC

## Environment
- Grass, path, stone tiles
- Trees, bushes, rocks
- Buildings (unique per section)
- Interior tilesets

## UI
- Mobile joystick
- Interaction button
- Modal overlays
- Buttons
- Tags/badges

## Audio (Optional)
- Background loop
- Interaction sound
- Footsteps

---

# 6️⃣ UX Design Strategy

Game Layer:
- Navigation only
- Exploration
- Discovery

UI Layer (React Overlays):
- Professional layout
- Scrollable project cards
- Clean typography
- Recruiter-friendly structure

Important:
Do NOT display heavy text inside Phaser.
Use React modals for content.

---

# 7️⃣ Projects Section Wireframe Plan

When user enters "Projects Lab":

Overlay opens:

Header:
- Projects Lab
- Subtitle
- Close button

Scrollable Project Cards:
- Thumbnail
- Title
- Short description
- Tech stack badges
- Buttons (Live / Code)

Project Detail View:
- Hero image
- Problem statement
- Solution
- Architecture notes
- Tech stack
- Results / metrics

Bottom CTA:
- “Ask AI About This Project”

---

# 8️⃣ Mobile Strategy

- Landscape-first layout
- Touch joystick bottom-left
- Interaction button bottom-right
- Thumb-friendly UI spacing
- Optimized for 375px–430px width

Phaser Config:
- Scale.RESIZE
- PixelArt: true
- Arcade physics only

---

# 9️⃣ Development Phases

## Phase 1 – Foundation (Week 1)
- Setup Next.js
- Integrate Phaser
- Add player movement
- Add camera follow
- Add mobile joystick

## Phase 2 – World & Collisions (Week 2)
- Create tilemap
- Add buildings
- Add collision layers
- Basic NPC placement

## Phase 3 – Interaction System (Week 3)
- Enter building triggers
- Overlay system
- Projects UI implementation

## Phase 4 – AI Integration (Week 4–5)
- Resume-based AI chatbot
- Project-aware AI responses
- API integration

## Phase 5 – Polish
- Animations
- Audio
- Save position
- Performance optimization

---

# 🔟 Performance Rules

- Use spritesheets
- Compress images
- Lazy load assets per scene
- Limit map size
- Avoid heavy physics systems
- Test on real devices

---

# 1️⃣1️⃣ Success Criteria

✔ Smooth on mobile  
✔ Loads under 3 seconds  
✔ Clear recruiter navigation  
✔ Professional UI  
✔ Unique but not gimmicky  
✔ Demonstrates technical depth  

---

# 1️⃣2️⃣ Future Enhancements

- Day/Night cycle
- Collectible badges
- GitHub contribution visualizer
- AI quest system
- Analytics tracking

---

# 🚀 Final Goal

Not just a portfolio.

A memorable interactive technical showcase that reflects:

- Frontend mastery
- Architecture thinking
- Game engine integration
- AI implementation
- Product design awareness