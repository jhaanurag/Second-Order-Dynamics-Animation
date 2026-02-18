import {
  add,
  cloneValue,
  divide,
  multiply,
  subtract,
  zeroLike,
} from "./operators.js";

const MIN_FREQUENCY = 0.0001;

function assertFiniteNumber(value, name) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`${name} must be a finite number.`);
  }
}

export class SecondOrderDynamics {
  constructor(frequency, damping, response, initialValue = 0) {
    this.updateConstants(frequency, damping, response);
    this.xp = cloneValue(initialValue);
    this.y = cloneValue(initialValue);
    this.yd = zeroLike(initialValue);
  }

  updateConstants(frequency, damping, response) {
    assertFiniteNumber(frequency, "frequency");
    assertFiniteNumber(damping, "damping");
    assertFiniteNumber(response, "response");

    const safeFrequency = Math.max(frequency, MIN_FREQUENCY);

    this.k1 = damping / (Math.PI * safeFrequency);
    this.k2 = 1 / ((2 * Math.PI * safeFrequency) * (2 * Math.PI * safeFrequency));
    this.k3 = (response * damping) / (2 * Math.PI * safeFrequency);
  }

  reset(value = this.y) {
    this.xp = cloneValue(value);
    this.y = cloneValue(value);
    this.yd = zeroLike(value);
  }

  update(deltaTime, input, inputDerivative = null) {
    assertFiniteNumber(deltaTime, "deltaTime");

    const safeDelta = Math.max(deltaTime, Number.EPSILON);
    const derivative =
      inputDerivative === null
        ? divide(subtract(input, this.xp), safeDelta)
        : inputDerivative;

    this.xp = cloneValue(input);

    const k2Stable = Math.max(
      this.k2,
      (safeDelta * safeDelta) / 2 + (safeDelta * this.k1) / 2,
      safeDelta * this.k1
    );

    this.y = add(this.y, multiply(this.yd, safeDelta));

    const acceleration = divide(
      subtract(
        subtract(add(input, multiply(derivative, this.k3)), this.y),
        multiply(this.yd, this.k1)
      ),
      k2Stable
    );

    this.yd = add(this.yd, multiply(acceleration, safeDelta));
    return this.y;
  }
}
