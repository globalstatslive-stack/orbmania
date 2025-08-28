import { ROLE_CONSTANTS, BALANCE_CONSTANTS } from '@orbmania/types';
import { Vector2 } from '../physics/Vector2';
import type { Body } from '../physics/Physics';

export class Player implements Body {
  id: string;
  username: string;
  role: keyof typeof ROLE_CONSTANTS;
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
  radius: number;
  mass: number;
  energy: number = BALANCE_CONSTANTS.STARTING_ENERGY;

  constructor(id: string, username: string, role: keyof typeof ROLE_CONSTANTS, spawn: { x: number; y: number }) {
    this.id = id;
    this.username = username;
    this.role = role;
    this.position = new Vector2(spawn.x, spawn.y);
    this.velocity = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);
    this.radius = 12;
    this.mass = 1;
  }

  applyInput(dir: Vector2) {
    const speed = ROLE_CONSTANTS[this.role].SPEED_MULTIPLIER;
    const accel = 800 * speed; // match PHYSICS_CONSTANTS.ACCELERATION
    const v = dir.clone().normalize().scale(accel);
    this.acceleration.set(v.x, v.y);
  }
}
