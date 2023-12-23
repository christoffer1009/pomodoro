const display = document.getElementById("timer");
const pomodoro = document.getElementById("pomodoro-timer");
const shortPause = document.getElementById("short-pause-timer");
const longPause = document.getElementById("long-pause-timer");
const startBtn = document.getElementById("start");
const alarm = document.getElementById("alarm");
let global_timer = 0;
let isPaused = false;
let intervalID;


setPomodoroTimer();
setAudioControls()

function setLongPauseTimer() {
  let longPauseTimer = 10 * 60 * 1000;
  global_timer = longPauseTimer;
  display.innerHTML = msToTime(longPauseTimer);
  longPause.classList.add("selected");
  shortPause.classList.remove("selected");
  pomodoro.classList.remove("selected");
  stop();
}

function setShortPauseTimer() {
  let shortPauseTimer = 5 * 60 * 1000;
  global_timer = shortPauseTimer;
  display.innerHTML = msToTime(shortPauseTimer);
  shortPause.classList.add("selected");
  longPause.classList.remove("selected");
  pomodoro.classList.remove("selected");
  stop();
}

function setPomodoroTimer() {
  let pomodoroTimer = 25 * 60 * 1000;
  global_timer = pomodoroTimer;
  display.innerHTML = msToTime(pomodoroTimer);
  pomodoro.classList.add("selected");
  longPause.classList.remove("selected");
  shortPause.classList.remove("selected");
  stop();
}

function start() {
  pomodoro.innerHTML = 'Recomeçar'
  let timer = global_timer;
  isPaused = false;
  startBtn.onclick = togglePause;
  startBtn.innerHTML = "Pausar";

  intervalID = setInterval(() => {
    if (!isPaused) {
      display.innerHTML = msToTime(timer);
      timer -= 1000;
      if (timer < 0) {
        clearInterval(intervalID);
        startBtn.onclick = start;
        startBtn.innerHTML = "Iniciar";
        playAlarm();
      }
    }
  }, 1000);
}

function stop() {
  clearInterval(intervalID);
  startBtn.onclick = start;
  startBtn.innerHTML = "Iniciar";
}

function togglePause() {
  if (!isPaused) {
    isPaused = true;
    document.getElementById("start").innerHTML = "Continuar";
  } else {
    isPaused = false;
    document.getElementById("start").innerHTML = "Pausar";
  }
}

function msToTime(duration) {
  let milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds; //+ "." + milliseconds;
}

function playAlarm() {
  alarm.play();
  setTimeout(() => alarm.pause(), 3000);
}

function setAudioControlsById(audioId, playPauseBtnId, volumeControlId) {
  document.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementById(audioId);
    var playPauseBtn = document.getElementById(playPauseBtnId);
    var volumeControl = document.getElementById(volumeControlId);

    playPauseBtn.addEventListener('click', function () {
      if (audio.paused) {
        audio.play();
        playPauseBtn.src = 'images/pause.svg';
      } else {
        audio.pause();
        playPauseBtn.src = 'images/play.svg';
      }
    });

    volumeControl.addEventListener('input', function () {
      audio.volume = volumeControl.value;
    });
  });
}

function setAudioControls() {
  const audioPlayers = Array.from(document.getElementsByClassName("audio-player"))
  console.log(audioPlayers)

  audioPlayers.forEach((element, i) => {
    var audioId = element.querySelector('audio').id;
    var playPauseBtnIdId = element.querySelector('img').id;
    var volumeControlId = element.querySelector('input').id;

    setAudioControlsById(audioId, playPauseBtnIdId, volumeControlId)
  })

}