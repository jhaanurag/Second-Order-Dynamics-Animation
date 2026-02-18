import { SecondOrderDynamics } from "./second-order-dynamics.js";
import { cloneValue } from "./operators.js";

function defaultNow() {
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    return performance.now();
  }

  return Date.now();
}

function defaultRequestFrame(callback) {
  if (typeof requestAnimationFrame === "function") {
    return requestAnimationFrame(callback);
  }

  return setTimeout(() => callback(defaultNow()), 16);
}

function defaultCancelFrame(frameId) {
  if (typeof cancelAnimationFrame === "function") {
    cancelAnimationFrame(frameId);
    return;
  }

  clearTimeout(frameId);
}

export function createAnimator({
  initialValue = 0,
  frequency = 2.5,
  damping = 0.65,
  response = 1,
  maxDeltaTime = 0.1,
  now = defaultNow,
  requestFrame = defaultRequestFrame,
  cancelFrame = defaultCancelFrame,
  updateSource = null,
  onUpdate = null,
} = {}) {
  const dynamics = new SecondOrderDynamics(frequency, damping, response, initialValue);

  let frameId = null;
  let running = false;
  let lastTime = now();

  function emit(value) {
    if (typeof onUpdate === "function") {
      onUpdate(value);
    }
  }

  function step(input, inputDerivative = null, deltaTime = null) {
    const currentTime = now();
    const computedDelta =
      deltaTime === null ? Math.min((currentTime - lastTime) / 1000, maxDeltaTime) : deltaTime;

    lastTime = currentTime;

    const value = dynamics.update(computedDelta, input, inputDerivative);
    emit(value);
    return value;
  }

  function tick(timestamp) {
    if (!running) {
      return;
    }

    const deltaTime = Math.min((timestamp - lastTime) / 1000, maxDeltaTime);
    lastTime = timestamp;

    if (typeof updateSource !== "function") {
      throw new TypeError("updateSource must be a function when animator is running.");
    }

    const nextInput = updateSource();
    const value = dynamics.update(deltaTime, nextInput);
    emit(value);

    frameId = requestFrame(tick);
  }

  return {
    start() {
      if (running) {
        return;
      }

      running = true;
      lastTime = now();
      frameId = requestFrame(tick);
    },

    stop() {
      if (!running) {
        return;
      }

      running = false;

      if (frameId !== null) {
        cancelFrame(frameId);
      }

      frameId = null;
    },

    step,

    setParams({ frequency: nextFrequency, damping: nextDamping, response: nextResponse } = {}) {
      dynamics.updateConstants(
        nextFrequency ?? frequency,
        nextDamping ?? damping,
        nextResponse ?? response
      );

      frequency = nextFrequency ?? frequency;
      damping = nextDamping ?? damping;
      response = nextResponse ?? response;
    },

    reset(value = initialValue) {
      dynamics.reset(value);
      emit(cloneValue(value));
    },

    setValue(value) {
      dynamics.reset(value);
      emit(cloneValue(value));
    },

    getValue() {
      return cloneValue(dynamics.y);
    },

    getState() {
      return {
        running,
        value: cloneValue(dynamics.y),
        velocity: cloneValue(dynamics.yd),
        frequency,
        damping,
        response,
      };
    },
  };
}
