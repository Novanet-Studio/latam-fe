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
    'Servicios de ingeniería y geociencia especializada para la construcción civil, la industria petrolera, el sector minero,atención de requerimientos de agua industriales y domésticos',
  titleTemplate: '%s',
  icon: 'src/favicon.png',
  plugins: [
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
        themeColor: '#232a46',
        backgroundColor: '#ffffff',
        icon: 'src/favicon.png',
        shortName: 'FyL Ingeniería', // Optional
        description: 'FyL Ingeniería servicios', // Optional
        lang: 'es-ES', // Optional
        maskableIcon: true, // Optional
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
