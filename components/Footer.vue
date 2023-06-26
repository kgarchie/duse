<script setup lang="ts">

</script>

<template>
  <footer class="footer">
    <div class="custom-container">
      <div class="row">
        <div class="footer-col">
          <h4>company</h4>
          <ul>
            <li><a href="/">about us</a></li>
            <li><a href="/">our services</a></li>
            <li><a href="/about/">privacy policy</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>get help</h4>
          <ul>
            <li><a href="/about/">FAQ</a></li>
            <li><a href="https://github.com/kgarchie/duse" target="_blank">Source Code</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>online shop</h4>
          <ul>
            <li><a href="/cs/">watch</a></li>
            <li><a href="/cs/">bag</a></li>
            <li><a href="/cs/">shoes</a></li>
            <li><a href="/cs/">pants</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>follow us</h4>
          <div class="social-links">
            <a href="https://www.facebook.com/kreezy.genie/" target="_blank"><i
                class="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com/allan_archie" target="_blank"><i class="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com/jinn.allan/" target="_blank"><i
                class="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com/in/allan-bosire-13b066180/" target="_blank"><i
                class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">

.footer {
  min-height: 250px;
  color: aliceblue;
  background-color: hsl(220, 10%, 10%);
  padding: 70px 0;
  width: 100vw;
}

.custom-container {
  max-width: 1170px;
  margin: auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
  row-gap: 2rem;
}

ul {
  list-style: none;
}

.footer-col {
  padding: 0 15px;

  @media screen and (min-width: 768px) {
    width: 25%;
  }
}

.footer-col h4 {
  font-size: 18px;
  color: #ffffff;
  text-transform: capitalize;
  margin-bottom: 35px;
  font-weight: 500;
  position: relative;
}

.footer-col h4::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  background-color: #e91e63;
  height: 2px;
  box-sizing: border-box;
  width: 50px;
}

.footer-col ul li:not(:last-child) {
  margin-bottom: 10px;
}

.footer-col ul li a {
  font-size: 16px;
  text-transform: capitalize;
  text-decoration: none;
  font-weight: 300;
  color: #bbbbbb;
  display: block;
  transition: all 0.3s ease;
}

.footer-col ul li a:hover {
  color: #ffffff;
  padding-left: 8px;
}

.footer .social-links{
  display: flex;
}

.footer-col .social-links a {
  display: inline-block;
  height: 40px;
  width: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 10px 10px 0;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  color: #ffffff;
  transition: all 0.5s ease;
}

.footer-col .social-links a:hover {
  color: #24262b;
  background-color: #ffffff;
}
</style>