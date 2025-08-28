# Orbmania.io - Original Multiplayer Orbital Energy Game

🚀 **Legally distinct multiplayer .io game with orbital energy mechanics**

## 🎮 Game Concept

Orbmania.io is an original multiplayer browser game featuring:

- **Energy Shards**: Collect shards that orbit your core temporarily
- **Orbital Combat**: Orbiting shards inflict collision damage based on mass + velocity
- **Pulse Dash**: Traverse rival orbits while reducing damage received
- **Role-Based Gameplay**: Choose from Runner, Bulwark, or Tactician classes
- **Power-ups**: Overdrive, Magnet Surge, Phase Shift, and Orbit Split abilities

### 🚫 Legal Compliance

This project is **completely original** and contains:
- ❌ No references to agar.io, cells, blobs, or absorption mechanics
- ✅ Original orbital energy collection system
- ✅ Unique collision-based combat mechanics
- ✅ Custom art, sounds, and branding
- ✅ Distinct neon-dark visual theme

## 🏗️ Architecture

### Monorepo Structure
```
orbmania-io/
├── apps/
│   ├── web/          # Next.js 14 client
│   └── server/       # Node.js + Socket.IO server
├── packages/
│   ├── types/        # Shared TypeScript types with Zod validation
│   └── ui/           # Shared React components
└── docker-compose.dev.yml
```

### Tech Stack
- **Frontend**: Next.js 14, React 18, Canvas/WebGL rendering
- **Backend**: Node.js, Socket.IO, Express
- **Types**: TypeScript 5.3 (strict mode), Zod validation
- **Build**: Turborepo monorepo management
- **Deployment**: Docker, Nginx, Redis pub/sub

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
# Clone and install dependencies
git clone <repository-url>
cd orbmania-io
npm install

# Build all packages
npm run build
```

### Development
```bash
# Start server (port 12001)
npm run dev --workspace=@orbmania/server

# Start web client (port 12000)
npm run dev --workspace=@orbmania/web

# Or use Docker Compose
docker-compose -f docker-compose.dev.yml up
```

### Access Points
- **Web Client**: http://localhost:12000
- **Server Health**: http://localhost:12001/health
- **Production URLs**: 
  - https://work-1-fgjnqynzukhomums.prod-runtime.all-hands.dev (web)
  - https://work-2-fgjnqynzukhomums.prod-runtime.all-hands.dev (server)

## 🎨 Visual Design

### Color Palette
- **Background**: `#0B1021` (Deep space blue)
- **Primary**: `#6EE7F2` (Neon cyan)
- **Secondary**: `#F59E0B` (Electric amber)
- **Success**: `#22C55E` (Matrix green)
- **Danger**: `#EF4444` (Alert red)

### Art Style
- Polygonal geometric shapes (hexagonal cores, triangular shards)
- Segmented orbital lines with luminous nodes
- Neon glow effects and particle systems
- Minimal HUD with energy/health bars

## 🎵 Audio Design
- **Music**: Synth/ambient-tech (110-125 BPM)
- **SFX**: Digital glitch effects, percussive impacts
- **Spatial Audio**: 3D positioned sound effects

## 🎯 Game Mechanics

### Player Roles
1. **Runner**: Fast movement, critical dash damage
2. **Bulwark**: Frontal shield, extra orbit slots (+2)
3. **Tactician**: EMP ability, gravitational traps

### Power-ups
1. **Overdrive**: Speed + energy generation boost (8s)
2. **Magnet Surge**: Auto-attract nearby shards (6s)
3. **Phase Shift**: Invulnerability + orbit pass-through (3s)
4. **Orbit Split**: Duplicate current orbiting shards (instant)

### Maps
- **Prism Yard**: Hexagonal arena with 60° reflective crystal walls

## 📋 Development Phases

- [x] **Phase 0**: Legal guardrails confirmed
- [x] **Phase 1**: Monorepo scaffold with Turborepo ✅
- [ ] **Phase 2**: Complete shared types and network protocols
- [ ] **Phase 3**: Server physics engine and tick loop
- [ ] **Phase 4**: Client rendering and input handling
- [ ] **Phase 5**: Role-based abilities implementation
- [ ] **Phase 6**: Power-up system
- [ ] **Phase 7**: Prism Yard map with reflective walls
- [ ] **Phase 8**: UI/UX and branding polish
- [ ] **Phase 9**: Matchmaking and region selection
- [ ] **Phase 10**: QA testing and deployment scripts
- [ ] **Phase 11**: Legal compliance audit

## 🧪 Testing

```bash
# Run all tests
npm run test

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Docker build
docker-compose -f docker-compose.prod.yml up --build
```

## 🤝 Contributing

1. Follow TypeScript strict mode (no `any` types)
2. Use Zod schemas for runtime validation
3. Maintain legal compliance (no agar.io references)
4. Write tests for new features
5. Follow the established neon-dark design system

## 📄 License

MIT License - See LICENSE file for details

---

**🌟 Orbmania.io - Where orbital energy meets competitive multiplayer action!**