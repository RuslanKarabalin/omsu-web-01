export {};

let secretNumber: string = generateNumber();
let attempts: number = 0;

function generateNumber(): string {
    let digits: number[] = [];
    while (digits.length < 4) {
        let randomDigit = Math.floor(Math.random() * 10);
        if (digits.length === 0 && randomDigit === 0) continue;
        if (!digits.includes(randomDigit)) digits.push(randomDigit);
    }
    return digits.join('');
}

function makeGuess(): void {
    const guessInput = document.getElementById('guessInput') as HTMLInputElement;
    if (!guessInput) return;
    const guess = guessInput.value;
    if (guess.length !== 4 || new Set(guess).size !== 4) {
        alert("Введите четырёхзначное число без повторяющихся цифр.");
        return;
    }

    attempts++;
    const result = checkGuess(guess);
    const historyElement = document.getElementById('history');
    if (historyElement) {
        const newHistoryEntry = document.createElement('p');
        newHistoryEntry.textContent = `Попытка ${attempts}: ${guess} - ${result.bulls} Бык(ов), ${result.cows} Коров(ы)`;
        historyElement.appendChild(newHistoryEntry);
    }

    if (result.bulls === 4) {
        alert(`Поздравляем! Вы угадали число ${secretNumber} за ${attempts} попыток.`);
        resetGame();
    }
    guessInput.value = '';
}

function checkGuess(guess: string): { bulls: number; cows: number } {
    let bulls = 0;
    let cows = 0;
    for (let i = 0; i < 4; i++) {
        if (guess[i] === secretNumber[i]) {
            bulls++;
        } else if (secretNumber.includes(guess[i])) {
            cows++;
        }
    }
    return { bulls, cows };
}

function resetGame(): void {
    secretNumber = generateNumber();
    attempts = 0;
    const historyElement = document.getElementById('history');
    if (historyElement) historyElement.innerHTML = '';
}

function showRules(): void {
    const rulesModal = document.getElementById('rulesModal') as HTMLElement;
    if (rulesModal) rulesModal.style.display = 'flex';
}

function closeRules(): void {
    const rulesModal = document.getElementById('rulesModal') as HTMLElement;
    if (rulesModal) rulesModal.style.display = 'none';
}

