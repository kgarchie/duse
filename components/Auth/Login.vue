<script setup lang="ts">
import {APIResponse, UserCookie, UserState} from "~/types";

const user = useUser()
const bearer = useCookie<UserCookie>('bearer')

const password = ref('');
const email = ref('');


async function submit() {
  if (password.value === '' || email.value === '') {
    alert('Please fill in all fields');
    return;
  }

  const data = {
    email: email.value,
    password: password.value
  }

  const {data: res} = await useFetch('/api/auth/login', {
    method: 'POST',
    headers: {
      bearer: user?.value?.token || ''
    },
    body: data
  })

  const response = res.value as APIResponse

  if (response.statusCode === 200) {
    const userState = response.body as UserState

    user.value = userState
    bearer.value = {bearer: userState.token}

    await navigateTo('/')
  } else {
    alert(response.body)
  }
}
</script>

<template>
  <form>
    <div class="form-input">
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="@" v-model="email"/>
    </div>
    <div class="form-input">
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="¯\_(ツ)_/¯" v-model="password"/>
      <small>Forgot password?
        <NuxtLink to="/auth/reset">Reset</NuxtLink>
      </small>
    </div>
    <div class="form-buttons">
      <button type="button" @click="submit">Login</button>
    </div>
    <small>Don't have an account?
      <NuxtLink to="/auth/register">Register</NuxtLink>
    </small>
  </form>
</template>

<style scoped lang="scss">
form {
  height: 400px;
  width: 500px;
  max-width: 90%;
  max-height: 90%;
  margin: auto;

  small {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: #666;

    a {
      color: var(--accent);
      text-decoration: underline;

      &:hover {
        color: var(--primary);
      }
    }
  }

  .form-input {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;

    label {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }

    input {
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;

      &:focus {
        outline: none;
        border: 1px solid var(--accent);
      }
    }

    small {
      align-self: flex-end;
    }
  }

  .form-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;

    button {
      padding: 0.5rem 1rem;
      border: none;
      background-color: var(--accent);
      color: var(--cooler-white);
      font-size: 1.2rem;
      cursor: pointer;

      &:hover {
        background-color: var(--primary);
      }
    }
  }
}
</style>