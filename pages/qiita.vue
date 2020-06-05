<template>
  <v-container>
    <div v-if="loaded">
      <v-sheet class="mt-5" max-height="500px">
        <v-img v-if="imageUrl" :src="imageUrl" />
      </v-sheet>
      <v-card>
        <v-card-title>Qiita とは</v-card-title>
        <v-card-subtitle>
          <a href="https://qiita.com/" target="_blank" class="button-green">ホームページ</a>
        </v-card-subtitle>
        <v-card-text>プログラマのための技術情報共有サービスです。 プログラミングに関するTips、ノウハウ、メモを簡単に記録 & 公開することができます。</v-card-text>
      </v-card>
      <qiita-tag-ranking
        style="margin-top: 50px"
        :data="data"
        :labels="labels"
        :title="title"
        :label="label"
        :dark-mode="darkMode"
      />
      <div class="mt-5">
        <qiita-search-result title="あなたの気になるタグについて検索できます" :handle-search="handleSearch" />
      </div>
      <v-card style="margin-top: 50px;">
        <qiita-article-list :articles="trendArticles" subheader="トレンド記事" />
      </v-card>
      <v-card style="margin-top: 50px;">
        <qiita-article-list style="margin-top: 50px;" :articles="newArticles" subheader="新着記事" />
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Qiita from "../api/qiita";
import QiitaTagRanking from "@/components/organisms/RankingChart.vue";
import QiitaArticleList from "@/components/organisms/QiitaArticleList.vue";
import QiitaSearchResult from "@/components/organisms/QiitaSearchResult.vue";

export default {
  name: "qiita",

  components: {
    QiitaTagRanking,
    QiitaArticleList,
    QiitaSearchResult
  },

  data() {
    return {
      labels: [],
      data: [],
      title: "Popular Tags",
      label: "タグの使用回数",
      loaded: false,
      imageUrl: ""
    };
  },

  mounted() {
    this.$nextTick(async () => {
      // ローディング開始
      this.$nuxt.$loading.start();

      if (!this.loading) {
        // グラフの設定
        this.setGraphData();
      }
    });
  },

  computed: {
    ...mapState("qiita", [
      "tags",
      "newArticles",
      "trendArticles",
      "loading",
      "darkImage",
      "lightImage"
    ]),
    darkMode() {
      return this.$vuetify.theme.dark;
    }
  },

  methods: {
    setGraphData() {
      Object.keys(this.tags).forEach(key => {
        this.labels.push(this.tags[key].id);
        this.data.push(this.tags[key].items_count);
      });

      // 画像の設定
      this.setImage(this.darkMode);

      // ローディング終了
      this.$nuxt.$loading.finish();
      this.loaded = true;
    },

    setImage(isDark) {
      if (isDark) {
        this.imageUrl = this.darkImage;
      } else {
        this.imageUrl = this.lightImage;
      }
    },

    handleSearch(word) {
      return new Promise((resolve, reject) => {
        Qiita.searchTagCount(word)
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },

  watch: {
    loading(val) {
      if (!val) {
        // グラフの設定
        this.setGraphData();

        // 画像の設定
        this.setImage(this.darkMode);

        // ローディング終了
        this.$nuxt.$loading.finish();
        this.loaded = true;
      }
    },

    async darkMode(val) {
      this.setImage(val);
    }
  }
};
</script>
