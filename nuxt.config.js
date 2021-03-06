
export default {
  // env: {
  //       ws_url: 'wss://www.pandiga.ru',
  //       img_url: 'https://www.pandiga.ru',
  //       online_ws:null
  //   },


  env: {
        ws_url: 'ws://localhost:8000',
        img_url: 'http://localhost:8000',
        online_ws:null
    },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  loading : {color: '#ff0000'},
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'PANDIGA - Клубная аренда техники',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'PANDIGA — это рекомендательный сервис по аренде ' +
          'абсолютно любой технике и строительному инструменту, а так же подбору специалистов для' +
          ' выполнения абсолютно любой работы.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet',  href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap' },

    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/style.sass',
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/mask',
    //'@/plugins/v_mask',
    '@/plugins/scroll',
    {src:'@/plugins/ymapPlugin',mode: 'client'},
  //  { src: '@/plugins/ws.js', ssr: false },
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',

  ],


  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL:'https://www.pandiga.ru'
    baseURL:'http://localhost:8000'
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: [/^element-ui/],
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/token/login/', method: 'post', propertyName: 'auth_token' },
          logout: { url: '/auth/token/logout/', method: 'post' },
          user: { url: '/api/v1/user/me/', method: 'get', propertyName: false }
        },
        // tokenRequired: true,
        tokenType: 'Token',
        // globalToken: true,
        //autoFetchUser: false
      }
    }
  }
}
