<template>
  <main class="internetvista">
    <Head>
      <Title>{{
        `Internet de alta velocidad - ${$config.pwaManifest.short_name}`
      }}</Title>
      <Meta name="description" content="Internet en fibra óptica de alta velocidad para empresas y hogares." />
      <Meta name="og:title" :content="$config.pwaManifest.short_name" />
      <Meta name="og:description" content="Internet en fibra óptica de alta velocidad para empresas y hogares." />
    </Head>
  </main>
</template>

<script>
import "./internet.scss";

const con = (e) => {
  console.log(e);
};
</script>
