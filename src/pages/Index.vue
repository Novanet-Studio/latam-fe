<template>
  <Layout>
    <Hero />
  </Layout>
</template>

<script>
import Hero from '../components/index/Hero'

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
  },
}

import './Index.scss'
</script>
