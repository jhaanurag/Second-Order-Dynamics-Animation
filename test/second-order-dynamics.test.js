import test from "node:test";
import assert from "node:assert/strict";
import { SecondOrderDynamics, Vector2, createAnimator } from "../src/index.js";

test("SecondOrderDynamics converges toward scalar input", () => {
  const solver = new SecondOrderDynamics(2.5, 0.7, 1, 0);
  let value = 0;

  for (let i = 0; i < 300; i += 1) {
    value = solver.update(1 / 60, 100);
  }

  assert.ok(value > 99 && value < 101);
});

test("SecondOrderDynamics follows Vector2 input", () => {
  const solver = new SecondOrderDynamics(2.2, 0.65, 1, new Vector2());
  let value = new Vector2();

  for (let i = 0; i < 240; i += 1) {
    value = solver.update(1 / 60, new Vector2(50, -20));
  }

  assert.ok(value.x > 49 && value.x < 51);
  assert.ok(value.y < -19 && value.y > -21);
});

test("createAnimator step updates value immediately", () => {
  const animator = createAnimator({ initialValue: 0, frequency: 2.5, damping: 0.7, response: 1 });
  animator.step(40, null, 1 / 60);
  const value = animator.step(40, null, 1 / 60);

  assert.equal(typeof value, "number");
  assert.ok(value > 0);
});
