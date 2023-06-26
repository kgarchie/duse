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

<style scoped lang="scss">
.shop-card {
  .images-container {
    height: 310px;
    width: 310px;
    display: flex;
    align-items: center;
    isolation: isolate;
    position: relative;

    .main-image {
      position: absolute;
      transition: opacity 0.2s ease-in-out;
    }

    &:hover,
    &:focus-within {
      .main-image {
        opacity: 0;
        pointer-events: none;
      }
    }

    .indicator-left,
    .indicator-right {
      position: absolute;
      color: white;
      font-size: xx-large;
      background-color: #bbbbbb;
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      display: grid;
      place-items: center;

      img {
        margin-left: 2px;
        width: 50%;
        height: 50%;
        opacity: 0.5;
      }
    }

    .indicator-left {
      left: 0;
    }

    .indicator-right {
      right: 0;
    }

    .indicator-left:hover,
    .indicator-right:hover {
      cursor: pointer;
      background-color: var(--cooler-white);
    }

    .indicator-left {
      rotate: -180deg;
    }

    ::-webkit-scrollbar {
      display: none;
    }

    .images {
      display: flex;
      overflow-x: scroll;
      overflow-y: hidden;
      align-items: center;
      width: 100%;
      height: 100%;

      div {
        width: inherit;
        height: inherit;

        img {
          width: 310px;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
      }
    }
  }

  .shop-card-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    background-color: #17191c;
    padding: 0.5rem;

    .item-details {
      .name {
        font-size: x-large;
      }

      .price {
        font-size: large;
        color: #bbbbbb;
      }
    }


    .shop-card-buttons {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;


      .shop-card-icon:nth-child(1) {
        margin-left: 15px;
      }

      .shop-card-icon:nth-child(2) {
        margin-left: 10px;
      }

      .shop-card-icon:last-child {
        a {
          padding: 0.5rem 1rem;
          color: white;
          background-color: var(--cooler-twelve);
        }
      }

      .shop-card-icon {
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
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
