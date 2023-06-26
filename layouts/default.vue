<script setup lang="ts">
</script>
<template>
  <div id="wrapper">
    <Nav/>
    <main>
      <slot></slot>
    </main>
    <Footer/>
  </div>
</template>
<style scoped>
#wrapper{
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  min-height: 100dvh;
}
</style>