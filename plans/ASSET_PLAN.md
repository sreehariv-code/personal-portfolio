# 🎨 ASSET_PLAN.md
Interactive RPG Portfolio – Asset Specification

Author: Sreehari P V

---

# 1️⃣ Art Direction

Style:
- Top-down 2D RPG
- Modern pixel-art aesthetic
- Clean color palette
- Slightly higher fidelity than classic GBA
- Professional tone (not overly playful)

Tile Size:
- 32x32 px (recommended)
OR
- 48x48 px (if aiming for slightly modern clarity)

Rendering:
- pixelArt: true
- Disable anti-aliasing
- Use spritesheets where possible

---

# 2️⃣ Player Character Assets

## Required Animations

Directions:
- Up
- Down
- Left
- Right

States:
- Idle (1 frame per direction)
- Walk (3 frames per direction)

Total Frames:
16 minimum

Sprite Sheet Layout:
4 rows (direction)
4 columns (idle + walk cycle)

Design Notes:
- Casual developer outfit
- Neutral color palette
- Slight resemblance to author
- Clear silhouette for mobile clarity

---

# 3️⃣ NPC Assets

## Recruiter NPC
- 2-frame idle animation
- Formal look
- Neutral tones

## AI Assistant NPC
- Futuristic look
- Subtle glow accent (blue/green)
- 2-frame idle animation

## Dev Mentor NPC
- Casual tech vibe
- Simple idle animation

Keep NPC frame counts minimal for performance.

---

# 4️⃣ Environment Tiles

## Terrain
- Grass
- Path
- Stone
- Water
- Sand (optional)

## Decorative
- Tree (top + trunk separated)
- Bush
- Rock
- Fence
- Lamp post

## Collision Tiles
- Invisible collision block
- Wall collision
- Water collision

All environment packed into:
tileset_terrain.png

---

# 5️⃣ Buildings (Portfolio Mapping)

## About Me House
- Warm tones
- Cozy look
- Interior desk & bookshelf

## Skills Lab
- Tech aesthetic
- Screens
- Server racks

## Projects Lab
- Larger building
- Clean, modern facade

## AI Lab
- Futuristic
- Neon accents

## Experience Tower
- Tall structure
- Slightly premium look

Each building:
- Exterior sprite
- Interior tilemap
- Entrance trigger zone

---

# 6️⃣ UI Assets

Mobile Controls:
- Joystick base
- Joystick thumb
- Interaction button
- Menu button

UI Elements:
- Card background
- Badge background
- Pixel frame (optional)

Prefer React-rendered UI over Phaser-rendered text.

---

# 7️⃣ Audio Assets (Optional)

- Background music loop (< 200kb)
- Interaction sound
- Footstep sound
- Enter building sound

Use compressed MP3 or WAV.

---

# 8️⃣ Asset Optimization Rules

✔ Use spritesheets  
✔ Compress PNGs  
✔ Avoid oversized textures  
✔ Keep total initial load < 3MB  
✔ Lazy load interior maps  

---

# 9️⃣ Folder Structure

```
public/
 ├── assets/
 │    ├── characters/
 │    ├── tilesets/
 │    ├── buildings/
 │    ├── ui/
 │    ├── audio/
 │
 ├── maps/
```