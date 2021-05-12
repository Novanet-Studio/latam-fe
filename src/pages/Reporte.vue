<template>
  <Layout>
    <main class="reporte">
      <Hero />
    </main>
  </Layout>
</template>

<script>
import Hero from '../components/reporte/Hero'

export default {
  name: 'Reporte',
  metaInfo: {
    title: 'Reporte',
  },
  components: {
    Hero,
  },
}

import './Reporte.scss'
</script>
