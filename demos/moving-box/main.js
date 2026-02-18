import { createAnimator } from "../../src/index.js";

const track = document.querySelector("#track");
const box = document.querySelector("#box");
const targetMarker = document.querySelector("#target");
const targetValueLabel = document.querySelector("#targetValue");
const animatedValueLabel = document.querySelector("#animatedValue");

let trackWidth = track.clientWidth;
let targetX = 0;

const animator = createAnimator({
  initialValue: 0,
  frequency: 2.8,
  damping: 0.75,
  response: 1,
  updateSource: () => targetX,
  onUpdate: (value) => {
    box.style.transform = `translateX(${value}px)`;
    animatedValueLabel.textContent = value.toFixed(2);
  },
});

animator.start();

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function setTarget(clientX) {
  const rect = track.getBoundingClientRect();
  trackWidth = rect.width;

  const nextTarget = clamp(clientX - rect.left, 0, trackWidth);
  targetX = nextTarget;

  targetMarker.style.transform = `translateX(${targetX}px)`;
  targetValueLabel.textContent = targetX.toFixed(0);
}

track.addEventListener("click", (event) => {
  setTarget(event.clientX);
});

track.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    targetX = clamp(targetX + 30, 0, trackWidth);
  } else if (event.key === "ArrowLeft") {
    targetX = clamp(targetX - 30, 0, trackWidth);
  } else {
    return;
  }

  targetMarker.style.transform = `translateX(${targetX}px)`;
  targetValueLabel.textContent = targetX.toFixed(0);
  event.preventDefault();
});

window.addEventListener("resize", () => {
  const rect = track.getBoundingClientRect();
  trackWidth = rect.width;
  targetX = clamp(targetX, 0, trackWidth);
  targetMarker.style.transform = `translateX(${targetX}px)`;
});

setTarget(track.getBoundingClientRect().left);
