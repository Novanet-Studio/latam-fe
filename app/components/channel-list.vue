<script setup lang="ts">
import {
  nacionales,
  syp,
  deportivos,
  variedades,
  infantiles,
  internacionales,
} from "~/utils/categories";

type Category = {
  title: string;
  content: { image: string }[];
};

const categories: Category[] = [
  { title: "Nacionales", content: nacionales },
  { title: "Internacionales", content: internacionales },
  { title: "Series y Películas", content: syp },
  { title: "Deportes", content: deportivos },
  { title: "Variedades", content: variedades },
  { title: "Jóvenes y Niños", content: infantiles },
];

const items = categories.map((category) => ({
  label: category.title,
  channels: category.content,
  slot: "category-content",
}));

const customAccordionUI = {
  root: "canales__accordion",
  body: "canales__accordion__container",
  item: "canales__accordion__item",
  
  transition: {
    enterActiveClass: "overflow-hidden transition-all duration-300 ease-out",
    leaveActiveClass: "overflow-hidden transition-all duration-300 ease-in",
  },
  default: {
    openIcon: "",
    closeIcon: "",
    class: "canales__accordion__default",
    truncate: false,
  },
};
</script>

<template>
  <section class="canales" id="canales">
    <h2 class="canales__titulo">Categorías de Canales</h2>

     <UAccordion
      :items="items"
      :ui="customAccordionUI"
      class="canales__accordion"
    >
      <template #category-content="{ item }">
        <div class="canales__accordion__categoria">
          <ul class="canales__grid">
            <li
              v-for="(contentItem, index) in item.channels"
              :key="index"
              class="canales__grid__item"
            >
              <img
                v-if="contentItem.image"
                :src="contentItem.image"
                :alt="`Imagen ${index + 1}`"
                class="canales__grid__imagen"
              />
            </li>
          </ul>
        </div>
      </template>
    </UAccordion> 
  </section>
</template>
