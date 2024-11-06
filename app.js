let minutes = 0, seconds = 0, milliseconds = 0;
let isRunning = false;
let interval;
let lapCounter = 1;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

function updateDisplay() {
    const format = (num) => num.toString().padStart(2, "0");
    const formattedMilliseconds = Math.floor(milliseconds / 10).toString().padStart(2, "0");
    display.textContent = `${format(minutes)}:${format(seconds)}.${formattedMilliseconds}`;
}

function startStop() {
    if (!isRunning) {
        interval = setInterval(() => {
            milliseconds += 10;
            if (milliseconds === 1000) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            updateDisplay();
        }, 10);
        startStopButton.textContent = "Pause";
    } else {
        clearInterval(interval);
        startStopButton.textContent = "Start";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(interval);
    minutes = seconds = milliseconds = 0;
    isRunning = false;
    updateDisplay();
    startStopButton.textContent = "Start";
    lapsContainer.innerHTML = "";
    lapCounter = 1;
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement("div");
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapsContainer.appendChild(lapTime);
        lapCounter++;
    }
}

startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", recordLap);
