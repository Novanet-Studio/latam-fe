<template>
  <header class="header" v-cloak>
    <div class="header__logo">
      <img
        alt="Latin American Cable Logo"
        src="../assets/images/latinamericancable-logo.svg"
      />
    </div>
    <nav class="header__nav">
      <g-link class="header__link" to="/">Inicio</g-link>
      <g-link class="header__link" to="/internet/">Internet</g-link>
      <g-link class="header__link" to="/pago/">Reportar pago</g-link>
      <g-link class="header__link" to="/contacto/">Contacto</g-link>
    </nav>
  </header>
</template>

<script lang="scss">
@import './Header.scss';
</script>
