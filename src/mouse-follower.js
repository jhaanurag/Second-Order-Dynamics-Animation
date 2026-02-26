import { createAnimator } from "./animator.js";
import { Vector2 } from "./vector2.js";

function toVector2(value, fallback = new Vector2(0, 0)) {
  if (value instanceof Vector2) {
    return value;
  }

  if (value && Number.isFinite(value.x) && Number.isFinite(value.y)) {
    return new Vector2(value.x, value.y);
  }

  return fallback;
}

export function createMouseFollower({
  element,
  pointerTarget = typeof window !== "undefined" ? window : null,
  eventName = "pointermove",
  initialPosition = null,
  frequency = 3.5,
  damping = 0.8,
  response = 1,
  center = true,
  offset = new Vector2(0, 0),
  onUpdate = null,
} = {}) {
  if (!element || !element.style) {
    throw new TypeError("element with a style property is required.");
  }

  if (!pointerTarget || typeof pointerTarget.addEventListener !== "function") {
    throw new TypeError("pointerTarget must support addEventListener/removeEventListener.");
  }

  const initial =
    initialPosition !== null
      ? toVector2(initialPosition)
      : new Vector2(
          typeof window !== "undefined" ? window.innerWidth / 2 : 0,
          typeof window !== "undefined" ? window.innerHeight / 2 : 0
        );

  const offsetVector = toVector2(offset);
  let target = initial;
  let listening = false;

  function applyPosition(position) {
    const x = center ? position.x - element.offsetWidth / 2 : position.x;
    const y = center ? position.y - element.offsetHeight / 2 : position.y;

    element.style.transform = `translate(${x + offsetVector.x}px, ${y + offsetVector.y}px)`;

    if (typeof onUpdate === "function") {
      onUpdate(position);
    }
  }

  function handlePointerMove(event) {
    target = new Vector2(event.clientX, event.clientY);
  }

  const animator = createAnimator({
    initialValue: initial,
    frequency,
    damping,
    response,
    updateSource: () => target,
    onUpdate: applyPosition,
  });

  applyPosition(initial);

  return {
    start() {
      if (!listening) {
        pointerTarget.addEventListener(eventName, handlePointerMove);
        listening = true;
      }

      animator.start();
    },

    stop() {
      animator.stop();
    },

    dispose() {
      animator.stop();

      if (listening) {
        pointerTarget.removeEventListener(eventName, handlePointerMove);
        listening = false;
      }
    },

    setTarget(nextTarget) {
      target = toVector2(nextTarget, target);
    },

    setParams(params) {
      animator.setParams(params);
    },

    getValue() {
      return animator.getValue();
    },
  };
}
