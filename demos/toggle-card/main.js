import { createAnimator } from "../../src/index.js";

const toggleButton = document.querySelector("#toggle");
const card = document.querySelector("#card");
const progressLabel = document.querySelector("#progress");

let target = 1;

const animator = createAnimator({
  initialValue: 1,
  frequency: 3,
  damping: 0.72,
  response: 1,
  updateSource: () => target,
  onUpdate: (value) => {
    const clamped = Math.min(1, Math.max(0, value));

    card.style.opacity = String(clamped);
    card.style.transform = `translateY(${(1 - clamped) * 18}px) scale(${0.94 + clamped * 0.06})`;
    card.style.height = `${clamped * 180}px`;
    card.style.padding = `${12 + clamped * 12}px 18px`;
    progressLabel.textContent = clamped.toFixed(2);
  },
});

animator.start();

function renderButton() {
  toggleButton.textContent = target > 0.5 ? "Close Card" : "Open Card";
}

toggleButton.addEventListener("click", () => {
  target = target > 0.5 ? 0 : 1;
  renderButton();
});

renderButton();
