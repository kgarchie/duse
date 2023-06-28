<script setup lang="ts">
import {integer} from "vscode-languageserver-types";

const liked = ref(false)
const quantity = ref(1)

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete', 'setQuantity'])

function deleteItem() {
  emit('delete')
}

function updateQuantity() {
  emit('setQuantity', quantity.value)
}

function editQuantity(e: integer) {
  quantity.value = e
  updateQuantity()
}

</script>

<template>
  <div class="item">
    <div class="buttons">
      <span class="delete-btn" @click="deleteItem"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="96px" height="96px">
    <path fill="#df208f" class="primary"
          d="M42,37c0,2.762-2.238,5-5,5H11c-2.762,0-5-2.238-5-5V11c0-2.762,2.238-5,5-5h26c2.762,0,5,2.238,5,5V37z"/>
    <path fill="#FFEBEE" class="secondary" d="M21.914 12.065H25.914V36.107H21.914z"
          transform="rotate(-134.999 23.914 24.086)"/>
    <path fill="#FFEBEE" class="secondary" d="M22.064 11.726H26.064V35.897H22.064z"
          transform="rotate(134.999 24.064 23.812)"/>
</svg>
      </span>
    </div>

    <div class="image">
      <img :src="item.image" alt=""/>
    </div>

    <div class="description">
      <span>Common Projects</span>
      <span>Bball High</span>
      <span>White</span>
    </div>

    <div class="quantity">
      <button class="minus-btn" type="button" name="button" @click="editQuantity(quantity - 1)">
        <img src="/static/svgs/minus.svg" alt=""/>
      </button>
      <input type="number" name="name" v-model="quantity" @change="updateQuantity">
      <button class="plus-btn" type="button" name="button" @click="editQuantity(quantity + 1)">
        <img src="/static/svgs/plus.svg" alt="+"/>
      </button>
    </div>

    <div class="total-price"><span class="price">$549</span></div>
    <div class="buttons">
      <Transition name="like_buttons" mode="out-in">
        <span class="like-btn" v-if="!liked"><img src="/static/svgs/clear-heart.svg" alt="💗" @click="liked = !liked"></span>
        <span class="like-btn" v-else><img src="/static/svgs/heart.svg" alt="❤️" @click="liked = !liked"></span>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  height: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding-right: 1.5rem;
  padding-left: 0.5rem;

  border-top: 1px solid lighten(#df208f, 40%);

  transition: background 0.2s ease-in-out;

  &:first-child {
    border-top: none;
  }

  input {
    transition: background 0.2s ease-in-out;
  }

  > * {
    display: flex;
    align-items: center;
  }

  &:hover {
    background: lighten(#df208f, 40%);
    cursor: pointer;
    transition: background 0.1s ease-in-out;

    input {
      background: lighten(#df208f, 40%);

      transition: background 0.1s ease-in-out;

      &:hover,
      &:focus {
        background: var(--cooler-white);
      }
    }

    .image {
      background: lighten(#df208f, 40%);

      transition: background 0.1s ease-in-out;
    }
  }

  .buttons {
    .delete-btn,
    .like-btn {
      cursor: pointer;
      background-color: transparent;
      position: relative;
      width: 30px;
      height: 30px;

      svg,
      img {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }

    .like-btn img{
      transform: scale(0.9);
      transition: transform 0.2s ease-in-out;

      &:hover {
        transform: scale(1);

        transition: transform 0.1s ease-in-out;
      }
    }

    .delete-btn {
      svg {
        path {
          transition: fill 0.2s ease-in-out;
        }

        &:hover {
          path {
            transition: fill 0.05s ease-in-out;

            &.primary {
              fill: var(--cooler-white);
            }

            &.secondary {
              fill: var(--accent);
            }
          }
        }
      }
    }
  }
}

.image {
  background-color: white;
  width: 150px;

  transition: background 0.2s ease-in-out;

  img {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    object-position: 0 10%;
    mix-blend-mode: multiply;

    border-radius: 5px;
  }
}

.description {
  width: 200px;
  overflow: hidden;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}

.description span {
  display: block;
  font-size: 1em;
  color: #43484D;
  font-weight: 400;
}

.description span:first-child {
  margin-bottom: 5px;
}

.description span:last-child {
  font-weight: 300;
  margin-top: 8px;
  color: #86939E;
}

.quantity {
  margin-right: 60px;
}

.quantity input {
  -webkit-appearance: none;
  border: none;
  text-align: center;
  width: 29px;
  height: 29px;
  font-size: 1em;
  color: var(--primary);
  font-weight: 300;
  border-radius: 6px;
}

button[class*=btn] {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #E1E8EE;
  }
}

.minus-btn img {
  margin-bottom: 3px;
}

.plus-btn img {
  margin-top: 2px;
}

button:focus,
input:focus {
  outline: 0;
}

.total-price {
  width: 83px;
  text-align: center;
  font-size: 1em;
  color: #43484D;
  font-weight: 300;
}

@media (max-width: 768px) {
  .item {
    height: auto;
    margin: auto;
    flex-wrap: wrap;
    justify-content: center;
    padding: 2rem 0.5rem;
    position: relative;
  }
  .image,
  .total-price,
  .description {
    width: 100%;

    .price{
      font-size: 1.1em;
    }
  }

  .quantity,
  .buttons {
    position: absolute;

    &:first-child {
      top: 0.2rem;
      left: 0.35rem;
    }

    &:last-child {
      bottom: 2rem;
      right: 0.5rem;
    }
  }

  .quantity{
    top: 0.065rem;
    right: 0;
    margin-right: 0.45rem;
  }
}
</style>