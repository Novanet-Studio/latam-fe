<template>
  <Layout>
    <main class="contacto">
      <Hero />
      <InfoB />
      <Formulario />
    </main>
  </Layout>
</template>

<script>
import Hero from '../components/contacto/Hero'
import InfoB from '../components/contacto/InfoB'
import Formulario from '../components/internet/Formulario'

export default {
  name: 'Contacto',
  metaInfo: {
    title: 'Contacto',
  },
  components: {
    Hero,
    InfoB,
    Formulario,
  },
}

import './Contacto.scss'
</script>
