<template>
  <header class="header">
    <div class="header__logo">
      <NuxtLink to="/" target="_self">
        <nuxt-img
          alt="Latin American Cable Logo"
          src="/latinamericancable-logo.svg"
        />
      </NuxtLink>
    </div>
    <nav class="header__nav">
      <!-- <Nuxtlink class="header__link" to="/">TV por cable</Nuxtlink>
      <Nuxtlink class="header__link" to="/internet/">Internet</Nuxtlink>
      <Nuxtlink class="header__link" to="/reporte/">Reportar pago</Nuxtlink>
      <Nuxtlink class="header__link" to="/contacto/">Contacto</Nuxtlink> -->
    </nav>
  </header>
</template>

<script>
export default {};
import "./header.scss";
</script>
