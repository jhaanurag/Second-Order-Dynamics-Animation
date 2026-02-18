# API

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
