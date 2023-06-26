<script setup lang="ts">
import {APIResponse} from "~/types";

const email = ref('');

async function submit() {
  if (email.value === '') {
    alert('Please fill in all fields');
    return;
  }


  const data = {
    email: email.value,
    token: ""
  }

  const {data: res} = await useFetch('/api/auth/reset', {
    method: 'POST',
    body: data
  })

  const response = res.value as APIResponse

  if(response.statusCode === 200) return

  alert(response.body)
}
</script>

<template>
  <form>
    <div class="form-input">
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="🤕" v-model="email"/>
    </div>
    <div class="form-buttons">
      <button type="button" @click="submit">Send Password Reset Mail</button>
    </div>
    <small>Don't have an account?
      <NuxtLink to="/auth/register">Register</NuxtLink>
    </small>
    <small>Remembered Password?
      <NuxtLink to="/auth/login">Login</NuxtLink>
    </small>
  </form>
</template>

<style scoped>

</style>