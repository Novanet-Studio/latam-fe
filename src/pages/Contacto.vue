<template>
  <Layout>
    <main class="contacto">
      <Hero />
      <InfoB />
      <BannerWhastapp />
    </main>
  </Layout>
</template>

<script>
import Hero from '../components/contacto/Hero'
import InfoB from '../components/contacto/InfoB'
import BannerWhastapp from '../components/internet/BannerWhastapp'

export default {
  name: 'Contacto',
  metaInfo: {
    title: 'Contacto',
  },
  components: {
    Hero,
    InfoB,
    BannerWhastapp,
  },
}

import './Contacto.scss'
</script>
