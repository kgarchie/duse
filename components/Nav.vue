<template>
  <nav class="top-nav">
    <div class="start">
      <NuxtLink href=""><img src="static/svgs/clothing.svg" alt=""></NuxtLink>
      <span class="user-location"></span>
    </div>
    <div class="center">
            <span class="search">
                <span><img src="static/svgs/search_line.svg" alt=""></span>
                <input type="text" placeholder="Search">
            </span>
    </div>
    <div class="menu inactive">
      <div class="icons-container">
        <div class="icons">
          <NuxtLink class="login"><img src="static/svgs/login.svg" alt=""></NuxtLink>
          <NuxtLink class="heart"><img src="static/svgs/heart.svg" alt=""></NuxtLink>
          <NuxtLink class="cart"><img src="static/svgs/cart.svg" alt=""></NuxtLink>
        </div>
        <div class="ham">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
      </div>
      <div class="nav-link-container">
        <ul class="nav-links">
          <li class="navlink"><NuxtLink href="">New</NuxtLink></li>
          <li class="navlink"><NuxtLink href="">Gallery</NuxtLink></li>
          <li class="navlink"><NuxtLink href="">Jewellery</NuxtLink></li>
          <li class="navlink"><NuxtLink href="">Collections</NuxtLink></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>
<script setup>
onBeforeMount(()=> {
  const menu = document.querySelector('.menu');
  const ham = document.querySelector('.ham');
})
</script>