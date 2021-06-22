<template>
  <div class="layout">
    <Header />
    <transition name="fade" appear />
    <slot />
    <Whatsapp />
    <Footer />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Header from '~/layouts/Header'
import Whatsapp from '~/layouts/Whatsapp'
import Footer from '~/layouts/Footer'

export default {
  components: {
    Header,
    Whatsapp,
    Footer,
  },
}
import './Default.scss'
</script>
