const LButton = document.querySelector('.carousel__button--left');
const RButton = document.querySelector('.carousel__button--right');
var slideIndex = midIndex;

function moveCarousel(directionForward) {
    const currentSlide = document.querySelector('.current-slide');

    if (directionForward === true) {
        slideIndex++;
        const nextSlide = currentSlide.nextElementSibling;

        currentSlide.classList.remove('current-slide');
        nextSlide.classList.add('current-slide');
    } else {
        slideIndex--;
        const nextSlide = currentSlide.previousElementSibling;

        currentSlide.classList.remove('current-slide');
        nextSlide.classList.add('current-slide');
    }
    console.log(slideIndex);
    console.log(slides.length);
}


LButton.addEventListener('click', () => {
    moveCarousel(false);
})

RButton.addEventListener('click', () => {
    moveCarousel(true);
})

