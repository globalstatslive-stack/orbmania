import { PHYSICS_CONSTANTS } from '@orbmania/types';
import { Vector2 } from './Vector2';

export interface Body {
  id: string;
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
  radius: number;
  mass: number;
}

export interface CollisionResult {
  a: string; b: string;
  normal: Vector2;
  penetration: number;
}

export class PhysicsEngine {
  bodies: Map<string, Body> = new Map();

  add(body: Body) { this.bodies.set(body.id, body); }
  remove(id: string) { this.bodies.delete(id); }
  get(id: string) { return this.bodies.get(id); }

  step(dtMs: number) {
    const dt = Math.min(dtMs, PHYSICS_CONSTANTS.MAX_DELTA_TIME) / 1000; // seconds

    for (const b of this.bodies.values()) {
      b.velocity.add(Vector2.scale(b.acceleration, dt));
      b.velocity.scale(PHYSICS_CONSTANTS.FRICTION);
      b.velocity.limit(PHYSICS_CONSTANTS.MAX_VELOCITY);
      b.position.add(Vector2.scale(b.velocity, dt));

      // Arena bounds with simple reflection
      if (b.position.x - b.radius < 0) { b.position.x = b.radius; b.velocity.x = Math.abs(b.velocity.x); }
      if (b.position.x + b.radius > PHYSICS_CONSTANTS.ARENA_WIDTH) { b.position.x = PHYSICS_CONSTANTS.ARENA_WIDTH - b.radius; b.velocity.x = -Math.abs(b.velocity.x); }
      if (b.position.y - b.radius < 0) { b.position.y = b.radius; b.velocity.y = Math.abs(b.velocity.y); }
      if (b.position.y + b.radius > PHYSICS_CONSTANTS.ARENA_HEIGHT) { b.position.y = PHYSICS_CONSTANTS.ARENA_HEIGHT - b.radius; b.velocity.y = -Math.abs(b.velocity.y); }
    }
  }

  detectCircleCollisions(): CollisionResult[] {
    const ids = Array.from(this.bodies.keys());
    const res: CollisionResult[] = [];
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = this.bodies.get(ids[i])!;
        const b = this.bodies.get(ids[j])!;
        const delta = Vector2.sub(b.position, a.position);
        const dist = delta.length;
        const r = a.radius + b.radius;
        if (dist < r) {
          const normal = dist > 0 ? Vector2.scale(delta, 1 / dist) : new Vector2(1, 0);
          res.push({ a: a.id, b: b.id, normal, penetration: r - dist });
        }
      }
    }
    return res;
  }
}
