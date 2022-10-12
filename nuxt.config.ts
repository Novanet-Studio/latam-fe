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
  modules: ["@nuxt/image-edge", "@nuxtjs/strapi", "@kevinmarrec/nuxt-pwa"],
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
  pwa: {
    meta: {
      title: "Latin American Cable",
      name: "Latin American Cable App",
      author: "Novanet Studio <info@novanet.studio>",
      description: "Servicio de Internet y TV por fibra óptica",
      theme_color: "#1b4685",
      lang: "es",
    },
    manifest: {
      name: "Latin American Cable web app",
      short_name: "Latin American Cable",
      description: "Servicio de Internet y TV por fibra óptica",
      startUrl: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#1b4685",
    },
    icon: { source: "static/favicon.png" },
    /*workbox: {
      enabled: true,
    },*/
  },
};
