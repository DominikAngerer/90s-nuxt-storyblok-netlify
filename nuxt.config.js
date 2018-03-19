const StoryblokClient = require('storyblok-js-client')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'ieisevil',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: [
    ['storyblok-nuxt', { accessToken: 'ZQGso3v5SVg23HOVwQ4xVwtt', cacheProvider: 'memory' }]
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    routes: function () {
      let storyblok = new StoryblokClient({
        accessToken: 'dMPiVMkHLseUK1nHfA0qQwtt'
      })

      return storyblok.get(`cdn/links`, {
        per_page: 1000
      }).then((res) => {
        let routes = []
        Object.keys(res.data.links).forEach((key) => {
          if (!res.data.links[key].is_folder) {
            routes.push(`/${res.data.links[key].slug}`)
          }
        })
        return routes
      }).catch((res) => {
        console.error({ statusCode: res.response.status, message: res.response.data })
      })
    }
  }
}
