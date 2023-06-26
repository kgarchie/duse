<script setup lang="ts">

</script>

<template>
  <section class="feedback">
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

<style scoped lang="scss">

.action-buttons {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
}

.action-buttons button {
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
}

.duse {
  background-color: var(--cooler-white);
  color: #005F73;
  border: 1px solid #0A9396;
}

.shop-now {
  color: var(--cooler-white);
  background-color: var(--accent);
  border: 1px solid var(--accent);
}

.feedback {
  padding: 5vh 0;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: grid;
  place-items: center;
  background-color: var(--cooler-white);
}


.form-div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.email-div .form > * {
  margin-top: 1.5rem;
}

.email-div {
  width: 50%;

  @media screen and (max-width: 768px) {
    width: 80%;
  }
}

.form input,
.form textarea {
  padding: 0.7rem 1rem;
  border-radius: 0;
  border: 1px solid var(--primary);
  font-family: inherit;
}

.form input:focus,
.form textarea:focus {
  outline: none;
}

.form input:focus::placeholder {
  visibility: hidden;
}

</style>