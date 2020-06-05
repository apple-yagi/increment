require("dotenv").config();
const {
  QIITA_API,
  GITHUB_API,
  LANGUAGE_IMAGE_URL
} = process.env;

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

  modules: ["@nuxtjs/vuetify", "@nuxtjs/axios"],

  plugins: [{
    src: "~/plugins/ga.js",
    mode: "client"
  }],

  env: {
    QIITA_API,
    GITHUB_API,
    LANGUAGE_IMAGE_URL
  }
};
