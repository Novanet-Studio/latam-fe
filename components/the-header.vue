<template>
  <header class="header">
    <div class="header__logo">
      <NuxtLink to="/" target="_self">
        <img
          alt="Latin American Cable Logo"
          src="~/assets/images/latinamericancable-logo.svg"
        />
      </NuxtLink>
    </div>
    <nav class="header__nav">
      <NuxtLink class="header__link" to="/">TV por cable</NuxtLink>
      <NuxtLink class="header__link" to="/internet/">Internet</NuxtLink>
      <NuxtLink class="header__link" to="/reporte-pago/">Reportar pago</NuxtLink>
      <NuxtLink class="header__link" to="/contacto/">Contacto</NuxtLink>
    </nav>
  </header>
</template>
