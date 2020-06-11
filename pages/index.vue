<template>
  <div>
    <section class="container">
      <div class="mt-10">
        <app-logo />
        <h1 class="title">increment</h1>
        <h2 class="subtitle">Technical information site for beginners</h2>
        <div class="links">
          <nuxt-link to="/qiita" class="button--green">Qiita</nuxt-link>
          <nuxt-link to="/github" class="button--grey">GitHub</nuxt-link>
        </div>
      </div>
    </section>
    <v-divider />
    <hatenabu class="mt-5" />
    <v-divider />
    <stack-overflow class="mt-5" />
    <v-divider />
    <tech-crunch class="my-5" />
  </div>
</template>

<script>
import AppLogo from "~/components/index/AppLogo.vue";
import Hatenabu from "~/components/index/Hatenabu.vue";
import StackOverflow from "~/components/index/StackOverflow.vue";
import TechCrunch from "~/components/index/TechCrunch.vue";

export default {
  head() {
    return {
      meta: [
        {
          name: "og:url",
          content: "https://sampleapp-e29e2.web.app/"
        },
        {
          name: "og:title",
          content: "increment"
        },
        {
          name: "og:description",
          content: "Technical information site for beginners"
        },
        {
          name: "og:image",
          content: "img/twitter_card_image.png"
        },
        {
          name: "og:type",
          content: "website"
        },
        {
          name: "twitter:card",
          content: "summary"
        },
        {
          name: "twitter:site",
          content: "@2nSTmOTLY2ltbvS"
        }
      ]
    };
  },
  components: {
    AppLogo,
    StackOverflow,
    Hatenabu,
    TechCrunch
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
