import { PHYSICS_CONSTANTS } from '@orbmania/types';
import { PhysicsEngine } from '../physics/Physics';

export class GameLoop {
  private physics: PhysicsEngine;
  private running = false;
  private lastTick = 0;
  private onStep?: (dtMs: number, now: number) => void;

  constructor(physics: PhysicsEngine) {
    this.physics = physics;
  }

  setOnStep(cb: (dtMs: number, now: number) => void) {
    this.onStep = cb;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTick = Date.now();
    this.tick();
  }

  stop() { this.running = false; }

  private tick() {
    if (!this.running) return;
    const now = Date.now();
    const dt = now - this.lastTick;
    if (dt >= PHYSICS_CONSTANTS.TICK_INTERVAL) {
      this.physics.step(dt);
      this.lastTick = now;
      if (this.onStep) this.onStep(dt, now);
    }
    setImmediate(() => this.tick());
  }
}
