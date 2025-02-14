const timer = document.querySelector('#pomodoro-time');
const btnStart = document.querySelector('#start');
const btnBreak = document.querySelector('#break');
const btnReset = document.querySelector('#reset');
const btnPomodoro = document.querySelector('#pomodoro');


let minutes = 25;
let seconds = 0;
let isRunning = false;
let timerId;
let mode = 'pomodoro';

function updateTimer() {
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

updateTimer();

function startTimer() {
    clearInterval(timerId);

    timerId = setInterval(() => {
        if (seconds === 0) {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }

        updateTimer()

        if (minutes === 0 && seconds === 0) {
            clearInterval(timerId);
            btnStart.textContent = 'Start';
            isRunning = false;
        }
    }, 1000);
}

btnStart.addEventListener('click', function () {
    if (isRunning) {
        clearInterval(timerId);
        isRunning = false;
        btnStart.textContent = 'Start';
    } else {
        isRunning = true;
        btnStart.textContent = 'Stop';
        startTimer();
    }
});

btnBreak.addEventListener('click', function () {
    btnBreak.classList.add('active');
    btnPomodoro.classList.remove('active');
    clearInterval(timerId);
    isRunning = false;
    btnStart.textContent = 'Start';
    mode = 'break';
    minutes = 5;
    seconds = 0;
    updateTimer();
});

btnPomodoro.addEventListener('click', function () {
    btnPomodoro.classList.add('active');
    btnBreak.classList.remove('active');
    clearInterval(timerId);
    isRunning = false;
    btnStart.textContent = 'Start';
    mode = 'pomodoro';
    minutes = 25;
    seconds = 0;
    updateTimer();
});

btnReset.addEventListener('click', function () {
    clearInterval(timerId);
    btnStart.textContent = 'Start';
    isRunning = false;
    if (mode === 'pomodoro') {
        minutes = 25;
    } else {
        minutes = 5;
    }
    seconds = 0;
    updateTimer()
});