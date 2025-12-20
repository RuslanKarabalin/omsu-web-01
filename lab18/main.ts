export {};

const startButton = document.getElementById('start1') as HTMLButtonElement;
const stopButton = document.getElementById('stop') as HTMLButtonElement;
const resetButton = document.getElementById('reset') as HTMLButtonElement;
const display = document.getElementById('timer-display') as HTMLElement;
const minutesInput = document.getElementById('minutes') as HTMLInputElement;
const secondsInput = document.getElementById('seconds') as HTMLInputElement;

let timerInterval: ReturnType<typeof setInterval> | null = null;
let startTime: number = 0;
let elapsedTime: number = 0;
let remainingTime: number = 0;

function startTimer(): void {
    if (timerInterval) return;

    const minutes = parseInt(minutesInput?.value || '0') || 0;
    const seconds = parseInt(secondsInput?.value || '0') || 0;

    remainingTime = (minutes * 60 + seconds) * 1000;

    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 10);
    toggleButtons(true);
}

function updateTimer(): void {
    const now = Date.now();
    elapsedTime = now - startTime;

    let timeLeft = remainingTime - elapsedTime;

    if (timeLeft < 0) {
        timeLeft = 0;
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        toggleButtons(false);
    }

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    const fractions = Math.floor((timeLeft % 1000) / 10);

    if (display) {
        display.textContent =
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0') + ':' +
            String(fractions).padStart(2, '0');
    }
}

function stopTimer(): void {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        remainingTime -= elapsedTime;
        toggleButtons(false);
    }
}

function resetTimer(): void {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    elapsedTime = 0;
    remainingTime = 0;
    if (display) display.textContent = '00:00:00';
    toggleButtons(false);
}

function toggleButtons(isRunning: boolean): void {
    if (isRunning) {
        if (startButton) startButton.classList.add('hidden');
        if (stopButton) stopButton.classList.remove('hidden');
        if (resetButton) resetButton.classList.remove('hidden');
    } else {
        if (startButton) startButton.classList.remove('hidden');
        if (stopButton) stopButton.classList.add('hidden');
        if (resetButton) resetButton.classList.add('hidden');
    }
}

if (startButton) {
    startButton.addEventListener('click', startTimer);
}

if (stopButton) {
    stopButton.addEventListener('click', stopTimer);
}

if (resetButton) {
    resetButton.addEventListener('click', resetTimer);
}

