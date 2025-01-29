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

// Definir categorías
const categories: Category[] = [
  { title: "Nacionales", content: nacionales },
  { title: "Internacionales", content: internacionales },
  { title: "Series y Películas", content: syp },
  { title: "Deportes", content: deportivos },
  { title: "Variedades", content: variedades },
  { title: "Jóvenes y Niños", content: infantiles },
];

// Generar items para el acordeón
const items = categories.map((category) => ({
  label: category.title,
  content: category.content,
}));

// Configuración personalizada de `UAccordion`
const customAccordionUI = {
  wrapper: 'canales__accordion',
  container: 'canales__accordion__container',
  item: {
    base: 'canales__accordion__item',
    size: 'text-base',
    color: 'text-gray-700 dark:text-gray-200',
    padding: 'p-4',
    icon: 'transform transition-transform duration-300',
  },
  transition: {
    enterActiveClass: 'overflow-hidden transition-all duration-300 ease-out',
    leaveActiveClass: 'overflow-hidden transition-all duration-300 ease-in',
  },
  default: {
    openIcon: '',
    closeIcon: '',
    class: 'canales__accordion__default',
    variant: 'custom',
    truncate: false,
  }
};
</script>

<template>
  <section class="canales" id="canales">
    <!-- Título del acordeón -->
    <h2 class="canales__titulo">Categorías de Canales</h2>

    <!-- Acordeón con estilos personalizados -->
    <UAccordion 
      :items="items" 
      :ui="customAccordionUI"
      class="canales__accordion"
    >
      <template #item="{ item }">
        <div class="canales__accordion__categoria">
          <ul class="canales__grid">
            <li
              v-for="(contentItem, index) in item.content"
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


<style scoped>

</style>
