# API

## Quick Start

Number spring:

```js
import { createAnimator } from "motionspring";

let target = 100;

const animator = createAnimator({
  initialValue: 0,
  updateSource: () => target,
  onUpdate: (value) => {
    element.textContent = value.toFixed(2);
  },
});

animator.start();
```

Mouse follower:

```js
import { createMouseFollower } from "motionspring";

const follower = createMouseFollower({
  element: document.querySelector(".circle"),
});

follower.start();
```

## `Vector2`

```js
new Vector2(x = 0, y = 0)
```

Methods:

- `clone()`
- `add(other)`
- `subtract(other)`
- `multiply(scalar)`
- `divide(scalar)`

## `SecondOrderDynamics`

```js
new SecondOrderDynamics(frequency, damping, response, initialValue = 0)
```

Methods:

- `updateConstants(frequency, damping, response)`
- `reset(value = currentValue)`
- `update(deltaTime, input, inputDerivative = null)`

Notes:

- `input` can be a number or an object supporting `add`, `subtract`, `multiply`, and `divide`.
- If `inputDerivative` is omitted, derivative is estimated from input deltas.
- `deltaTime` should be passed in seconds.

## `createAnimator(options)`

Creates a requestAnimationFrame-based animator around `SecondOrderDynamics`.

Options:

- `initialValue` (`number | vector-like`, default: `0`)
- `frequency` (`number`, default: `2.5`)
- `damping` (`number`, default: `0.65`)
- `response` (`number`, default: `1`)
- `maxDeltaTime` (`number`, default: `0.1`)
- `updateSource` (`() => value`) for continuous animation
- `onUpdate` (`(value) => void`)
- `now`, `requestFrame`, `cancelFrame` for runtime overrides

Returned animator methods:

- `start()`
- `stop()`
- `step(input, inputDerivative = null, deltaTime = null)`
- `setParams({ frequency?, damping?, response? })`
- `reset(value?)`
- `setValue(value)`
- `getValue()`
- `getState()`

## `createMouseFollower(options)`

Creates a pointer-driven spring follower for a DOM element.

Options:

- `element` (required DOM element with `style`)
- `pointerTarget` (event target, default: `window`)
- `eventName` (default: `"pointermove"`)
- `initialPosition` (`Vector2 | {x,y}`, default: viewport center)
- `frequency` (`number`, default: `3.5`)
- `damping` (`number`, default: `0.8`)
- `response` (`number`, default: `1`)
- `center` (`boolean`, default: `true`)
- `offset` (`Vector2 | {x,y}`, default: `{0,0}`)
- `onUpdate` (`(position) => void`)

Returned methods:

- `start()`
- `stop()`
- `dispose()`
- `setTarget(position)`
- `setParams({ frequency?, damping?, response? })`
- `getValue()`
