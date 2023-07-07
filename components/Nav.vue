<template>
  <nav class="top-nav">
    <div class="start">
      <NuxtLink to="/"><img src="/static/svgs/clothing.svg" alt=""></NuxtLink>
      <span class="user-location"></span>
    </div>
    <div class="center">
      <span class="search">
        <span><img src="/static/svgs/search_line.svg" alt=""></span>
        <input type="text" placeholder="Search">
      </span>
    </div>
    <div class="menu inactive" ref="menu">
      <div class="icons-container">
        <div class="icons">
          <NuxtLink class="heart" to="/shop/liked" @click="toggleHam"><img src="/static/svgs/clear-heart.svg" alt=""></NuxtLink>
          <NuxtLink class="cart" to="/shop/cart" @click="toggleHam"><img src="/static/svgs/cart.svg" alt=""></NuxtLink>
          <ClientOnly>
            <Transition name="login_buttons" mode="out-in">
              <a class="logout" v-if="user?.email" @click.prevent="logout" @click="toggleHam"><img src="/static/svgs/logout.svg"
                                                                                alt=""></a>
              <NuxtLink class="login" to="/auth/login" @click="toggleHam" v-else><img src="/static/svgs/login.svg" alt=""></NuxtLink>
            </Transition>
          </ClientOnly>
        </div>
        <div class="ham" @click="toggleHam" ref="ham">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
      </div>
      <div class="nav-link-container">
        <ul class="nav-links">
          <li class="navlink">
            <NuxtLink href="">New</NuxtLink>
          </li>
          <li class="navlink">
            <NuxtLink href="">Gallery</NuxtLink>
          </li>
          <li class="navlink">
            <NuxtLink href="">Jewellery</NuxtLink>
          </li>
          <li class="navlink">
            <NuxtLink href="">Collections</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const user = useUser();
const ham = ref<HTMLElement | null>(null)
const menu = ref<HTMLElement | null>(null)

async function logout() {
  const {data: res} = await useFetch('/api/auth/logout', {
    method: 'GET',
    headers: {
      'bearer': user?.value?.token || ''
    }
  })

  const response = res.value

  if (response.statusCode === 200) {
    user.value = null
  } else {
    alert(response.body)
  }
}

function toggleHam() {
  ham.value?.classList.toggle("active")
  menu.value?.classList.toggle("inactive")
}

</script>
<style scoped lang="scss">
$transition-speed: 0.4s;

.top-nav {
  display: flex;
  width: 100vw;
  max-width: 100%;
  justify-content: space-between;
  align-items: center;
  color: white;
  position: relative;
  padding: 0.5rem 2rem;
  z-index: 20;

  background-color: var(--primary);

  > .start {
    img {
      width: 50px;
      height: 50px;
    }
  }

  > .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    .search {
      --height: 2.8rem;
      display: flex;
      align-items: center;
      height: var(--height);


      span {
        background-color: var(--cooler-white);
        height: var(--height);
        width: var(--height);
        display: grid;
        place-items: center;

        img {
          width: 25px;
          height: 25px;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
      }

      input {
        height: var(--height);
        width: 40vw;
        border: none;
        font-size: 0.8rem;
        padding-left: 0.5rem;
        outline: none;

        transition: display 1s ease-in-out;
      }

      input:focus {
        outline: none;
      }

      input:focus::placeholder {
        visibility: hidden;
      }
    }
  }

  .menu {
    .icons-container {
      .icons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;

        a {
          img {
            width: 30px;
            height: 30px;
          }
        }

        .heart,
        .cart {
          transition: scale 0.2s ease;

          &:hover {
            cursor: pointer;
            scale: 1.1;
          }
        }
      }
    }

    .nav-link-container {
      position: absolute;
      left: 0;
      width: 100vw;
      margin-top: 1.2rem;
      color: var(--primary);
      font-size: large;
      display: grid;
      place-items: center;
      background-color: var(--cooler-white);
      padding-top: 0.1rem;
      padding-bottom: 0.1rem;

      .nav-links {
        display: flex;
        justify-content: space-around;
        padding: 0.25rem;
        gap: 1rem;
        width: 25vw;
      }
    }
  }
}

// has to be placed here to work well - perhaps due to specificity issues
.ham {
  display: none;
}


@media screen and (max-width: 768px) {
  .top-nav {
    padding-left: 1rem;
    padding-right: 1rem;

    .menu {
      .icons {
        position: absolute;
        top: 10vh;
        left: 50%;
        margin-top: 10px;
        transform: translateX(-50%);

        display: flex;
        width: fit-content;

        z-index: 20;

        transition: top ease-in-out $transition-speed;

        a {
          background-color: var(--primary);
          width: 100%;
          padding: 1rem;
          border-radius: 10px;

          img {
            width: 50px !important;
            height: 50px !important;
          }
        }
      }

      .ham {
        display: flex;
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        flex-direction: column;
        width: 30px;
        height: 30px;
        justify-content: space-around;
        align-items: center;


        z-index: 10;


        .line {
          width: 30px;
          height: 2px;
          background-color: var(--accent);
        }
      }

      .ham.active .line:first-child {
        transform: rotate(45deg);
        position: absolute;

        transition: transform 0.2s ease-in-out;
      }

      .ham.active .line:nth-child(2) {
        visibility: hidden;
      }

      .ham.active .line:last-child {
        transform: rotate(-45deg);
        position: absolute;

        transition: transform 0.2s ease-in-out;
      }

      .ham .line {
        transition: 0.1s ease-in-out;
      }

      .nav-link-container {
        top: 2.3rem;
        margin-top: 2rem;
        padding-top: 15vh;
        padding-bottom: 2rem;
        height: 55vh;
        z-index: 10;
        box-shadow: 0 10px 20px -10px rgba(100, 100, 100, 0.75);
        background-color: rgba(223, 32, 143, 0.9);
        backdrop-filter: blur(100px);

        transition: top ease-in-out $transition-speed;

        .nav-links {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          gap: 1rem;
          height: 30vh;
          width: 100%;
          margin-top: 1rem;

          .navlink {
            width: 50%;
            a {
              color: var(--primary);
              width: 100%;
              padding: 0.5rem 0.8rem;
              display: block;
              text-align: center;
              border: 1px solid var(--primary);
            }
          }
        }
      }
    }

    .menu.inactive {
      .icons {
        top: -8rem;

        transition: top ease-in-out $transition-speed;
      }

      .nav-link-container {
        top: -65vh;

        transition: top ease-in-out $transition-speed;
      }
    }
  }
}

@keyframes bounce {
  0% {
    scale: 0;
  }

  25% {
    scale: 0.4;
  }

  50% {
    scale: 0.8;
  }

  75% {
    scale: 1.2;
  }

  100% {
    scale: 1;
  }
}

.login_buttons-enter-active {
  animation: bounce 0.2s ease-in-out;
}

.login_buttons-leave-active {
  animation: bounce 0.2s ease-in-out reverse;
}

.logout {
  scale: 0.9;
  transition: scale 0.2ms ease;

  &:hover {
    scale: 1;
    cursor: pointer;
  }
}

.login {
  &:hover {
    cursor: pointer;
  }
}
</style>