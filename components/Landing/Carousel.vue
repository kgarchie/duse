<script setup lang="ts">
onBeforeMount(() => {
  const track = document.querySelector('.carousel-track') as HTMLElement || null;
  const pop_up_carousel = document.querySelector('.pop-up-carousel') as HTMLElement || null;

  if (track && pop_up_carousel){
    const slides = Array.from(track.children);
    const slideWidth = track.getBoundingClientRect().width / slides.length;
    const midIndex = Math.floor(slides.length / 2);

    function stageCarousel() {
      pop_up_carousel.style.width = slideWidth + 'px';
      track.style.transform = 'translateX(-' + slideWidth * midIndex + 'px)';
      slides[midIndex].classList.add('current-slide');
    }

    stageCarousel()
  }
})

onMounted(() => {
  const track = document.querySelector('.carousel-track') as HTMLElement || null;
  track?.classList.add('transitionSpeed')
})
</script>

<template>
  <section class="pop-up-carousel">
    <span class="carousel__button carousel__button--left">
      <img src="static/images/vectors/right-arrow-img.svg" alt="" width="25" height="25">
    </span>
    <div class="carousel__track-container">
      <div class="carousel-track">
        <LandingCard />
      </div>
    </div>
    <span class="carousel__button carousel__button--right">
      <img src="static/images/vectors/right-arrow-img.svg" alt="" width="25" height="25">
    </span>
  </section>
</template>

<style scoped>

</style>