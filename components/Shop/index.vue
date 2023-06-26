<script setup lang="ts">

</script>

<template>
  <section class="shop">
    <div class="cards-container">
      <ShopCard/>
      <ShopCard/>
      <ShopCard/>
      <ShopCard/>
      <ShopCard/>
      <ShopCard/>
      <ShopCard/>
      <ShopCard/>
    </div>
  </section>
</template>

<style scoped lang="scss">
.shop {
  overflow-x: hidden;
  background-color: var(--primary);
  width: 100vw;

  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, 310px);
    justify-content: space-around;
    max-width: 1024px;
    margin: 0 auto;
    padding-top: 5rem;
    padding-bottom: 5rem;
    row-gap: 4rem;
    column-gap: 2rem;

    &:after {
      content: "";
      flex: auto;
    }
  }
}
</style>