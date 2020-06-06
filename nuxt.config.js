require("dotenv").config();
const { QIITA_API, GITHUB_API, LANGUAGE_IMAGE_URL } = process.env,
  domain = process.env.BASE_URL.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1];

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "increment",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Technical information site for beginners"
      },
      {
        name: "twitter:card",
        content: "summary_large_image"
      },
      {
        name: "twitter:site",
        content: "@yagi"
      },
      {
        name: "og:url",
        content: "https://increment.site"
      },
      {
        name: "og:description",
        content: "Technical information site for beginners"
      },
      {
        name: "og:title",
        content: "increment"
      },
      {
        name: "og:image",
        content: "https://increment.site/img/twitter_card_image.png"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ]
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
    extend(config, { isDev, isClient }) {
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
    [
      "@nuxtjs/google-adsense",
      {
        id: process.env.GA_ADSENSE_ID,
        pageLevelAds: true
      }
    ]
  ],

  plugins: [
    {
      src: "~/plugins/ga.js",
      mode: "client"
    },
    "~/plugins/vue-observe-visibility"
  ],

  env: {
    QIITA_API,
    GITHUB_API,
    LANGUAGE_IMAGE_URL
  }
};
