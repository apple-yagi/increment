require("dotenv").config();
const {
  FIREBASE_API,
  LANGUAGE_IMAGE_URL,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID
} = process.env;

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: "og: http://ogp.me/ns#",
      lang: "ja"
    },
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
        content: "Technical information site for beginners"
      },
      {
        name: "keywords",
        content: "Tech information, 情報技術サイト, increment, 初学者, beginner, developer, 開発者, Technical infomation site for beginners"
      }
    ],
    link: [{
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    }]
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
  ],

  plugins: [{
      src: "~/plugins/ga.js",
      mode: "client"
    },
    "~/plugins/vue-observe-visibility"
  ],

  env: {
    FIREBASE_API,
    LANGUAGE_IMAGE_URL,
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID
  }
};
