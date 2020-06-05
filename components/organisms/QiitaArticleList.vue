<template>
  <v-list dense>
    <v-subheader class="title">{{ subheader }}</v-subheader>
    <v-list-item-group>
      <v-row>
        <qiita-article-item v-for="(article, i) in articles" :key="i" :article="article" />
      </v-row>
    </v-list-item-group>
  </v-list>
</template>

<script>
import QiitaArticleItem from "@/components/molecules/QiitaArticleItem.vue";

export default {
  name: "QiitaNewArticles",

  components: {
    QiitaArticleItem
  },

  props: {
    articles: {
      type: Array,
      required: true
    },
    subheader: {
      type: String,
      required: true
    }
  },

  data: () => ({
    count: 1
  })
};
</script>