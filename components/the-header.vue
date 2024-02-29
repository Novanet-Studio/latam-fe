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
      <a class="header__link" href="https://190.216.243.210:8822/cliente/login" target="_blank">Reportar pago</a>
      <NuxtLink class="header__link" to="/contacto/">Contacto</NuxtLink>
    </nav>
  </header>
</template>
