<template>
  <Layout>
    <main class="internetvista">
      <Hero />
      <PlanInternet />
      <BannerWhastapp />
    </main>
  </Layout>
</template>

<script>
import Hero from '../components/internet/Hero'
import PlanInternet from '../components/internet/PlanInternet'
import BannerWhastapp from '../components/internet/BannerWhastapp'

export default {
  name: 'Internet',
  metaInfo: {
    title: 'Internet',
  },
  components: {
    Hero,
    PlanInternet,
    BannerWhastapp,
  },
}

import './Internet.scss'
</script>
