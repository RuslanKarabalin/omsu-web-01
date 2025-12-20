export {};

const getRandomAngle = (): number => {
    const angles = [0, 90, 180, 270];
    return angles[Math.floor(Math.random() * 3)];
}

const randomizeImages = (): void => {
    let images = document.getElementsByClassName("img");
    let values: HTMLElement[] = Array.from(images) as HTMLElement[];
    values.forEach(img => {
        let angle = getRandomAngle();
        img.dataset.rotateAngle = String(angle);
        img.style.transform = `rotate(${angle}deg)`;
    });
}

const handleImgClick = (img: HTMLElement): void => {
    let rotateAngle = parseInt(img.dataset.rotateAngle || '0');
    if (rotateAngle !== 0) {
        rotateAngle += 90;
        rotateAngle %= 360;
        img.dataset.rotateAngle = String(rotateAngle);
        img.style.transform = `rotate(${rotateAngle}deg)`;
    }
}

const restartGame = (): void => {
    randomizeImages();
    let endText = document.getElementById("end");
    let restartButton = document.getElementById("restartButton");

    if (endText) endText.classList.add("unvisible");
    if (restartButton) restartButton.classList.add("unvisible");
}

document.addEventListener("DOMContentLoaded", () => {
    randomizeImages();
    document.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('img')) {
            handleImgClick(target);
        }
        let images = document.getElementsByClassName("img");
        let values: HTMLElement[] = Array.from(images) as HTMLElement[];
        let solved = true;
        values.forEach(img => {
            if (parseInt(img.dataset.rotateAngle || '0') !== 0) {
                solved = false;
            }
        });
        let endText = document.getElementById("end");
        let restartButton = document.getElementById("restartButton");
        if (solved && endText && restartButton) {
            endText.classList.remove("unvisible");
            restartButton.classList.remove("unvisible");
        }
    });
});

