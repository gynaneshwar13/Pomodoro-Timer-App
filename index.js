const modes = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};

let currentMode = 'pomodoro';
let timeLeft = modes[currentMode];
let timerInterval = null;


const display = document.getElementById('timer-display');
const alarm = document.getElementById('alarm');


function formatTimeHMS(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const hh = h < 10 ? '0' + h : h;
    const mm = m < 10 ? '0' + m : m;
    const ss = s < 10 ? '0' + s : s;
    return `${hh}:${mm}:${ss}`;
}


function updateDisplay() {
    display.textContent = formatTimeHMS(timeLeft);
}


function startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alarm.play();
        }
    }, 1000);
}


function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}


function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    updateDisplay();
}


function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timeLeft = modes[currentMode];
    updateDisplay();
}


document.getElementById('pomodoro').addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    currentMode = 'pomodoro';
    timeLeft = modes[currentMode];
    updateDisplay();
    setActiveMode('pomodoro');
});

document.getElementById('shortBreak').addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    currentMode = 'shortBreak';
    timeLeft = modes[currentMode];
    updateDisplay();
    setActiveMode('shortBreak');
});

document.getElementById('longBreak').addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    currentMode = 'longBreak';
    timeLeft = modes[currentMode];
    updateDisplay();
    setActiveMode('longBreak');
});


function setActiveMode(modeId) {
    const buttons = document.querySelectorAll('.modes button');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.getElementById(modeId).classList.add('active');
}


document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);


updateDisplay();
