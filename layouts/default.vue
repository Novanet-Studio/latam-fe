<template>
  <transition name="fade" appear>
    <div class="layout">
      <Header />
      <slot />
      <Whatsapp />
      <Footer />
    </div>
  </transition>
</template>

<script>
import "./default.scss";
</script>
