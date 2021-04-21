<template>
  <section class="canales">
    <h2 class="canales__titulo">TV por cable</h2>
    <div class="canales__lista">
      <vsa-list>
        <vsa-item>
          <vsa-heading>
            <h5 class="canales__categoria__titulo">Nacionales</h5>
          </vsa-heading>
          <vsa-content>
            <ul class="canales__categoria">
              <li
                v-for="item in nacionales"
                :key="item.image"
                class="canales__categoria__item"
              >
                <g-image :src="item.image" class="canales__categoria__imagen" />
              </li>
            </ul>
          </vsa-content>
        </vsa-item>
      </vsa-list>
    </div>

    <div class="canales__lista">
      <vsa-list>
        <vsa-item>
          <vsa-heading>
            <h5 class="canales__categoria__titulo">Internacionales</h5>
          </vsa-heading>
          <vsa-content>
            <ul class="canales__categoria">
              <li
                v-for="item in internacionales"
                :key="item.image"
                class="canales__categoria__item"
              >
                <g-image :src="item.image" class="canales__categoria__imagen" />
              </li>
            </ul>
          </vsa-content>
        </vsa-item>
      </vsa-list>
    </div>

    <div class="canales__lista">
      <vsa-list>
        <vsa-item>
          <vsa-heading>
            <h5 class="canales__categoria__titulo">Series y películas</h5>
          </vsa-heading>
          <vsa-content>
            <ul class="canales__categoria">
              <li
                v-for="item in syp"
                :key="item.image"
                class="canales__categoria__item"
              >
                <g-image :src="item.image" class="canales__categoria__imagen" />
              </li>
            </ul>
          </vsa-content>
        </vsa-item>
      </vsa-list>
    </div>

    <div class="canales__lista">
      <vsa-list>
        <vsa-item>
          <vsa-heading>
            <h5 class="canales__categoria__titulo">Deportivos</h5>
          </vsa-heading>
          <vsa-content>
            <ul class="canales__categoria">
              <li
                v-for="item in deportivos"
                :key="item.image"
                class="canales__categoria__item"
              >
                <g-image :src="item.image" class="canales__categoria__imagen" />
              </li>
            </ul>
          </vsa-content>
        </vsa-item>
      </vsa-list>
    </div>

    <div class="canales__lista">
      <vsa-list>
        <vsa-item>
          <vsa-heading>
            <h5 class="canales__categoria__titulo">Variedades</h5>
          </vsa-heading>
          <vsa-content>
            <ul class="canales__categoria">
              <li
                v-for="item in variedades"
                :key="item.image"
                class="canales__categoria__item"
              >
                <g-image :src="item.image" class="canales__categoria__imagen" />
              </li>
            </ul>
          </vsa-content>
        </vsa-item>
      </vsa-list>
    </div>

    <div class="canales__lista">
      <vsa-list>
        <vsa-item>
          <vsa-heading>
            <h5 class="canales__categoria__titulo">Infantiles</h5>
          </vsa-heading>
          <vsa-content>
            <ul class="canales__categoria">
              <li
                v-for="item in infantiles"
                :key="item.image"
                class="canales__categoria__item"
              >
                <g-image :src="item.image" class="canales__categoria__imagen" />
              </li>
            </ul>
          </vsa-content>
        </vsa-item>
      </vsa-list>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import VueSimpleAccordion from 'vue-simple-accordion'

import {
  VsaList,
  VsaItem,
  VsaHeading,
  VsaContent,
  VsaIcon,
} from 'vue-simple-accordion'

import 'vue-simple-accordion/dist/vue-simple-accordion.css'

Vue.use(VueSimpleAccordion, {
   autoCollapse: true,
})

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
    VsaList,
    VsaItem,
    VsaHeading,
    VsaContent,
    VsaIcon,
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
