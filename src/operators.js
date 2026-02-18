function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function ensureSameType(a, b) {
  if (isNumber(a) !== isNumber(b)) {
    throw new TypeError("Values must share the same type.");
  }
}

export function cloneValue(value) {
  if (isNumber(value)) {
    return value;
  }

  if (value && typeof value.clone === "function") {
    return value.clone();
  }

  return value;
}

export function zeroLike(value) {
  if (isNumber(value)) {
    return 0;
  }

  if (value && typeof value.multiply === "function") {
    return value.multiply(0);
  }

  throw new TypeError(
    "Unsupported value type. Provide numbers or objects with multiply(number)."
  );
}

export function add(a, b) {
  ensureSameType(a, b);

  if (isNumber(a)) {
    return a + b;
  }

  if (a && typeof a.add === "function") {
    return a.add(b);
  }

  throw new TypeError("Unsupported value type. Provide add(other).");
}

export function subtract(a, b) {
  ensureSameType(a, b);

  if (isNumber(a)) {
    return a - b;
  }

  if (a && typeof a.subtract === "function") {
    return a.subtract(b);
  }

  throw new TypeError("Unsupported value type. Provide subtract(other).");
}

export function multiply(value, scalar) {
  if (!Number.isFinite(scalar)) {
    throw new TypeError("Scalar must be a finite number.");
  }

  if (isNumber(value)) {
    return value * scalar;
  }

  if (value && typeof value.multiply === "function") {
    return value.multiply(scalar);
  }

  throw new TypeError("Unsupported value type. Provide multiply(number).");
}

export function divide(value, scalar) {
  if (!Number.isFinite(scalar)) {
    throw new TypeError("Scalar must be a finite number.");
  }

  if (isNumber(value)) {
    return value / scalar;
  }

  if (value && typeof value.divide === "function") {
    return value.divide(scalar);
  }

  throw new TypeError("Unsupported value type. Provide divide(number).");
}
