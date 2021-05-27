<template>
  <Layout>
    <main class="inicio">
      <Hero />
      <Pago />
      <Canales />
      <PlanTv />
      <PlanInternet />
    </main>
  </Layout>
</template>

<script>
import Hero from '../components/index/Hero'
import Pago from '../components/index/Pago'
import Canales from '../components/index/Canales'
import PlanTv from '../components/index/PlanTv'
import PlanInternet from '../components/index/PlanInternet'

export default {
  name: 'Inicio',
  metaInfo: {
    title: 'Inicio',
    meta: [
      { key: 'description', name: 'description', content: 'Servicios de TV por cable e Internet en fibra óptica de alta velocidad' },
    ],
  },
  components: {
    Hero,
    Pago,
    Canales,
    PlanTv,
    PlanInternet,
  },
}

import './Index.scss'
</script>
