export {};

const gameBoard = document.getElementById('game-board') as HTMLElement;
const resultDisplay = document.getElementById('result') as HTMLElement;
const catScoreDisplay = document.getElementById('cat-score') as HTMLElement;
const mouseScoreDisplay = document.getElementById('mouse-score') as HTMLElement;
const roundCountDisplay = document.getElementById('round-count') as HTMLElement;
const resetButton = document.getElementById('reset-button') as HTMLElement;

const catIcon = '🐱';
const mouseIcon = '🐭';
const boardSize = 5;
const winCondition = 3;

type CellValue = 'cat' | 'mouse' | null;
type Board = CellValue[][];

let board: Board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
let isCatTurn: boolean = true;
let catScore: number = 0;
let mouseScore: number = 0;
let roundCount: number = 1;

function initGame(): void {
    if (!gameBoard) return;
    gameBoard.innerHTML = '';
    board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
    isCatTurn = true;
    if (resultDisplay) resultDisplay.textContent = '';
    if (resetButton) resetButton.style.display = 'none';

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = String(i);
            cell.dataset.col = String(j);
            cell.addEventListener('click', makeMove);
            gameBoard.appendChild(cell);
        }
    }
}

function makeMove(event: Event): void {
    const target = event.target as HTMLElement;
    const row = parseInt(target.dataset.row || '0');
    const col = parseInt(target.dataset.col || '0');

    if (board[row][col] || (resultDisplay && resultDisplay.textContent)) return;

    board[row][col] = isCatTurn ? 'cat' : 'mouse';
    target.textContent = isCatTurn ? catIcon : mouseIcon;

    if (checkWin(row, col)) {
        if (resultDisplay) {
            resultDisplay.textContent = isCatTurn ? 'Крестики победили!' : 'Нолики победили!';
        }
        if (isCatTurn) {
            catScore++;
            if (catScoreDisplay) catScoreDisplay.textContent = String(catScore);
        } else {
            mouseScore++;
            if (mouseScoreDisplay) mouseScoreDisplay.textContent = String(mouseScore);
        }
        roundCount++;
        if (roundCountDisplay) roundCountDisplay.textContent = String(roundCount);
        if (resetButton) resetButton.style.display = 'block';
    } else if (board.flat().every(cell => cell)) {
        if (resultDisplay) resultDisplay.textContent = 'Ничья!';
        roundCount++;
        if (roundCountDisplay) roundCountDisplay.textContent = String(roundCount);
        if (resetButton) resetButton.style.display = 'block';
    } else {
        isCatTurn = !isCatTurn;
    }
}

function checkWin(row: number, col: number): boolean {
    const currentPlayer = board[row][col];
    if (!currentPlayer) return false;

    const directions = [
        { dr: 1, dc: 0 }, { dr: 0, dc: 1 },
        { dr: 1, dc: 1 }, { dr: 1, dc: -1 }
    ];

    for (let { dr, dc } of directions) {
        let count = 1;
        for (let i = 1; i < winCondition; i++) {
            const r = row + dr * i;
            const c = col + dc * i;
            if (r < 0 || c < 0 || r >= boardSize || c >= boardSize || board[r][c] !== currentPlayer) break;
            count++;
        }
        for (let i = 1; i < winCondition; i++) {
            const r = row - dr * i;
            const c = col - dc * i;
            if (r < 0 || c < 0 || r >= boardSize || c >= boardSize || board[r][c] !== currentPlayer) break;
            count++;
        }
        if (count >= winCondition) return true;
    }
    return false;
}

if (resetButton) {
    resetButton.addEventListener('click', initGame);
}

initGame();

