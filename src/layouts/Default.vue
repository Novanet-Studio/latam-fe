<template>
  <div class="layout">
    <Header />
    <main class="principal">
      <slot />
    </main>
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
