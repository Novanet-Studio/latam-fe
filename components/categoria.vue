<template>
  <vsa-item>
    <vsa-heading>
      <h5 class="canales__categoria__titulo">{{ titulo }}</h5>
    </vsa-heading>
    <vsa-content>
      <ul class="canales__categoria">
        <li
          v-for="item in content"
          :key="item.image"
          class="canales__categoria__item"
        >
          <g-image :src="item.image" class="canales__categoria__imagen" />
        </li>
      </ul>
    </vsa-content>
  </vsa-item>
</template>

<script>
import { VsaItem, VsaHeading, VsaContent, VsaIcon } from 'vue-simple-accordion'

import 'vue-simple-accordion/dist/vue-simple-accordion.css'

export default {
  name: 'Categorias',
  props: { content: Array, titulo: String },
  components: {
    VsaItem,
    VsaHeading,
    VsaContent,
    VsaIcon,
  },
  computed: {
    console: () => console,
  },
}

import './categoria.scss'
</script>
