const timeDisplay = document.querySelector("#timeDisplay");
const excersieDisplay = document.querySelector("#exerciseDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let exerciseMenu = [
  "2x pistol squats per leg",
  "10 deep squats",
  "30 jumping jacks",
  "10 scapula pushups",
  "10 grips each hand",
];
let exercisesCompleted = [];

let alarm = new Audio("imperial_alarm.mp3");
let windowFlash;
let alarmIntervalID;

let startTime = 0;
let endTime = 0;
let remainingTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;

startBtn.addEventListener("click", () => {
  if (paused) {
    paused = false;
    startTime = Date.now();
    endTime = startTime + timeDisplay.textContent.split(":").join("") * 1000;
    remainingTime = endTime;
    setTimeout(() => {
      intervalId = setInterval(updateTime, 100);
    }, 1000);
  }
});

pauseBtn.addEventListener("click", () => {
  if (!paused) {
    paused = true;
    remainingTime = Date.now() - startTime;
    clearInterval(intervalId);
  }
});

resetBtn.addEventListener("click", () => {
  let el1 = document.getElementById("timeContainer");
  let el2 = document.getElementById("exerciseContainer");
  paused = true;
  clearInterval(intervalId);
  startTime = 0;
  endTime = 0;
  remainingTime = 0;
  hrs = 0;
  mins = 0;
  secs = 0;
  timeDisplay.textContent = "00:00:10";
  exerciseDisplay.textContent = "";
  document.getElementById("exerciseContainer").style.opacity = 0;
  alarm.pause();
  alarm.currentTime = 0;
  clearInterval(windowFlash);
  el1.style.backgroundColor = "#333";
  el2.style.backgroundColor = "#333";
});

function updateTime() {
  remainingTime = endTime - Date.now();
  console.log(remainingTime);
  secs = Math.floor((remainingTime / 1000) % 60);
  mins = Math.floor((remainingTime / (1000 * 60)) % 60);
  hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 60);

  secs = pad(secs);
  mins = pad(mins);
  hrs = pad(hrs);
  timeDisplay.textContent = `${hrs}:${mins}:${secs}`;

  function pad(unit) {
    return ("0" + unit).length > 2 ? unit : "0" + unit;
  }

  if (remainingTime <= 0) {
    //reset interface
    timeDisplay.textContent = "00:00:00";
    clearInterval(intervalId);
    exerciseAlert(...exerciseMenu);
    //sound the alarm!
    // let blinkSpeed = 0;
    alarm.play();
    // document.getElementById("exerciseContainer").style.backgroundColor =
    //   "#F63131";
    // setInterval(function () {
    let el1 = document.getElementById("timeContainer");
    let el2 = document.getElementById("exerciseContainer");
    //   if (el1.style.backgroundColor = '#333') {
    //     el1.style.backgroundColor = "#F63131";
    //     // el2.style.backgroundColor = "#F63131";
    //   } else if (el1.style.backgroundColor = "#F63131") {
    //     el1.style.backgroundColor = "#333";
    //     //  el2.style.backgroundColor = "#333";
    //   }

    window.flash = function () {
      if (flashStep == 1) {
        el1.style.backgroundColor = "#F63131";
        el2.style.backgroundColor = "#F63131";
        flashStep = 2;
      } else {
        el1.style.backgroundColor = "#333";
        el2.style.backgroundColor = "#333";
        flashStep = 1;
      }
    };
    let flashStep = 1;
    windowFlash = window.setInterval(flash, 2000);
    // }, blinkSpeed);
  }
}

function exerciseAlert(...exerciseMenu) {
  let randomExercise =
    exerciseMenu[Math.floor(Math.random() * exerciseMenu.length)];

  document.getElementById("exerciseDisplay").textContent = randomExercise;
  document.getElementById("exerciseContainer").style.opacity = 1;
}

function restartTimer() {
  if (paused) {
    paused = false;
    startTime = Date.now();
    endTime = startTime + 10000;
    remainingTime = endTime;

    intervalId = setInterval(updateTime, 100);

    clearInterval(windowFlash);

    alarm.pause();
    alarm.currentTime = 0;
  }
}

completeBtn.addEventListener("click", async () => {
  exercisesCompleted.push(
    document.getElementById("exerciseDisplay").textContent.toString()
  );
  excersieDisplay.textContent =
    "Exercise recorded \n Please hit reset then start";

  let el1 = document.getElementById("timeContainer");
  let el2 = document.getElementById("exerciseContainer");
  el1.style.backgroundColor = "#333";
  el2.style.backgroundColor = "#333";
  alarm.pause();
  alarm.currentTime = 0;

  clearInterval(windowFlash);
});
