<script setup lang="ts">

</script>

<template>
  <section class="feedback">
    <h1>Get your custom fit</h1>
    <div class="email-div">
      <div class="form">
        <div class="form-div">
          <label for="email" class="form-input-label">Your Email:</label>
          <input type="text" placeholder="someone@domain.com" id="email">
        </div>
        <div class="form-div">
          <label for="message" class="form-input-label">Your Message:</label>
          <textarea name="message" id="message" cols="30" rows="10"
                    placeholder="Write your message here 😁"></textarea>
        </div>
      </div>

      <div class="action-buttons">
        <button class="shop-now">Send Email</button>
        or
        <button class="duse">WhatsApp</button>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>