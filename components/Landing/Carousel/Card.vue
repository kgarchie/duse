<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object as PropType<{
      imageUrl: string,
      caption: string,
    }>
  }
})
</script>

<template>
  <div class="carousel-slide">
    <img class="carousel-image" src="/static/images/model1.jpg" alt="">
    <div class="carousel__slide-details">
      <div class="card">
        <div class="card-header">Card Header</div>
        <div class="card-body">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, magni?</p>
          <button>Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.carousel-slide {
  position: relative;
  transition: transform 0.5s ease-in-out;
  overflow: hidden;
  width: 100%;

  .carousel-image {
    display: flex;
    margin: auto;

    max-width: 100vw;
    height: 80vh;
    object-fit: cover;
  }

  .carousel__slide-details {
    position: absolute;
    transform: translateY(-100%);
    width: 100%;
    color: var(--cooler-white);

    .card-screen {
      width: 50%;
      min-width: 300px;
      margin: auto;
      border-radius: 10px;
      padding: 2rem;
      position: absolute;
    }

    .card {
      width: 100%;
      height: 100%;
      min-width: 300px;
      margin: auto;
      border-radius: 10px;
      padding: 2rem;
      background-color: hsl(220, 10%, 10%, 0.5);


      .card-header {
        font-size: larger;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
      }

      .card-body {
        > p:first-child {
          margin-bottom: 0.5rem;
        }

        button {
          display: inline-block;
          border: solid var(--cooler-white);
          padding: 0.5rem 1rem;
          color: var(--primary);
          font-weight: bold;
          background-color: var(--cooler-white);
          cursor: pointer;
          border-radius: 5px;
        }
      }
    }

    .card:hover {
      background-color: var(--primary);
    }
  }

  &:not(.current-slide) {
    transform: scale(0.75);

    transition: transform 0.5s ease-in-out;
  }

  &:not(.current-slide) .carousel__slide-details {
    transform: translateY(0);

    transition: transform 0.5s ease-in-out;
  }

  &:is(.current-slide) .carousel__slide-details {
    transition: transform 0.5s ease-in-out;
  }
}
</style>