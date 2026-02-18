import { Vector2, createAnimator } from "../../src/index.js";

const follower = document.querySelector(".follower");
const target = document.querySelector(".target");

const controls = {
  frequency: document.querySelector("#f"),
  damping: document.querySelector("#z"),
  response: document.querySelector("#r"),
};

const labels = {
  frequency: document.querySelector("#fValue"),
  damping: document.querySelector("#zValue"),
  response: document.querySelector("#rValue"),
};

const center = new Vector2(window.innerWidth / 2, window.innerHeight / 2);
let pointer = center;

function setDotPosition(element, position) {
  element.style.left = `${position.x}px`;
  element.style.top = `${position.y}px`;
}

setDotPosition(target, pointer);
setDotPosition(follower, pointer);

const animator = createAnimator({
  initialValue: pointer,
  frequency: Number(controls.frequency.value),
  damping: Number(controls.damping.value),
  response: Number(controls.response.value),
  updateSource: () => pointer,
  onUpdate: (position) => setDotPosition(follower, position),
});

animator.start();

function syncLabel(key) {
  labels[key].textContent = controls[key].value;
}

function updateParams() {
  animator.setParams({
    frequency: Number(controls.frequency.value),
    damping: Number(controls.damping.value),
    response: Number(controls.response.value),
  });

  syncLabel("frequency");
  syncLabel("damping");
  syncLabel("response");
}

controls.frequency.addEventListener("input", updateParams);
controls.damping.addEventListener("input", updateParams);
controls.response.addEventListener("input", updateParams);

window.addEventListener("pointermove", (event) => {
  pointer = new Vector2(event.clientX, event.clientY);
  setDotPosition(target, pointer);
});

window.addEventListener("resize", () => {
  const current = animator.getValue();
  if (typeof current === "number") {
    return;
  }

  setDotPosition(follower, current);
  setDotPosition(target, pointer);
});
