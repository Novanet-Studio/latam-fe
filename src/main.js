// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

//Componente carousel para Vue https://github.com/fengyuanchen/vue-carousel
import Vue from 'vue'

//Layout por defecto
import DefaultLayout from '~/layouts/Default.vue'

export default function({ router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
