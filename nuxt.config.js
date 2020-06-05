require("dotenv").config();
const {
  QIITA_API,
  GITHUB_API,
  LANGUAGE_IMAGE_URL
} = process.env,
  domain = process.env.BASE_URL.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1];

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "increment",
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Nuxt.js project"
      }
    ],
    link: [{
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    }],
  },
  /*
   ** Customize the progress bar color
   */
  loading: "~/components/navigation/Loading.vue",
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },

  modules: [
    "@nuxtjs/vuetify",
    "@nuxtjs/axios",
    ["@nuxtjs/google-adsense", {
      id: process.env.GA_ADSENSE_ID,
      pageLevelAds: true,
      analyticsUacct: process.env.GA_TRACKING_ID,
      analyticsDomainName: domain
    }]
  ],

  plugins: [{
    src: "~/plugins/ga.js",
    mode: "client"
  }, "~/plugins/vue-observe-visibility"],

  env: {
    QIITA_API,
    GITHUB_API,
    LANGUAGE_IMAGE_URL
  }
};
