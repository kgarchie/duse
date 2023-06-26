<script setup lang="ts">
import {APIResponse, UserCookie, UserState} from "~/types";
const bearer = useCookie<UserCookie>('bearer')

const user = useUser()
const password1 = ref('');
const password2 = ref('');
const email = ref('');
const phone = ref('');
const name = ref('');

async function submit() {
  if (password2.value === '' || email.value === '') {
    alert('Please fill in all fields');
    return;
  }

  const data = {
    email: email.value,
    password: password2.value,
    phone: phone.value,
    name: name.value,
    user_id: user.value?.user_id || ''
  }

  const {data: res} = await useFetch('/api/auth/register', {
    method: 'POST',
    headers:{
      bearer: user?.value?.bearer || ''
    },
    body: data
  })

  const response = res.value as APIResponse

  if(response.statusCode === 200) {
    const userState = response.body as UserState

    user.value = userState
    bearer.value = {bearer: userState.bearer}
    await navigateTo('/')
  } else {
    alert(response.body)
    window.location.reload()
  }
}


watch([password1, password2], () => {
  if (password2.value && password1.value !== password2.value) {
    document.querySelector('.warning')?.classList.add('show')
  } else {
    document.querySelector('.warning')?.classList.remove('show')
  }
})
</script>

<template>
  <form>
    <div class="form-input">
      <label for="name">Username(Optional)</label>
      <input type="name" id="name" placeholder="👤" v-model="name"/>
    </div>
    <div class="form-input">
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="@" v-model="email"/>
    </div>
    <div class="form-input">
      <label for="password">Password</label>
      <input type="password" id="password1" placeholder="🤐" v-model="password1"/>
    </div>
    <div class="form-input">
      <label for="password">Password Again</label>
      <input type="password" id="password2" placeholder="🙄" v-model="password2"/>
      <small class="help warning">Passwords do not match</small>
    </div>
    <div class="form-input" style="margin-top: -10px">
      <label for="phone">Phone Number(Optional)</label>
      <input type="tel" id="phone" placeholder="🤙" v-model="phone"/>
    </div>
    <div class="form-buttons">
      <button type="button" @click="submit">Sign Up</button>
    </div>
    <small>Already have an account?
      <NuxtLink to="/auth/login">Login</NuxtLink>
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

    .warning{
      color: red;
      font-size: 0.8rem;
      opacity: 0;

      &.show{
        opacity: 1;
      }
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