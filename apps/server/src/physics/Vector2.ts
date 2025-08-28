export class Vector2 {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static from(obj: { x: number; y: number }): Vector2 {
    return new Vector2(obj.x, obj.y);
  }

  clone(): Vector2 { return new Vector2(this.x, this.y); }

  set(x: number, y: number): this { this.x = x; this.y = y; return this; }

  add(v: Vector2): this { this.x += v.x; this.y += v.y; return this; }
  sub(v: Vector2): this { this.x -= v.x; this.y -= v.y; return this; }
  scale(s: number): this { this.x *= s; this.y *= s; return this; }

  dot(v: Vector2): number { return this.x * v.x + this.y * v.y; }
  cross(v: Vector2): number { return this.x * v.y - this.y * v.x; }

  get length(): number { return Math.hypot(this.x, this.y); }
  get lengthSq(): number { return this.x * this.x + this.y * this.y; }

  normalize(): this {
    const len = this.length;
    if (len > 0) { this.x /= len; this.y /= len; }
    return this;
  }

  limit(max: number): this {
    const lenSq = this.lengthSq;
    const maxSq = max * max;
    if (lenSq > maxSq) {
      const len = Math.sqrt(lenSq);
      const s = max / (len || 1);
      this.x *= s; this.y *= s;
    }
    return this;
  }

  distanceTo(v: Vector2): number { return Math.hypot(this.x - v.x, this.y - v.y); }
  distanceToSq(v: Vector2): number { const dx = this.x - v.x, dy = this.y - v.y; return dx*dx + dy*dy; }

  static add(a: Vector2, b: Vector2): Vector2 { return new Vector2(a.x + b.x, a.y + b.y); }
  static sub(a: Vector2, b: Vector2): Vector2 { return new Vector2(a.x - b.x, a.y - b.y); }
  static scale(v: Vector2, s: number): Vector2 { return new Vector2(v.x * s, v.y * s); }
  static lerp(a: Vector2, b: Vector2, t: number): Vector2 {
    return new Vector2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
  }
}
