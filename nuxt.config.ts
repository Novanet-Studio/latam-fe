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
  typescript: {
    strict: true,
  },
  pwa: {
    meta: {
      title: "Latin American Cable",
      name: "Latin American Aplicación web",
      author: "Novanet Studio <info@novanet.studio>",
      description:
        "Más de 100 canales de TV. Internet fibra óptica de alta velocidad.",
      theme_color: "#1b4685",
      lang: "es",
    },
    manifest: {
      name: "Latin American Aplicación web",
      short_name: "Latin American Cable",
      description:
        "Más de 100 canales de TV. Internet fibra óptica de alta velocidad.",
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
  strapi: {
    url: process.env.STRAPI_URL || "http://localhost:1337",
  },
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/global.scss";',
        },
      },
    },
  },
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
};
