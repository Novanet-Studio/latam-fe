<template>
  <Layout>
    <main class="reporte">
      <Hero />
      <Tarifas />
    </main>
  </Layout>
</template>

<script>
import Hero from '../components/reporte/Hero'
import Tarifas from '../components/reporte/Tarifas'

export default {
  name: 'Reporte',
  metaInfo: {
    title: 'Reporte',
  },
  components: {
    Hero,
    Tarifas,
  },
}

import './Reporte.scss'
</script>
