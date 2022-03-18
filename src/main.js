// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

//Componente carousel para Vue https://github.com/fengyuanchen/vue-carousel
import Vue from 'vue'

//Layout por defecto
import DefaultLayout from '~/layouts/Default.vue'

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  head.script.push({
    src:
      'https://cloud.issabel.org/click2call/click.js?code=eyJjdCI6ImtpK05BWDVtaWtLZVpHc2IzOCtDZjVuc2Y3NytEdFpDNnNSTDY0NGw4TWtjdzduZyswUzVqZGhYcjRvTnBIUGVHTzZMeFJUTTN0RjNQalwva1pHVzZHQlBSYUZETE5tY3BRcFBuajd3ekZhTmF0bjAxOHI2MFRxclFKUlRheWRyT0E5RFhSZEFYSG82Nm43Mzl5ZWlrZ2RSZXkzR09QR2tnMzlJTHFsTDNyMndrcko0QnlUXC8yWVM3MDJcL1BYNlJhdVVCV0l6Q0xcL2MyT2tZTjhGZ2tLTDVTSzJVWkJNMzZ1NkY5d1BBcndadEkyNEtmT240SytsWHJsUGsrNHJhQWppcDhuMytCZjV5Wm1NU21cL01iRmhIblkwZHk0dDQ0dVJKdTMwbVdhcXpyQmFnemZhV2ZXWlJWWjBtSG5aejByaXIiLCJpdiI6IjRjNWIwOWQ3MmU3MjYwODEzYmNlZTNhMTg3NDk4YWE3IiwicyI6ImY4MDIzN2MxYWUxYWYxOTMifQ==',
    body: false,
  })
}
