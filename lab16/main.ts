export {};

const pin01 = document.getElementById("pin01") as HTMLInputElement;
const pin02 = document.getElementById("pin02") as HTMLInputElement;
const dialog = document.getElementById("dialog") as HTMLDialogElement;
const dialogText = document.getElementById("dialog-text") as HTMLElement;
const dialogClose = document.getElementById("dialog-close") as HTMLElement;

let pin01Expression: string = "";
let pin02Expression: string = "";

let choosenInput: number = 1;

if (pin01) {
    pin01.addEventListener("click", () => {
        choosenInput = 1;
    });
}

if (pin02) {
    pin02.addEventListener("click", () => {
        choosenInput = 2;
    });
}

function addNumber(number: string): void {
    if (choosenInput === 1) {
        pin01Expression += number;
    } else {
        pin02Expression += number;
    }
    if (pin01) pin01.value = pin01Expression;
    if (pin02) pin02.value = pin02Expression;
}

function deleteNumber(): void {
    if (choosenInput === 1) {
        pin01Expression = pin01Expression.substring(0, pin01Expression.length - 1);
    } else {
        pin02Expression = pin02Expression.substring(0, pin02Expression.length - 1);
    }
    if (pin01) pin01.value = pin01Expression;
    if (pin02) pin02.value = pin02Expression;
}

function enterPins(): void {
    if (!dialog || !dialogText) return;
    if (pin01Expression === pin02Expression) {
        dialogText.innerHTML = "Пин-коды совпадают!";
    } else {
        dialogText.innerHTML = "Пин-коды не совпадают!";
    }
    dialog.showModal();
    pin01Expression = "";
    pin02Expression = "";
    if (pin01) pin01.value = pin01Expression;
    if (pin02) pin02.value = pin02Expression;
}

if (dialogClose) {
    dialogClose.addEventListener("click", () => {
        if (dialog) dialog.close();
    });
}

