export {};

let display = document.getElementById('display') as HTMLInputElement;
let expression: string = '';

function appendNumber(number: string): void {
    expression += number;
    if (display) display.value = expression;
}

function appendOperator(operator: string): void {
    expression += operator;
    if (display) display.value = expression;
}

function appendDot(): void {
    if (!expression.includes('.')) {
        expression += '.';
        if (display) display.value = expression;
    }
}

function appendConstant(constant: string): void {
    if (constant === 'pi') {
        expression += Math.PI;
    } else if (constant === 'e') {
        expression += Math.E;
    }
    if (display) display.value = expression;
}

function clearDisplay(): void {
    expression = '';
    if (display) display.value = '';
}

function calculateSquareRoot(): void {
    expression += '**(1/2)';
    if (display) display.value = expression;
}

function calculateSquare(): void {
    expression += '**2';
    if (display) display.value = expression;
}

function calculatePower(): void {
    expression += '**';
    if (display) display.value = expression;
}

function calculateNthRoot(): void {
    expression += '**(1/';
    if (display) display.value = expression;
}

function calculateTrig(func: string): void {
    try {
        if (func === 'sin') {
            expression = String(Math.sin(eval(expression) as number));
        } else if (func === 'cos') {
            expression = String(Math.cos(eval(expression) as number));
        } else if (func === 'tan') {
            expression = String(Math.tan(eval(expression) as number));
        }
        if (display) display.value = expression;
        expression = '';
    } catch (error) {
        if (display) display.value = 'Ошибка';
        expression = '';
    }
}

function calculate(): void {
    try {
        expression = String(eval(expression));
        if (display) display.value = expression;
    } catch (error) {
        if (display) display.value = 'Ошибка';
        expression = '';
    }
}

