let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.textContent = timeToString(elapsedTime);
    }, 1000);
    isRunning = true;
    startPauseButton.textContent = "Pause";
    resetButton.disabled = false;
    lapButton.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startPauseButton.textContent = "Start";
}

function resetTimer() {
    clearInterval(timerInterval);
    display.textContent = "00:00:00";
    elapsedTime = 0;
    lapsContainer.innerHTML = '';
    resetButton.disabled = true;
    lapButton.disabled = true;
    startPauseButton.textContent = "Start";
    isRunning = false;
}

function lapTime() {
    const lapTime = document.createElement('li');
    lapTime.textContent = timeToString(elapsedTime);
    lapsContainer.appendChild(lapTime);
}

startPauseButton.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetButton.addEventListener('click', resetTimer);

lapButton.addEventListener('click', lapTime);
