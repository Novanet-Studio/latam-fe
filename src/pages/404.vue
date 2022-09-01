<template>
  <Layout>
    <main class="contacto">
      <Hero />
      <InfoB />
    </main>
  </Layout>
</template>

<script>
import Hero from '../components/contacto/HeroB'
import InfoB from '../components/contacto/InfoB'

export default {
  name: '404',
  metaInfo: {
    title: '404',
  },
  components: {
    Hero,
    InfoB,
  },
}

import './Contacto.scss'
</script>
