<template>
  <section class="pop-up-carousel" id="landingCarousel">
    <span class="carousel__button carousel__button--left">
      <img src="/static/images/vectors/right-arrow-img.svg" alt="" width="25" height="25">
    </span>
    <div class="carousel__track-container">
      <div class="carousel-track" style="visibility: hidden">
        <LandingCard/>
        <LandingCard/>
        <LandingCard/>
        <LandingCard/>
        <LandingCard/>
      </div>
    </div>
    <span class="carousel__button carousel__button--right">
      <img src="/static/images/vectors/right-arrow-img.svg" alt="" width="25" height="25">
    </span>
  </section>
</template>

<style scoped>
</style>

<script setup lang="ts">
let autoSlideIntervalPointer: any = null;

function pauseCarousel() {
  clearInterval(autoSlideIntervalPointer);
  autoSlideIntervalPointer = null;
}

onMounted(() => {
  const track = document.querySelector('.carousel-track') as HTMLElement || null;
  const pop_up_carousel = document.querySelector('.pop-up-carousel') as HTMLElement || null;
  const LButton = document.querySelector('.carousel__button--left');
  const RButton = document.querySelector('.carousel__button--right');
  const landingCarousel = document.querySelector('#landingCarousel') as HTMLElement || null;
  const slideDetails = document.querySelectorAll('.carousel__slide-details') as NodeListOf<HTMLElement> || null;

  if (!track && pop_up_carousel) return;
  const slides = Array.from(track.children);
  const slideWidth = track.getBoundingClientRect().width / slides.length;
  let focusIndex = Math.floor(slides.length / 2);
  let directionForward: boolean = true;

  pop_up_carousel.style.width = slideWidth + 'px';
  track.style.transform = 'translateX(-' + slideWidth * focusIndex + 'px)';
  slides[focusIndex].classList.add('current-slide');
  track.style.visibility = 'visible';

  landingCarousel?.addEventListener('mouseleave', () => {
    if (autoSlideIntervalPointer) return;
    autoSlideIntervalPointer = setInterval(autoMoveCarousel, 3000);
  })

  function moveCarousel(directionForward: boolean) {
    const currentSlide = document.querySelector('.current-slide');
    const nextSlide = directionForward ? currentSlide!.nextElementSibling : currentSlide!.previousElementSibling;

    if (!currentSlide || !nextSlide) return;

    if (directionForward) {
      focusIndex++;
      currentSlide!.classList.remove('current-slide');
      track.style.transform = 'translateX(-' + slideWidth * focusIndex + 'px)';
      nextSlide?.classList.add('current-slide');
    } else {
      focusIndex--;
      currentSlide!.classList.remove('current-slide');
      track.style.transform = 'translateX(-' + slideWidth * focusIndex + 'px)';
      nextSlide?.classList.add('current-slide');
    }
  }

  LButton?.addEventListener('click', () => {
    directionForward = false;
    pauseCarousel();
    moveCarousel(directionForward);
  })

  RButton?.addEventListener('click', () => {
    directionForward = true;
    pauseCarousel();
    moveCarousel(directionForward);
  })


  function autoMoveCarousel() {
    if (focusIndex >= slides.length - 1) {
      directionForward = false;
    } else if (focusIndex === 0) {
      directionForward = true;
    }
    moveCarousel(directionForward);
  }

  autoSlideIntervalPointer = setInterval(autoMoveCarousel, 3000);

  setTimeout(() => {
    track?.classList.add('transitionSpeed')
  }, 0);

  slideDetails?.forEach((slideDetail) => {
    slideDetail.addEventListener('mouseenter', () => {
      pauseCarousel();
    })
    slideDetail.addEventListener('mouseleave', () => {
      if (autoSlideIntervalPointer) return;
      autoSlideIntervalPointer = setInterval(autoMoveCarousel, 3000);
    })
  })
})

onBeforeUnmount(() => {
  pauseCarousel();
})
</script>