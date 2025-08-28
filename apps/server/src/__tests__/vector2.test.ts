import { Vector2 } from '../physics/Vector2';

describe('Vector2', () => {
  test('length and normalization', () => {
    const v = new Vector2(3, 4);
    expect(v.length).toBeCloseTo(5);
    v.normalize();
    expect(v.length).toBeCloseTo(1);
  });

  test('add/sub/scale', () => {
    const a = new Vector2(1, 2);
    const b = new Vector2(3, 4);
    expect(Vector2.add(a, b)).toEqual({ x: 4, y: 6 });
    expect(Vector2.sub(b, a)).toEqual({ x: 2, y: 2 });
    expect(Vector2.scale(a, 2)).toEqual({ x: 2, y: 4 });
  });

  test('limit', () => {
    const v = new Vector2(10, 0);
    v.limit(5);
    expect(v.length).toBeCloseTo(5);
  });
});
