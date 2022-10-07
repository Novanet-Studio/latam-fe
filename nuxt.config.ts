// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default {
  components: {
    global: true,
    dirs: ["~/components"],
  },
  build: {
    transpile: [
      "@fortawesome/vue-fontawesome",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-brands-svg-icons",
    ],
  },
  buildModules: ["@nuxtjs/style-resources"],
  modules: ["@nuxt/image-edge", "@nuxtjs/strapi"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/global.scss";',
        },
      },
    },
  },
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  image: {
    dir: "assets/images",
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
  typescript: {
    strict: true,
  },
};
