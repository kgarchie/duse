<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object as PropType<any>,
    required: false,
    default: () => ({
      name: 'Name',
      description: 'Description',
      tag: 'White',
      price: 549,
      stock: 10,
      images: [
        '/static/images/mockItem1.webp',
        '/static/images/mockItem2.webp',
        '/static/images/mockItem3.webp',
        '/static/images/mockItem4.webp',
        '/static/images/mockItem5.webp',
      ]
    })
  },
  id: {
    type: Number as PropType<number>,
    required: false,
    default: 1
  }
})

const product = ref<{
  name: string,
  description: string,
  tag: string,
  price: number,
  stock: number,
  images: string[]
}>(props.item)

const id = ref<number>(props.id)

if (!product.value) {
  // fetch product from api
}

const focusedImage = ref(product.value.images[0])

function makeMainImage(image: string) {
  focusedImage.value = image
}

</script>

<template>
  <div class="container">
    <div class="images">
      <div class="other-images">
        <ul>
          <li v-for="image in product.images"><img :src="image" :alt="product.name" @click="makeMainImage(image)"
                                                   :class="{ active: image === focusedImage }"></li>
        </ul>
      </div>
      <div class="main-image">
        <img :src="focusedImage" :alt="product.name">
      </div>
    </div>
    <div class="info">
      <h1 class="name">{{ product.name }}</h1>
      <p class="price">{{ product.price }}</p>
      <p class="description">{{ product.description }}</p>
      <div class="actions">
        <div class="like"><img src="/static/svgs/clear-heart.svg" alt=""></div>
        <div class="cart"><img src="/static/svgs/cart.svg" alt=""></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 750px;
  height: 500px;
  margin: 3em auto;
  max-width: 90vw;
  box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.10);
  display: flex;
  justify-content: space-between;
  outline: 1px solid var(--primary);

  @media screen and (max-width: 1366px){
    scale: 0.8;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    scale: 1;
  }

  .images {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 70%;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      height: 85%;
      width: 100%;
    }

    .main-image {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      @media screen and (max-width: 768px) {
        height: 85%;
        width: 100%;
      }

      img {
        height: 90%;
        aspect-ratio: 3/4;
        object-fit: cover;
        object-position: top;

        @media screen and (max-width: 768px) {
          height: 100%;
          width: 100%;
        }
      }
    }

    .other-images {
      height: 90%;
      overflow-y: scroll;
      position: relative;
      padding: 3px;
      outline: 1px solid var(--primary);

      @media screen and (max-width: 768px) {
        overflow-x: scroll;
        overflow-y: hidden;
        height: 15%;
        width: 100%;
        padding: 1px;

        &::-webkit-scrollbar {
          height: 0;
        }
      }

      &::-webkit-scrollbar {
        width: 0;
      }

      ul {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        @media screen and (max-width: 768px) {
          flex-direction: row;
          margin: auto;
          height: 100%;
        }

        li {
          &:hover {
            opacity: 0.5;
          }

          img {
            width: 100px;
            height: 100px;
            cursor: pointer;
            object-fit: cover;
            object-position: top;

            @media screen and (max-width: 768px) {
              height: 100%;
              width: 70px;
            }

            &.active {

            }
          }
        }
      }
    }
  }

  .info {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    outline: 1px solid var(--primary);
    position: relative;

    @media screen and (max-width: 768px) {
      display: block;
      width: 100%;
      height: 15%;
    }

    .name {
      text-transform: uppercase;
      font-family: Lato, Mulish, sans-serif;
      font-weight: 700;
      line-height: 1;
      font-size: 30px;
      letter-spacing: 0.02em;
      margin-top: 1rem;
      color: var(--accent);

      @media screen and (max-width: 768px) {
        font-size: 1.5rem;
        margin-top: 0;
      }
    }

    .description {
      font-size: 0.8rem;
      margin-top: 1rem;
      outline: 1px solid lighten(#17191CFF, 40);
      padding: 1rem;
      box-shadow: #17191CFF 0 0 5px 0;
      max-height: 300px;
      overflow: scroll;

      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }

      @media screen and (max-width: 768px) {
        margin-top: 0.2rem;
        padding: 0.5em;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 40%;
        height: 60%;
      }
    }

    .price {
      font-weight: 400;
      font-family: Lato, Mulish, sans-serif;
      font-size: 18px;
      margin-top: 0.25rem;
      margin-bottom: 0.2rem;
      color: var(--primary);

      &::before {
        content: 'KES. ';
        font-size: 1rem;
        color: black;
      }
    }

    .actions {
      display: flex;
      width: 100%;
      justify-content: space-around;
      margin-top: auto;
      margin-bottom: 0.1rem;


      @media screen and (max-width: 768px) {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: 0.2rem;
        margin-right: 0.6rem;
        transform: translateY(-50%);
        width: 20%;
        justify-content: space-between;
      }

      .like {
        img {
          width: 50px;

          @media screen and (max-width: 768px) {
            width: 30px;
          }
        }
      }

      .cart {
        img {
          width: 50px;

          @media screen and (max-width: 768px) {
            width: 30px;
          }
        }
      }
    }
  }
}
</style>