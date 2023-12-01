<template>
  <main class="internetvista">
    <section class="hero">
      <div class="hero__internet">
        <div class="hero__internet__box">
          <div class="hero__internet__icon"></div>
          <div class="hero__internet__info">
            <h1 class="hero__internet__title">
              Redirigiendo a portal del cliente
            </h1>
            <p class="hero__internet__text">
              Conexión en fibra óptica de alta velocidad para uso corporativo y
              residencial.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
navigateTo("http://190.216.243.210:8822/", { external: true, replace: true });
</script>
