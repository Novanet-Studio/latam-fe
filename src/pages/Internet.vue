<template>
  <Layout>
    <Hero />
    <!--
    <PlanInternet />
    <Formulario />-->
  </Layout>
</template>

<script>
import Hero from '../components/internet/Hero'
import PlanInternet from '../components/internet/PlanInternet'
import Formulario from '../components/internet/Formulario'

export default {
  name: 'Internet',
  metaInfo: {
    title: 'Internet',
  },
  components: {
    Hero,
    PlanInternet,
    Formulario,
  },
}

import './Internet.scss'
</script>
