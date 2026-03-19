const timeDisplay = document.getElementById("timeDisplay");
const startBtn = document.getElementById("startBtn");
const lapBtn = document.getElementById("lapBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapList = document.getElementById("lapList");

let running = false;
let timerId = null;
let startTime = 0;
let elapsedBefore = 0;
let lapCount = 1;

function formatTime(ms) {
  const totalCentiseconds = Math.floor(ms / 10);
  const centiseconds = totalCentiseconds % 100;
  const totalSeconds = Math.floor(totalCentiseconds / 100);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
}

function renderTime() {
  const elapsed = running ? Date.now() - startTime + elapsedBefore : elapsedBefore;
  timeDisplay.textContent = formatTime(elapsed);
}

function addEmptyState() {
  lapList.innerHTML = "";
  const item = document.createElement("li");
  item.className = "empty";
  item.textContent = "No laps yet.";
  lapList.appendChild(item);
}

function addLap() {
  if (!running) return;

  const elapsed = Date.now() - startTime + elapsedBefore;

  if (lapList.querySelector(".empty")) {
    lapList.innerHTML = "";
  }

  const item = document.createElement("li");
  const label = document.createElement("span");
  const value = document.createElement("span");

  label.textContent = `Lap ${lapCount}`;
  value.textContent = `${formatTime(elapsed)} sec`;

  item.appendChild(label);
  item.appendChild(value);
  lapList.prepend(item);

  lapCount += 1;
}

function setButtonStates(isRunning) {
  startBtn.disabled = isRunning;
  lapBtn.disabled = !isRunning;
  stopBtn.disabled = !isRunning;
}

function startTimer() {
  if (running) return;

  running = true;
  startTime = Date.now();
  timerId = setInterval(renderTime, 30);
  setButtonStates(true);
}

function stopTimer() {
  if (!running) return;

  elapsedBefore += Date.now() - startTime;
  running = false;
  clearInterval(timerId);
  timerId = null;
  setButtonStates(false);
  renderTime();
}

function resetTimer() {
  running = false;
  clearInterval(timerId);
  timerId = null;
  startTime = 0;
  elapsedBefore = 0;
  lapCount = 1;
  setButtonStates(false);
  renderTime();
  addEmptyState();
}

startBtn.addEventListener("click", startTimer);
lapBtn.addEventListener("click", addLap);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

addEmptyState();
renderTime();
