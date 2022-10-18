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
      <NuxtLink class="header__link" to="/">TV por cable</NuxtLink>
      <NuxtLink class="header__link" to="/internet">Internet</NuxtLink>
      <NuxtLink class="header__link" to="/reporte/">Reportar pago</NuxtLink>
      <!--<NuxtLink class="header__link" to="/contacto/">Contacto</NuxtLink> -->
    </nav>
  </header>
</template>

<script>
export default {};
import "./header.scss";
</script>
