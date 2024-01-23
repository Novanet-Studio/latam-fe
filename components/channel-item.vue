<script lang="ts" setup>
type Props = {
  title: string;
  content: any[];
};
defineProps<Props>();
</script>

<template>
  <AccordionItem :id="title" class="canales__lista">
    <template #summary>
      <h5 class="canales__categoria__titulo">{{ title }}</h5>
    </template>
    <template #icon><span class="canales__categoria__icono">⌃</span></template>
    <div>
      <ul class="canales__categoria">
        <li v-for="item in content" :key="item" class="canales__categoria__item">
          <img :src="item.image" class="canales__categoria__imagen" />
        </li>
      </ul>
    </div>
  </AccordionItem>
</template>
