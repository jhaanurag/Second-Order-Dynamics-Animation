export class Vector2 {
  constructor(x?: number, y?: number);
  x: number;
  y: number;
  clone(): Vector2;
  add(other: Vector2): Vector2;
  subtract(other: Vector2): Vector2;
  multiply(scalar: number): Vector2;
  divide(scalar: number): Vector2;
}

type Animatable = number | { add(other: any): any; subtract(other: any): any; multiply(scalar: number): any; divide(scalar: number): any; clone?: () => any };

export class SecondOrderDynamics<T extends Animatable = number> {
  constructor(frequency: number, damping: number, response: number, initialValue?: T);
  updateConstants(frequency: number, damping: number, response: number): void;
  reset(value?: T): void;
  update(deltaTime: number, input: T, inputDerivative?: T | null): T;
}

export interface AnimatorOptions<T = number> {
  initialValue?: T;
  frequency?: number;
  damping?: number;
  response?: number;
  maxDeltaTime?: number;
  now?: () => number;
  requestFrame?: (callback: (timestamp: number) => void) => number;
  cancelFrame?: (frameId: number) => void;
  updateSource?: (() => T) | null;
  onUpdate?: ((value: T) => void) | null;
}

export interface AnimatorState<T = number> {
  running: boolean;
  value: T;
  velocity: T;
  frequency: number;
  damping: number;
  response: number;
}

export interface Animator<T = number> {
  start(): void;
  stop(): void;
  step(input: T, inputDerivative?: T | null, deltaTime?: number | null): T;
  setParams(params: { frequency?: number; damping?: number; response?: number }): void;
  reset(value?: T): void;
  setValue(value: T): void;
  getValue(): T;
  getState(): AnimatorState<T>;
}

export function createAnimator<T = number>(options?: AnimatorOptions<T>): Animator<T>;

export interface MouseFollowerOptions {
  element: { style: { transform: string }; offsetWidth: number; offsetHeight: number };
  pointerTarget?: {
    addEventListener(type: string, callback: (event: { clientX: number; clientY: number }) => void): void;
    removeEventListener(type: string, callback: (event: { clientX: number; clientY: number }) => void): void;
  } | null;
  eventName?: string;
  initialPosition?: Vector2 | { x: number; y: number } | null;
  frequency?: number;
  damping?: number;
  response?: number;
  center?: boolean;
  offset?: Vector2 | { x: number; y: number };
  onUpdate?: ((value: Vector2) => void) | null;
}

export interface MouseFollower {
  start(): void;
  stop(): void;
  dispose(): void;
  setTarget(value: Vector2 | { x: number; y: number }): void;
  setParams(params: { frequency?: number; damping?: number; response?: number }): void;
  getValue(): Vector2;
}

export function createMouseFollower(options: MouseFollowerOptions): MouseFollower;
