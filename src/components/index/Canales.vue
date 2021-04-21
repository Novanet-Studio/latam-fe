<template>
  <section class="canales">
    <vsa-list>
      <vsa-item>
        <vsa-content>
          <ul class="canales__categoria">
            <li v-for="item in deportivos" :key="item.image" class="canales__categoria__item">
              <g-image :src="item.image" class="canales__categoria__imagen"/>
            </li>
          </ul>
        </vsa-content>
      </vsa-item>
    </vsa-list>
  </section>
</template>

<script>
import {
  VsaList,
  VsaItem,
  VsaHeading,
  VsaContent,
  VsaIcon,
} from 'vue-simple-accordion'
import 'vue-simple-accordion/dist/vue-simple-accordion.css'
import { deportivos } from '../../data/categorias'

export default {
  components: {
    VsaList,
    VsaItem,
    VsaHeading,
    VsaContent,
    VsaIcon,
  },
  data() {
    return {
      deportivos,
    }
  },
  computed: {
    console: () => console,
  },
}

import './Canales.scss'
</script>
