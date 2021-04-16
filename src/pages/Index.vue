<template>
  <Layout>
    <Hero />
    <Pago />
  </Layout>
</template>

<script>
import Hero from '../components/index/Hero'
import Pago from '../components/index/Pago'

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
  },
}

import './Index.scss'
</script>
