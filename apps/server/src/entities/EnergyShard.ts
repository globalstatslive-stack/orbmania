import { PHYSICS_CONSTANTS } from '@orbmania/types';
import { Vector2 } from '../physics/Vector2';
import type { Body } from '../physics/Physics';

export class EnergyShard implements Body {
  id: string;
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
  radius: number;
  mass: number;
  energyValue: number;
  spawnTime: number;
  lifetime: number = PHYSICS_CONSTANTS.SHARD_LIFETIME;

  constructor(id: string, position: { x: number; y: number }, energyValue = 1) {
    this.id = id;
    this.position = new Vector2(position.x, position.y);
    this.velocity = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);
    this.radius = PHYSICS_CONSTANTS.SHARD_RADIUS;
    this.mass = PHYSICS_CONSTANTS.SHARD_MASS;
    this.energyValue = energyValue;
    this.spawnTime = Date.now();
  }
}
