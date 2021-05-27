<template>
  <Layout>
    <main class="reporte">
      <Hero />
      <Tarifas />
      <InfoA />
      <Form />
    </main>
  </Layout>
</template>

<script>
import Hero from '../components/reporte/Hero'
import Tarifas from '../components/reporte/Tarifas'
import InfoA from '../components/reporte/InfoA'
import Form from '../components/reporte/Form'


export default {
  name: 'Reporte',
  metaInfo: {
    title: 'Reportar pago',
  },
  components: {
    Hero,
    Tarifas,
    InfoA,
    Form,
  },
}

import './Reporte.scss'
</script>
