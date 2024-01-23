<script setup lang="ts">
import {
  nacionales,
  syp,
  deportivos,
  variedades,
  infantiles,
  internacionales,
} from "~/utils/categories";

type State = Record<string, boolean>;

const state = ref<State>({});
const openMultipleItems = ref(false);


const categories = [
  {
    content: nacionales,
    title: 'Nacionales',
  },
  {
    content: internacionales,
    title: 'Internacionales',
  },
  {
    content: syp,
    title: 'Series y películas',
  },
  {
    content: deportivos,
    title: 'Deportes',
  },
  {
    content: variedades,
    title: 'Variedades',
  },
  {
    content: infantiles,
    title: 'Jóvenes y niños',
  },
];
</script>

<template>
  <section class="canales" id="canales">
    <AccordionList v-model:state="state" :open-multiple-items="openMultipleItems">
      <channel-item v-for="(category, index) in categories" :content="category.content" :title="category.title"
        :key="index" />
    </AccordionList>
  </section>
</template>
