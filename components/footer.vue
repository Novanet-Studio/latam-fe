<template>
  <footer class="footer">
    <ul class="footer__rrss">
      <li class="footer__link none">
        <img
          class="footer__fb"
          alt="Facebook logo"
          src="../assets/images/facebook.svg"
        />
      </li>
      <li class="footer__link none">
        <img
          class="footer__icon"
          alt="Twitter logo"
          src="../assets/images/twitter.svg"
        />
      </li>
      <li class="footer__link">
        <a
          class="footer__link-a"
          href="https://latam-be.herokuapp.com/admin/"
          target="_blank"
        >
          <img
            class="footer__icon"
            alt="Panel logo"
            src="../assets/images/login.svg"
          />
        </a>
      </li>
      <li class="footer__link">
        <a
          class="footer__link-a"
          href="https://www.instagram.com/latinamericancable/"
          target="_blank"
        >
          <img
            class="footer__icon"
            alt="Instagram logo"
            src="../assets/images/instagram.svg"
          />
        </a>
      </li>
    </ul>
    <p class="footer__legal">Latin American Cable C.A. - Todos los Derechos Reservados 2022</p>
    <div class="footer__autor">
      <p class="footer__autor__text">Realizado por:</p>
      <a href="https://novanet.studio" target="_blank">
        <img
          class="footer__autor__logo"
          alt="Novanet logo"
          src="../assets/images/novanet-logo.svg"
        />
      </a>
    </div>
  </footer>
</template>

<script>
import "./footer.scss";
</script>
