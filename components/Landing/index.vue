<script setup lang="ts">
</script>
<template>
  <section class="landing">
      <LandingCarousel/>
  </section>
</template>
<style scoped lang="scss">
.landing {
  height: 80vh;
  display: flex;
  overflow: hidden;
  position: relative;
  margin-top: 3rem;
  margin-bottom: 3rem;

  @media screen and (max-width: 768px) {
    margin-top: 1.8rem;
    margin-bottom: 2rem;
  }
}
</style>