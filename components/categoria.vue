<template>
  <AccordionItem :id="props.titulo" class="canales__lista">
    <template #summary>
      <h5 class="canales__categoria__titulo">{{ props.titulo }}</h5>
    </template>
    <template #icon><span class="canales__categoria__icono">⌃</span></template>
    <div>
      <ul class="canales__categoria">
        <li
          v-for="item in props.content"
          :key="item"
          class="canales__categoria__item"
        >
          <nuxt-img :src="item.image" class="canales__categoria__imagen" />
        </li>
      </ul>
    </div>
  </AccordionItem>
</template>

<script setup lang="ts">
import "./categoria.scss";
import { AccordionItem } from "vue3-rich-accordion";

const props = defineProps({
  titulo: {
    type: [String],
  },
  content: {
    type: [Object],
  },
});
</script>
