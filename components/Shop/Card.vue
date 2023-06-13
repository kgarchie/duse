<script setup lang="ts">
let images: Element | null = null
let scrollPosition = 0
let imageSize = 0
const context = getCurrentInstance()

function getClosestImage() {
  images = context?.vnode.el?.querySelector('.images')
  if (!images) return 0
  imageSize = images!.querySelectorAll('img')[0].getBoundingClientRect().width

  scrollPosition = images.scrollLeft

  return Math.floor(scrollPosition / imageSize) * imageSize
}


function scrollLeft() {
  const closestImage = getClosestImage()
  if (!images) return

  if (closestImage !== scrollPosition) {
    images.scrollTo({
      left: closestImage,
      behavior: 'smooth'
    });
    return;
  }

  images.scrollTo({
    left: closestImage - imageSize,
    behavior: 'smooth'
  })
}

function scrollRight() {
  const closestImage = getClosestImage()
  if (!images) return

  if (closestImage !== scrollPosition) {
    images.scrollTo({
      left: closestImage + imageSize,
      behavior: 'smooth'
    })
    return;
  }

  images.scrollTo({
    left: closestImage + imageSize,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div class="shop-card">
    <div class="images-container">
      <span class="indicator-left" @click="scrollLeft"><img src="/static/images/vectors/right-arrow-img.svg"
                                                            alt="<"></span>

      <span class="indicator-right" @click="scrollRight"><img src="/static/images/vectors/right-arrow-img.svg" alt="<"></span>
      <div class="images">
        <div>
          <img src="/static/images/mockItem2.webp" alt="" class="main-image">
        </div>
        <div>
          <img src="/static/images/mockItem3.webp" alt="">
        </div>
        <div>
          <img src="/static/images/mockItem4.webp" alt="">
        </div>
        <div>
          <img src="/static/images/mockItem5.webp" alt="">
        </div>
      </div>
    </div>

    <div class="shop-card-details">
      <div class="item-details">
        <div class="name"><a href="">Clothing</a></div>
        <div class="price">KES 5,000</div>
      </div>

      <div class="shop-card-buttons">
        <div class="shop-card-icon">
          <img src="/static/svgs/light-cart.svg" alt="">
        </div>
        <div class="shop-card-icon">
          <img src="/static/svgs/light-heart.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>