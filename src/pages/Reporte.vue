<template>
  <Layout>
    <main class="reporte">
      <Hero />
      <Tarifas />
      <InfoA />
    </main>
  </Layout>
</template>

<script>
import Hero from '../components/reporte/Hero'
import Tarifas from '../components/reporte/Tarifas'
import InfoA from '../components/reporte/InfoA'

export default {
  name: 'Reporte',
  metaInfo: {
    title: 'Reporte',
  },
  components: {
    Hero,
    Tarifas,
    InfoA,
  },
}

import './Reporte.scss'
</script>
