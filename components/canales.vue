<template>
  <section class="canales" id="canales">
      <AccordionList
        v-model:state="state"
        :open-multiple-items="openMultipleItems"
      >
        <Categoria :content="nacionales" titulo="Nacionales" />
        <Categoria :content="internacionales" titulo="Internacionales" />
        <Categoria :content="syp" titulo="Series y películas" />
        <Categoria :content="deportivos" titulo="Deportes" />
        <Categoria :content="variedades" titulo="Variedades" />
        <Categoria :content="infantiles" titulo="Jóvenes y niños" />
      </AccordionList>
    </section>
</template>

<script setup lang="ts">
import { AccordionList } from "vue3-rich-accordion";
import "vue3-rich-accordion/accordion-library-styles.css";

import {
  nacionales,
  syp,
  deportivos,
  variedades,
  infantiles,
  internacionales,
} from "../utils/categorias";

import { computed, ref } from "vue";

const state = ref<Record<string, boolean>>({});
const openMultipleItems = ref(false);


</script>
