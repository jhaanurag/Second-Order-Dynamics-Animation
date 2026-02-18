import { createAnimator } from "../../src/index.js";

const targetInput = document.querySelector("#target");
const targetValueLabel = document.querySelector("#targetValue");
const animatedValueLabel = document.querySelector("#animatedValue");
const fill = document.querySelector("#fill");

const frequencyInput = document.querySelector("#f");
const dampingInput = document.querySelector("#z");
const responseInput = document.querySelector("#r");

let target = Number(targetInput.value);

targetValueLabel.textContent = String(target);

const animator = createAnimator({
  initialValue: target,
  frequency: Number(frequencyInput.value),
  damping: Number(dampingInput.value),
  response: Number(responseInput.value),
  updateSource: () => target,
  onUpdate: (value) => {
    const clamped = Math.min(100, Math.max(0, value));
    animatedValueLabel.textContent = value.toFixed(2);
    fill.style.width = `${clamped}%`;
  },
});

animator.start();

function updateParams() {
  animator.setParams({
    frequency: Number(frequencyInput.value),
    damping: Number(dampingInput.value),
    response: Number(responseInput.value),
  });
}

targetInput.addEventListener("input", () => {
  target = Number(targetInput.value);
  targetValueLabel.textContent = String(target);
});

frequencyInput.addEventListener("input", updateParams);
dampingInput.addEventListener("input", updateParams);
responseInput.addEventListener("input", updateParams);
