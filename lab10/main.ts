export {};

let timerInterval: ReturnType<typeof setInterval> | null = null;
let startTime: number = 0;
let elapsedTime: number = 0;
let running: boolean = false;
let historyCount: number = 0;

const display = document.getElementById('display') as HTMLElement;
const startStopBtn = document.getElementById('startStopBtn') as HTMLButtonElement;
const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
const clearHistoryBtn = document.getElementById('clearHistoryBtn') as HTMLButtonElement;
const historyList = document.getElementById('historyList') as HTMLElement;

const startTimer = (): void => {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        if (display) display.textContent = timeToString(elapsedTime);
    }, 10);
}

const stopTimer = (): void => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

const timeToString = (time: number): string => {
    let date = new Date(time);
    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

if (startStopBtn) {
    startStopBtn.addEventListener('click', () => {
        if (!running) {
            startTimer();
            startStopBtn.textContent = 'Стоп';
            startStopBtn.classList.remove('start');
            startStopBtn.classList.add('stop');
        } else {
            stopTimer();
            startStopBtn.textContent = 'Старт';
            startStopBtn.classList.remove('stop');
            startStopBtn.classList.add('start');
            recordHistory();
        }
        running = !running;
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        stopTimer();
        elapsedTime = 0;
        if (display) display.textContent = "00:00:00.000";
        running = false;
        if (startStopBtn) {
            startStopBtn.textContent = 'Старт';
            startStopBtn.classList.remove('stop');
            startStopBtn.classList.add('start');
        }
    });
}

if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
        if (historyList) historyList.innerHTML = '';
        historyCount = 0;
        if (resetBtn) resetBtn.click();
    });
}

const recordHistory = (): void => {
    historyCount++;
    const li = document.createElement('li');
    if (display) li.textContent = `Замер ${historyCount}: ${display.textContent}`;
    if (historyList) historyList.appendChild(li);
}

