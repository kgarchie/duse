const LButton = document.querySelector('.carousel__button--left');
const RButton = document.querySelector('.carousel__button--right');
var slideIndex = midIndex;

function moveCarousel(directionForward) {
    const currentSlide = document.querySelector('.current-slide');

    if (directionForward === true) {
        slideIndex++;
        const nextSlide = currentSlide.nextElementSibling;

        currentSlide.classList.remove('current-slide');
        track.style.transform = 'translateX(-' + slideWidth * slideIndex + 'px)';
        nextSlide.classList.add('current-slide');
    } else {
        slideIndex--;
        const nextSlide = currentSlide.previousElementSibling;

        currentSlide.classList.remove('current-slide');
        track.style.transform = 'translateX(-' + slideWidth * slideIndex + 'px)';
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


function autoMoveCarousel() {
    if (slideIndex === slides.length - 1) {
        moveCarousel(false);
    } else {
        moveCarousel(true);
    }
}

setInterval(autoMoveCarousel, 3000);
