<template>
  <div class="layout">
    <Header />
    <transition name="fade" appear>
    <slot />
    </transition>
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
import Footer from '~/layouts/Footer'

export default {
  components: {
    Header,
    Footer,
  },
}
import './Default.scss'
</script>
