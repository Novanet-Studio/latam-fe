import pwa from "./pwa";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default {
  telemetry: false,
  app: {
    head: {
      meta: [
        { name: "title", content: "Latin American Cable" },
        {
          name: "description",
          content:
            "Más de 100 canales de TV. Internet fibra óptica de alta velocidad.",
        },
        { name: "name", content: "Latin American Aplicación web" },
        { name: "author", content: "Novanet Studio <info@novanet.studio>" },
      ],
      script: [
        {
          src: "https://cloud.issabel.org/click2call/click.js?code=eyJjdCI6ImtpK05BWDVtaWtLZVpHc2IzOCtDZjVuc2Y3NytEdFpDNnNSTDY0NGw4TWtjdzduZyswUzVqZGhYcjRvTnBIUGVHTzZMeFJUTTN0RjNQalwva1pHVzZHQlBSYUZETE5tY3BRcFBuajd3ekZhTmF0bjAxOHI2MFRxclFKUlRheWRyT0E5RFhSZEFYSG82Nm43Mzl5ZWlrZ2RSZXkzR09QR2tnMzlJTHFsTDNyMndrcko0QnlUXC8yWVM3MDJcL1BYNlJhdVVCV0l6Q0xcL2MyT2tZTjhGZ2tLTDVTSzJVWkJNMzZ1NkY5d1BBcndadEkyNEtmT240SytsWHJsUGsrNHJhQWppcDhuMytCZjV5Wm1NU21cL01iRmhIblkwZHk0dDQ0dVJKdTMwbVdhcXpyQmFnemZhV2ZXWlJWWjBtSG5aejByaXIiLCJpdiI6IjRjNWIwOWQ3MmU3MjYwODEzYmNlZTNhMTg3NDk4YWE3IiwicyI6ImY4MDIzN2MxYWUxYWYxOTMifQ==",
          body: true,
        },
      ],
    },
  },

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
      strapi: {
        url: process.env.STRAPI_URL || "http://localhost:1337",
      },
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
