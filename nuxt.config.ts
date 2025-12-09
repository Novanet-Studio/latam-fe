export default defineNuxtConfig({
  telemetry: false,

  future: {
    compatibilityVersion: 4,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "es",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "title", content: "Latin American Cable" },
        {
          name: "description",
          content:
            "Más de 100 canales de TV. Internet fibra óptica de alta velocidad.",
        },
        { name: "name", content: "Latin American Aplicación web" },
        { name: "author", content: "Novanet Studio <info@novanet.studio>" },

        { name: "theme-color", content: "#1b4686" },
      ],
      // script: [
      //   {
      //     src: "https://cloud.issabel.org/click2call/click.js?code=eyJjdCI6ImtpK05BWDVtaWtLZVpHc2IzOCtDZjVuc2Y3NytEdFpDNnNSTDY0NGw4TWtjdzduZyswUzVqZGhYcjRvTnBIUGVHTzZMeFJUTTN0RjNQalwva1pHVzZHQlBSYUZETE5tY3BRcFBuajd3ekZhTmF0bjAxOHI2MFRxclFKUlRheWRyT0E5RFhSZEFYSG82Nm43Mzl5ZWlrZ2RSZXkzR09QR2tnMzlJTHFsTDNyMndrcko0QnlUXC8yWVM3MDJcL1BYNlJhdVVCV0l6Q0xcL2MyT2tZTjhGZ2tLTDVTSzJVWkJNMzZ1NkY5d1BBcndadEkyNEtmT240SytsWHJsUGsrNHJhQWppcDhuMytCZjV5Wm1NU21cL01iRmhIblkwZHk0dDQ0dVJKdTMwbVdhcXpyQmFnemZhV2ZXWlJWWjBtSG5aejByaXIiLCJpdiI6IjRjNWIwOWQ3MmU3MjYwODEzYmNlZTNhMTg3NDk4YWE3IiwicyI6ImY4MDIzN2MxYWUxYWYxOTMifQ==",
      //     defer: true,
      //   },
      // ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  modules: [
    "@nuxt/image",
    "@nuxtjs/strapi",
    "@vite-pwa/nuxt",
    "@vueuse/nuxt",
    "notivue/nuxt",
    "@nuxt/ui",
  ],

  build: {
    transpile: [
      "@fortawesome/vue-fontawesome",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-brands-svg-icons",
      "@vuepic/vue-datepicker",
    ],
  },

  runtimeConfig: {
    public: {
      strapi: {
        url: process.env.STRAPI_URL || "http://localhost:1337",
        prefix: "/api",
        version: "v5",
      },
      latamServicesApiUrl: process.env.LATAM_SERVICES_API,
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

  css: [
    "~/assets/scss/global.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "notivue/notifications.css",
    "notivue/animations.css",
  ],

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Latin American Cable",
      short_name: "LatamCable",
      description:
        "Más de 100 canales de TV. Internet fibra óptica de alta velocidad.",
      theme_color: "#1b4686",
      background_color: "#ffffff",
      lang: "es",
      display: "standalone",
      orientation: "portrait",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
      navigateFallback: null,
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },

  notivue: {
    position: "top-right",
  },

  image: {
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

  compatibilityDate: "2025-12-10",
});
