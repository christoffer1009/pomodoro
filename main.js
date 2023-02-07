const display = document.getElementById("timer");
const pomodoro = document.getElementById("pomodoro-timer");
const shortPause = document.getElementById("short-pause-timer");
const longPause = document.getElementById("long-pause-timer");
const startBtn = document.getElementById("start");

let global_timer = 0;
let isPaused = false;
let intervalID;

setPomodoroTimer();

function setLongPauseTimer() {
  let longPauseTimer = 10;
  global_timer = longPauseTimer;
  display.innerHTML = longPauseTimer;
  longPause.classList.add("selected");
  shortPause.classList.remove("selected");
  pomodoro.classList.remove("selected");
  stop();
}
function setShortPauseTimer() {
  let shortPauseTimer = 5;
  global_timer = shortPauseTimer;
  display.innerHTML = shortPauseTimer;
  shortPause.classList.add("selected");
  longPause.classList.remove("selected");
  pomodoro.classList.remove("selected");
  stop();
}
function setPomodoroTimer() {
  let pomodoroTimer = 25;
  global_timer = pomodoroTimer;
  display.innerHTML = pomodoroTimer;
  pomodoro.classList.add("selected");
  longPause.classList.remove("selected");
  shortPause.classList.remove("selected");
  stop();
}

function start() {
  let timer = global_timer;
  isPaused = false;
  startBtn.onclick = togglePause;
  startBtn.innerHTML = "Pause";

  intervalID = setInterval(() => {
    if (!isPaused) {
      console.log("local", timer);
      display.innerHTML = timer;
      timer -= 1;
      if (timer === -1) {
        clearInterval(intervalID);
      }
    }
  }, 1000);
}

function stop() {
  clearInterval(intervalID);
  startBtn.onclick = start;
  startBtn.innerHTML = "Start";
}

function togglePause() {
  if (!isPaused) {
    isPaused = true;
    document.getElementById("start").innerHTML = "Resume";
  } else {
    isPaused = false;
    document.getElementById("start").innerHTML = "Pause";
  }
  console.log(isPaused);
}
