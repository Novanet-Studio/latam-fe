<template>
  <main class="contacto">
    <Head>
      <Title>{{
        `Contáctanos - ${$config.pwaManifest.short_name}`
      }}</Title>
      <Meta name="description" :content="description" />
      <Meta name="og:title" :content="$config.pwaManifest.short_name" />
      <Meta name="og:description" :content="description" />
    </Head>

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

<script setup>
import "./contacto.scss";

const description =
  "Ponte en contacto con nosotros y déjanos los detalles de tu solicitud en nuestro canal de atención al Ciente en WhatsApp.";
</script>
