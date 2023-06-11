<template>
  <section class="pop-up-carousel">
    <span class="carousel__button carousel__button--left">
      <img src="/static/images/vectors/right-arrow-img.svg" alt="" width="25" height="25">
    </span>
    <div class="carousel__track-container">
      <div class="carousel-track">
        <LandingCard/>
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

onBeforeMount(() => {
  const track = document.querySelector('.carousel-track') as HTMLElement || null;
  const pop_up_carousel = document.querySelector('.pop-up-carousel') as HTMLElement || null;
  const LButton = document.querySelector('.carousel__button--left');
  const RButton = document.querySelector('.carousel__button--right');

  if (!track && pop_up_carousel) return;
  const slides = Array.from(track.children);
  const slideWidth = track.getBoundingClientRect().width / slides.length;
  const midIndex = Math.floor(slides.length / 2);

  function stageCarousel() {
    pop_up_carousel.style.width = slideWidth + 'px';
    track.style.transform = 'translateX(-' + slideWidth * midIndex + 'px)';
    slides[midIndex].classList.add('current-slide');
  }

  stageCarousel()

  let slideIndex = midIndex;
  function moveCarousel(directionForward: boolean) {
    const currentSlide = document.querySelector('.current-slide');

    if (directionForward) {
      slideIndex++;
      const nextSlide = currentSlide?.nextElementSibling;

      currentSlide?.classList.remove('current-slide');
      track.style.transform = 'translateX(-' + slideWidth * slideIndex + 'px)';
      nextSlide?.classList.add('current-slide');
    } else {
      slideIndex--;
      const nextSlide = currentSlide?.previousElementSibling;

      currentSlide?.classList.remove('current-slide');
      track.style.transform = 'translateX(-' + slideWidth * slideIndex + 'px)';
      nextSlide?.classList.add('current-slide');
    }
  }


  LButton?.addEventListener('click', () => {
    moveCarousel(false);
  })

  RButton?.addEventListener('click', () => {
    moveCarousel(true);
  })


  function autoMoveCarousel() {
    if (slideIndex === slides.length - 1) {
      moveCarousel(false);
    } else {
      moveCarousel(true);
    }
  }

  autoSlideIntervalPointer = setInterval(autoMoveCarousel, 3000);
})

onMounted(() => {
  const track = document.querySelector('.carousel-track') as HTMLElement || null;
  track?.classList.add('transitionSpeed')
})

onBeforeUnmount(() => {
  clearInterval(autoSlideIntervalPointer);
})
</script>