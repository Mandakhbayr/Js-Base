const display = document.getElementById("display");
const logs = document.getElementById("logs");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(update, 10);
    isRunning = true;
  }
}

function stop() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function reset() {
  clearInterval(timer);
  display.textContent = "00:00:00:00";
  elapsedTime = 0;
  isRunning = false;
  logs.textContent = " ";
}

function update() {
  const rnow = Date.now();
  elapsedTime = rnow - startTime;

  let hour = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minute = Math.floor((elapsedTime / 60000) % 60);
  let second = Math.floor((elapsedTime / 1000) % 60);
  let milsec = Math.floor((elapsedTime % 1000) / 10);

  hour = String(hour).padStart(2, "0");
  minute = String(minute).padStart(2, "0");
  second = String(second).padStart(2, "0");
  milsec = String(milsec).padStart(2, "0");
  display.textContent = `${hour}:${minute}:${second}:${milsec}`;
}

function log() {
  let hour = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minute = Math.floor((elapsedTime / 60000) % 60);
  let second = Math.floor((elapsedTime / 1000) % 60);
  let milsec = Math.floor((elapsedTime % 1000) / 10);

  hour = String(hour).padStart(2, "0");
  minute = String(minute).padStart(2, "0");
  second = String(second).padStart(2, "0");
  milsec = String(milsec).padStart(2, "0");
  logs.textContent =
    logs.textContent + `${hour}:${minute}:${second}:${milsec}` + "\n";
}
