import { Player } from '../entities/Player';
import { EnergyShard } from '../entities/EnergyShard';
import { Vector2 } from '../physics/Vector2';

describe('Entities', () => {
  test('Player applyInput sets acceleration', () => {
    const p = new Player('p1', 'Alice', 'RUNNER', { x: 0, y: 0 });
    p.applyInput(new Vector2(1, 0));
    expect(p.acceleration.x).toBeGreaterThan(0);
  });

  test('EnergyShard defaults', () => {
    const s = new EnergyShard('s1', { x: 10, y: 10 }, 2);
    expect(s.energyValue).toBe(2);
  });
});
