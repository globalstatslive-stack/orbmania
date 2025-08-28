# Task List

1. ✅ Explore repository structure and docs (DEVELOPMENT_HANDOFF.md, PHASE_3_ROADMAP.md)

2. ⏳ Install dependencies and run baseline build/type-check
Ready to run: npm ci; npm run build; npm run type-check
3. ✅ Review packages/types to align server physics with shared types
Aligned to constants and body ideas; using Vector2 vs zod Vector2 from types for runtime perf.
4. ✅ Implement apps/server/src/physics/Vector2.ts with unit tests

5. 🔄 Implement apps/server/src/physics/Physics.ts (integration, collisions, orbit) with tests
Basic physics done; still need orbit mechanics + tests later.
6. ✅ Implement entity classes: Player.ts and EnergyShard.ts

7. 🔄 Wire GameLoop with Socket.IO (join_game, player_input, tick broadcast)
Players created on join; input applied; tick broadcast of minimal state via 'state' event.
8. 🔄 Set up Jest testing for server package and run tests
jest.config.js added; initial tests added (vector2, physics, entities, gameloop).
9. ⏳ Run lint and type-check, fix issues

10. ⏳ Smoke run server (dev or unified) to ensure startup not broken

11. ⏳ Create feature branch, commit Phase 3 server work, push to GitHub, open PR
Branch from default (main/master). Use description aligned to Phase 3 scope.

