<script setup lang="ts">
interface Props {
  text?: string
}

withDefaults(defineProps<Props>(), {
  text: "Espera un momento..."
})
</script>

<template>
  <div class="loader-wrapper">
    <div class="loader"></div>
    <p class="loader__text">{{ text }}</p>
  </div>
</template>

<style scoped>

.loader-wrapper {
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loader {
  width: 24px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #1b4686;
  --_m: 
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {to{transform: rotate(1turn)}}

.loader__text {
  margin-top: 28px;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: #47536b;
}
</style>
