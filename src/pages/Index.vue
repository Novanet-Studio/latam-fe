<template>
  <Layout>
    <Hero />
    <Pago />
    <Canales />
    <PlanTv />
  </Layout>
</template>

<script>
import Hero from '../components/index/Hero'
import Pago from '../components/index/Pago'
import Canales from '../components/index/Canales'
import PlanTv from '../components/index/PlanTv'

export default {
  name: 'Inicio',
  metaInfo: {
    title: 'Inicio',
    meta: [
      { key: 'description', name: 'description', content: 'Mi mama me mima' },
    ],
  },
  components: {
    Hero,
    Pago,
    Canales,
    PlanTv,
  },
}

import './Index.scss'
</script>
