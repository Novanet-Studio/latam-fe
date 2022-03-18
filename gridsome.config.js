// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path')

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/scss/_global.scss')],
    })
}

module.exports = {
  runtimeCompiler: true,
  siteName: 'Latin American Cable',
  siteUrl: 'https://www.latinamericancable.com/',
  siteDescription:
    'Servicios de TV por cable e Internet en fibra óptica de alta velocidad',
  titleTemplate: 'Latin American Cable - %s',
  icon: 'src/favicon.png',
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: process.env.BACKEND_URL,
        queryLimit: 1000,
        singleTypes: ['internet', 'datos-pago', 'reportes'],
        loginData: {
          identifier: process.env.IDENTIFIER,
          password: process.env.PASSWORD,
        },
      },
    },
    {
      use: 'gridsome-plugin-pwa',
      options: {
        // Service Worker Options
        disableServiceWorker: false,
        serviceWorkerPath: 'service-worker.js',
        cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg,gif',
        disableTemplatedUrls: false, // Optional
        // Manifest Options (https://developer.mozilla.org/en-US/docs/Web/Manifest)
        manifestPath: 'manifest.json',
        title: 'Latin American Cable',
        startUrl: '/',
        display: 'standalone',
        statusBarStyle: 'default',
        themeColor: '#1b4685',
        backgroundColor: '#ffffff',
        icon: 'src/favicon.png',
        shortName: 'Latin American', // Optional
        description: 'Latin American', // Optional
        lang: 'es-ES', // Optional
        maskableIcon: true, // Optional
      },
    },
    {
      use: 'gridsome-plugin-netlify-redirects',
      options: {
        typeName: 'NetlifyRedirects',
        redirects: [
          {
            from: '/pago.html',
            to: '/reporte',
            status: 301,
          },
        ],
      },
    },
  ],
  chainWebpack(config) {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach(type =>
      addStyleResource(config.module.rule('scss').oneOf(type)),
    )
  },
}
