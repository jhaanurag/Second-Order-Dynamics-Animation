# motionspring

A lightweight npm package for second-order spring animation of numbers and vectors.

## Requirements

- Node.js `>=18`
- ESM runtime or bundler support

## Install

```bash
npm install motionspring
```

## Exports

- `SecondOrderDynamics`
- `Vector2`
- `createAnimator`

## Quick Start

```js
import { createAnimator } from "motionspring";

let target = 100;

const animator = createAnimator({
  initialValue: 0,
  frequency: 2.5,
  damping: 0.65,
  response: 1,
  updateSource: () => target,
  onUpdate: (value) => {
    element.textContent = value.toFixed(2);
  },
});

animator.start();
```

## Vector Example

```js
import { Vector2, createAnimator } from "motionspring";

let pointer = new Vector2(0, 0);

const animator = createAnimator({
  initialValue: pointer,
  updateSource: () => pointer,
  onUpdate: (position) => {
    element.style.transform = `translate(${position.x}px, ${position.y}px)`;
  },
});

animator.start();
window.addEventListener("pointermove", (event) => {
  pointer = new Vector2(event.clientX, event.clientY);
});
```

## Demo Gallery

The landing page (`index.html`) runs interactive demos with shared global spring controls.

Landing page demos:

- `demos/toggle-card`
- `demos/number-spring`
- `demos/mouse-follower`

Standalone demo folders:

- `demos/moving-box`
- `demos/toggle-card`
- `demos/number-spring`
- `demos/mouse-follower`

Local demo server:

```bash
npm run demo
```

Then open `http://localhost:4173`.

## Docs

- API reference: `docs/api.md`
- Demo guide: `docs/demos.md`
- Publishing guide: `docs/publishing.md`

## Validation

```bash
npm test
```

Full package validation (tests + pack dry run):

```bash
npm run check
```

## Runtime Notes

- Pass stable `deltaTime` values to `step(...)` in non-RAF environments.
- Tune `frequency`, `damping`, and `response` based on interaction intent.
- Clamp downstream UI values when mapping animated output to CSS properties.
