<template>
  <transition name="fade" appear>
    <div class="layout">
      <the-header />
      <slot />
      <whatsapp />
      <the-footer />
    </div>
  </transition>
</template>
