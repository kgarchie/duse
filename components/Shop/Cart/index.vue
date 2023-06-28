<script setup lang="ts">
const items = ref<any>([
  {
    name: 'Common Projects',
    description: 'Bball High',
    tag: 'White',
    price: 549,
    quantity: 1,
    image: '/static/images/mockItem2.webp',
  },
  {
    name: 'Common Projects',
    description: 'Bball High',
    tag: 'White',
    price: 549,
    quantity: 1,
    image: '/static/images/mockItem2.webp',
  },
  {
    name: 'Common Projects',
    description: 'Bball High',
    tag: 'White',
    price: 549,
    quantity: 1,
    image: '/static/images/mockItem2.webp',
  },
  {
    name: 'Common Projects',
    description: 'Bball High',
    tag: 'White',
    price: 549,
    quantity: 1,
    image: '/static/images/mockItem2.webp',
  },
  {
    name: 'Common Projects',
    description: 'Bball High',
    tag: 'White',
    price: 549,
    quantity: 1,
    image: '/static/images/mockItem2.webp',
  }
])

items.value.forEach((item: any, index: number) => {
  item.id = index
})
const lastKey = items.value.length
function deleteItem(item: any) {
  const index = items.value.indexOf(item)
  if (index > -1) items.value.splice(index, 1)
}

function setQuantity(item: any, quantity: number) {
  item.quantity = quantity
  console.log(item)
}
</script>

<template>
  <div class="shopping-cart">
    <div class="title">
      <p>
        Shopping Cart
      </p>
      <img src="/static/svgs/checkout.svg" alt="">
    </div>
    <div class="items">
      <TransitionGroup name="item_list">
        <ShopCartItem v-for="item in items" :key="item.id" :item="item" @delete="deleteItem(item)"
                      @setQuantity="setQuantity(item, $event)"/>
        <div class="checkout-button" :key="lastKey">
          <button>Checkout</button>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped lang="scss">
.shopping-cart {
  width: 750px;
  height: auto;
  margin: 3em auto;
  max-width: 90vw;
  box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.10);
  display: flex;
  flex-direction: column;

  .title {
    display: flex;
    color: var(--primary);
    background: var(--cooler-white);
    border-bottom: 1px solid #E1E8EE;
    justify-content: space-between;
    align-items: center;

    p {
      height: 3.75em;
      padding: 1.25em 0.5em 1.25em 1rem;
      font-size: 1.125em;
      font-weight: 400;
      text-align: right;
    }

    img {
      margin-right: 1rem;
      height: 2.5em;

      &:hover {
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: 768px) {
    margin: 2em auto;
  }

  .items {
    .item_list-move,
    .item_list-enter-active,
    .item_list-leave-active {
      transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }

    .item_list-enter-from,
    .item_list-leave-to {
      opacity: 0;
      transform: scaleY(0.01);
    }

    .item_list-leave-active {
      position: absolute;
    }

    .checkout-button {
      border-top: 2px solid #E1E8EE;
      display: flex;
      justify-content: flex-end;
      padding: 1.5em 1.5em 1.5em 0;

      transition: all 0.2s ease-in-out;

      button {
        width: 8em;
        height: 2.5em;
        background: var(--primary);
        border: none;
        border-radius: 0.25em;
        color: var(--cooler-white);
        font-size: 1.1em;
        font-weight: 400;
        transition: background 0.2s ease-in-out;

        &:hover {
          cursor: pointer;
          background: var(--primary-hover);
          transition: background 0.2s ease-in-out;
        }
      }
  }

    @media screen and (max-width: 768px) {
      padding: 1.5em 1.5em 1.5em 0;
      justify-content: center;
    }
  }
}
</style>