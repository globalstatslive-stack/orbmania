import { GameLoop } from '../game/GameLoop';
import { PhysicsEngine } from '../physics/Physics';

describe('GameLoop', () => {
  test('ticks physics at roughly tick interval', (done) => {
    const physics = new PhysicsEngine();
    const loop = new GameLoop(physics);
    const start = Date.now();
    const timeout = setTimeout(() => {
      loop.stop();
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(25);
      done();
    }, 40);
    loop.start();
  });
});
