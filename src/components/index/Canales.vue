<template>
  <section class="canales">
    <h2 class="canales__titulo">TV por cable</h2>
    <vsa-list>
      <Categoria :content="nacionales" titulo="Nacionales"/>
      <Categoria :content="internacionales" titulo="Internacionales"/>
      <Categoria :content="syp" titulo="Series y películas"/>
      <Categoria :content="deportivos" titulo="Deportes"/>
      <Categoria :content="variedades" titulo="Variedades"/>
      <Categoria :content="infantiles" titulo="Jóvenes y niños"
    /></vsa-list>
  </section>
</template>

<script>
import { VsaList } from 'vue-simple-accordion'
import Categoria from './Categoria'

import {
  nacionales,
  syp,
  deportivos,
  variedades,
  infantiles,
  internacionales,
} from '../../data/categorias'

export default {
  components: {
    Categoria,
    VsaList,
  },
  data() {
    return {
      nacionales,
      syp,
      deportivos,
      variedades,
      infantiles,
      internacionales,
    }
  },
  computed: {
    console: () => console,
  },
}

import './Canales.scss'
</script>
