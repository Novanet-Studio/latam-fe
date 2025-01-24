
channel-list

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
  content: { image: string }[]; // Contenido serán imágenes para cada categoría
};

// Define tus categorías usando la información importada
const categories: Category[] = [
  { title: 'Nacionales', content: nacionales },
  { title: 'Internacionales', content: internacionales },
  { title: 'Series y Películas', content: syp },
  { title: 'Deportes', content: deportivos },
  { title: 'Variedades', content: variedades },
  { title: 'Jóvenes y Niños', content: infantiles },
];

// Esta estructura mapea las categorías para usarlas en el acordeón
const items = categories.map((category) => ({
  label: category.title,
  defaultOpen: false, // Si quieres que cada acordeón esté abierto por defecto
  slot: category.title, // Usamos el título como el nombre del slot
  description: category.content, // Usamos content en lugar de description para mostrar las imágenes
}));
</script>

<template>
  <section class="canales" id="canales">
  <UAccordion :items="items">
    <template #item="{ item }">
      <!-- Aquí mostramos el contenido de cada categoría -->
      <div class="text-center">
        <h3 class="text-xl font-bold text-">{{ item.label }}</h3>
        
        <!-- Iteramos sobre el content para mostrar las imágenes -->
        <ul class="canales__categoria">
          <li
            v-for="(contentItem, index) in categories.find(c => c.title === item.label)?.content"
            
            :key="index"
            class="canales__categoria__item"
          >
            <!-- Mostrar cada imagen -->
            <img :src="contentItem.image" :alt="`Imagen de ${item.label} ${index + 1}`" class="canales__categoria__imagen" />
          </li>
        </ul>
      </div>
    </template>


    <!-- Aquí puedes agregar más templates si necesitas otro tipo de contenido específico para otras categorías -->
  </UAccordion>
</section>
</template>
