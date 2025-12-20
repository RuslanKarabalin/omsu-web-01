export {};

let currentSlide: number = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
const slider = document.querySelector('.slider') as HTMLElement;
let slideInterval: ReturnType<typeof setInterval> = setInterval(nextSlide, 6000);

showSlide(currentSlide);

function showSlide(n: number): void {
    if (slider) {
        slider.style.transform = `translateX(-${n * 100}%)`;
    }
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === n);
    });
}

function nextSlide(): void {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide(): void {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

const nextButton = document.querySelector('.next') as HTMLElement;
if (nextButton) {
    nextButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 6000);
    });
}

const prevButton = document.querySelector('.prev') as HTMLElement;
if (prevButton) {
    prevButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 6000);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        currentSlide = index;
        showSlide(currentSlide);
        slideInterval = setInterval(nextSlide, 6000);
    });
});

