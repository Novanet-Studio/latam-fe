<template>
  <transition name="fade" appear>
    <div class="layout">
      <Header />
      <slot />
      <Footer />
    </div>
  </transition>
</template>

<script>
export default {};
import "./default.scss";
</script>
