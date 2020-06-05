<template>
  <v-app>
    <client-only placeholder="Loading...">
      <Header :items="items" :width="width" />
    </client-only>

    <v-content>
      <nuxt />
    </v-content>

    <client-only placeholder="Loading...">
      <Drawer v-if="width < 767" :items="items" :dark-mode="darkMode" />
      <Footer v-else :dark-mode="darkMode" :items="items" />
    </client-only>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Header from "@/components/navigation/Header.vue";
import Footer from "@/components/navigation/Footer.vue";
import Drawer from "@/components/navigation/Drawer.vue";

export default {
  components: {
    Header,
    Footer,
    Drawer
  },

  data: () => ({
    items: [
      {
        name: "Home",
        icon: "mdi-home",
        link: "/"
      },
      {
        name: "Qiita",
        icon: "mdi-newspaper",
        link: "/qiita"
      },
      {
        name: "GitHub",
        icon: "mdi-github",
        link: "/github"
      }
    ],
    width: process.client ? window.innerWidth : 0
  }),

  computed: {
    darkMode() {
      return this.$vuetify.theme.dark;
    },
    ...mapState("qiita", ["trendArticles"]),
    ...mapState("github", ["languageList"]),
    ...mapState({
      github_loading: "github/loading",
      qiita_loading: "qiita/loading"
    })
  },

  created() {
    this.handleResize();
  },

  methods: {
    handleResize() {
      if (process.client) {
        this.width = window.innerWidth;
      }
    }
  },

  async mounted() {
    if (process.client) {
      window.addEventListener("resize", this.handleResize);
    }

    if (!this.qiita_loading && !this.trendArticles[0]) {
      this.$store.dispatch("qiita/loadArticles");
    }

    if (!this.github_loading && !this.languageList[0]) {
      this.$store.commit("github/setLoading", true);
      await this.$store.dispatch("github/loadLanguageList");

      this.$store.dispatch("github/loadRepoRankingList");
      this.$store.commit("github/setLoading", false);
    }
  },

  beforeDestroy() {
    if (process.client) {
      window.removeEventListener("resize", this.handleResize);
    }
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.toggle-btn {
  z-index: 0;
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>
