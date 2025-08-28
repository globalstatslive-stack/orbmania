import { PhysicsEngine } from '../physics/Physics';
import { Vector2 } from '../physics/Vector2';

const makeBody = (id: string, x: number, y: number) => ({
  id,
  position: new Vector2(x, y),
  velocity: new Vector2(0, 0),
  acceleration: new Vector2(0, 0),
  radius: 10,
  mass: 1,
});

describe('PhysicsEngine', () => {
  test('integrates position with acceleration', () => {
    const p = new PhysicsEngine();
    const b = makeBody('a', 0, 0);
    b.acceleration = new Vector2(10, 0);
    p.add(b);
    p.step(1000); // 1s
    expect(b.position.x).toBeGreaterThan(0);
  });

  test('detects circle collisions', () => {
    const p = new PhysicsEngine();
    const a = makeBody('a', 0, 0);
    const b = makeBody('b', 15, 0);
    p.add(a);
    p.add(b);
    const collisions = p.detectCircleCollisions();
    expect(collisions.length).toBe(1);
    expect(collisions[0].a).toBe('a');
    expect(collisions[0].b).toBe('b');
  });
});
