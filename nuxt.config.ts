import pwa from "./pwa";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default {
  target: "static",
  
  build: {
    transpile: [
      "@fortawesome/vue-fontawesome",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-brands-svg-icons",
      "@vuepic/vue-datapicker",
    ],
  },
  modules: ["@nuxt/image-edge", "@nuxtjs/strapi", "@kevinmarrec/nuxt-pwa"],
  runtimeConfig: {
    public: {
      bcvUsdApi: process.env.BCV_USD_API_URL,
    },
  },
  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        types: ["latam.d.ts"],
      },
    },
  },
  pwa,
  strapi: {
    url: process.env.STRAPI_URL || "http://localhost:1337",
  },
  css: [
    "~/assets/scss/global.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "vue3-rich-accordion/accordion-library-styles.css",
  ],
  image: {
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },
};
