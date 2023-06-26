<template>
  <section class="pop-up-carousel" ref="popUpCarousel">
    <span class="carousel__button carousel__button--left" @click="moveCarouselBackward">
      <img src="/static/images/vectors/right-arrow-img.svg" alt="" width="25" height="25">
    </span>
    <div class="carousel__track-container">
      <div class="carousel-track" style="visibility: hidden" ref="carouselTrack">
        <LandingCard/>
        <LandingCard/>
        <LandingCard/>
        <LandingCard/>
        <LandingCard/>
      </div>
    </div>
    <span class="carousel__button carousel__button--right" @click="moveCarouselForward">
      <img src="/static/images/vectors/right-arrow-img.svg" alt="" width="25" height="25">
    </span>
  </section>
</template>

<style scoped>
.transitionSpeed {
  transition: transform 0.5s ease-in-out;
}

.pop-up-carousel {
  margin: 0 auto;

  .carousel__button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    background-color: var(--cooler-white);
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    z-index: 5;
    opacity: 0.5;

    backdrop-filter: blur(10px);
  }

  .carousel__button > img {
    opacity: 0.5;
  }

  .carousel__button:is(:hover, :focus) > img {
    opacity: 1;
  }

  .carousel__button--left {
    left: 10px;
    transform: rotate(180deg) translateY(50%);
  }

  .carousel__button--right {
    right: 10px;
  }

  .carousel__track-container {
    position: absolute;
    height: 100%;
    width: 100%;

    .carousel-track {
      position: absolute;
      width: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
}
</style>

<script setup lang="ts">
const carouselTrack = ref<HTMLElement | null>(null);
const popUpCarousel = ref<HTMLElement | null>(null);

const slides = computed(() => Array.from(carouselTrack.value?.children || []));
const activeIndex = ref<number | null>(null);
const slideWidth = ref(slides.value[0]?.clientWidth || 0)

let directionForward: boolean = true;
let autoSlideIntervalPointer: any = null;

function pauseCarousel() {
  clearInterval(autoSlideIntervalPointer);
  autoSlideIntervalPointer = null;
}

function moveCarousel(directionForward: boolean) {
  const nextSlideIndex = directionForward ? activeIndex.value! + 1 : activeIndex.value! - 1;
  if (nextSlideIndex < 0 || nextSlideIndex >= slides.value.length) return

  slides.value[activeIndex.value!].classList.remove('current-slide');
  carouselTrack.value!.style.transform = 'translateX(-' + ((slideWidth.value * nextSlideIndex) + (slideWidth.value / 2)) + 'px)';
  slides.value[nextSlideIndex].classList.add('current-slide');

  activeIndex.value = nextSlideIndex;
}

function moveCarouselBackward() {
  directionForward = false;
  pauseCarousel();
  moveCarousel(directionForward);
}

function moveCarouselForward() {
  directionForward = true;
  pauseCarousel();
  moveCarousel(directionForward);
}

function configureCarousel() {
  slideWidth.value = slides.value[0]?.clientWidth || 0;
  activeIndex.value = activeIndex.value ? activeIndex.value : Math.floor(slides.value.length / 2);
  carouselTrack.value!.style.transform = 'translateX(-' + ((slideWidth.value * activeIndex.value) + (slideWidth.value / 2)) + 'px)';
  slides.value[activeIndex.value].classList.add('current-slide');
  carouselTrack.value!.style.visibility = 'visible';
}

function autoMoveCarousel() {
  if (activeIndex.value! >= slides.value.length - 1) {
    directionForward = false;
  } else if (activeIndex.value === 0) {
    directionForward = true;
  }
  moveCarousel(directionForward);
}

function startCarousel() {
  configureCarousel();
  autoSlideIntervalPointer = setInterval(autoMoveCarousel, 3000);

  const slideDetails = document?.querySelectorAll('.carousel__slide-details') as NodeListOf<HTMLElement> || null;

  slideDetails?.forEach((slideDetail) => {
    slideDetail.addEventListener('mouseenter', () => {
      pauseCarousel();
    })
    slideDetail.addEventListener('mouseleave', () => {
      if (autoSlideIntervalPointer) return;
      autoSlideIntervalPointer = setInterval(autoMoveCarousel, 3000);
    })
  })

  window.addEventListener('resize', () => {
    configureCarousel();
  })

  popUpCarousel.value!.addEventListener('mouseleave', () => {
    if (autoSlideIntervalPointer) return;
    autoSlideIntervalPointer = setInterval(autoMoveCarousel, 3000);
  })

  setTimeout(() => {
    carouselTrack.value!.classList.add('transitionSpeed')
  }, 0);
}

onMounted(() => {
  // Temporary fix for carousel not working on rerender
  setTimeout(() => {
    startCarousel();
  }, 100);
})

onUnmounted(() => {
  pauseCarousel()
  window.removeEventListener('resize', () => {
    configureCarousel()
  })
})
</script>