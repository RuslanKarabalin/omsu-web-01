export {};

const createCircle = (x: number, y: number): void => {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.classList.add('red');
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.dataset.clickCount = '0';
    document.body.appendChild(circle);
}

const handleCircleClick = (circle: HTMLElement): void => {
    let clickCount = parseInt(circle.dataset.clickCount || '0');

    circle.dataset.clickCount = String(++clickCount);

    if (clickCount === 1) {
        circle.classList.remove('red');
        circle.classList.add('grow');
        circle.classList.add('blue');
    } else if (clickCount === 2) {
        circle.classList.remove('blue');
        circle.classList.remove('grow');
        circle.classList.add('red');
    } else if (clickCount === 3) {
        circle.classList.add('border-only');
    } else if (clickCount === 4) {
        circle.remove();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    createCircle(100, 100);

    document.addEventListener('click', function (event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (target.classList.contains('circle')) {
            handleCircleClick(target);
        } else {
            createCircle(event.clientX - 50, event.clientY - 50);
        }
    });
});

