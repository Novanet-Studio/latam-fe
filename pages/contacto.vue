<template>
  <main class="contacto">
    <section class="hero">
      <div class="hero__mensaje">
        <div class="hero__mensaje__box">
          <div class="hero__mensaje__icon"></div>
          <div class="hero__mensaje__info">
            <h1 class="hero__mensaje__title">Contáctanos</h1>
            <p class="hero__mensaje__text">
              Si tiene alguna pregunta o necesita información de nuestros
              productos.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="info-b">
      <h2 class="info-b__titulo">Envíanos un mensaje</h2>
      <p class="info-b__texto">
        Si quieres ponerte en contacto con nosotros, por favor déjanos los
        detalles de tu solicitud en nuestro canal de atención al Ciente de
        WhatsApp.
      </p>
    </section>

    <WhatsappBanner />
  </main>
</template>

<script lang="ts" setup>
const config = useAppConfig();
const description =
  "Ponte en contacto con nosotros y déjanos los detalles de tu solicitud en nuestro canal de atención al Ciente en WhatsApp.";

useHead({
  titleTemplate: 'Contáctanos - %s',
  title() {
    return config.pwaManifest.short_name;
  },
  meta: [
    { name: 'description', content: description },
    { name: 'og:title', content: config.pwaManifest.short_name },
    { name: 'og:description', content: description },
  ]
});
</script>
