<template>
  <v-container>
    <div v-if="loaded">
      <v-card class="mt-5">
        <v-sheet align="center">
          <v-img max-width="500" src="https://img.icons8.com/small/512/000000/github.png" />
        </v-sheet>
        <v-divider />
        <v-card-title>GitHub とは</v-card-title>
        <v-card-subtitle>
          <a href="https://github.com/" target="_blank">ホームページ</a>
        </v-card-subtitle>
        <v-card-text>GitHub（ギットハブ）は、ソフトウェア開発のプラットフォームであり、ソースコードをホスティングする。コードのバージョン管理システムにはGitを使用する。</v-card-text>
      </v-card>
      <div class="mt-5">
        <github-search-result title="あなたの気になるプログラミング言語について検索できます" :handle-search="handleSearch" />
      </div>
      <github-lang-ranking
        style="margin-top: 50px;"
        :data="data"
        :labels="labels"
        :title="title"
        :label="label"
        :dark-mode="darkMode"
      />
      <div style="margin-top: 50px; margin-bottom: 50px;" align="center">
        <v-sheet height="200" v-if="!repoArray[0]">
          <v-progress-circular style="margin-top: 80px;" indeterminate color="primary"></v-progress-circular>
        </v-sheet>
        <github-repo-ranking v-else :repo-array="repoArray" :language-ranking="labels" />
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Github from "@/api/github";
import GithubLangRanking from "@/components/organisms/RankingChart.vue";
import GithubSearchResult from "@/components/organisms/GithubSearchResult.vue";
import GithubRepoRanking from "@/components/organisms/GithubRepoRanking.vue";

export default {
  components: {
    GithubLangRanking,
    GithubSearchResult,
    GithubRepoRanking
  },

  data: () => ({
    loaded: false,
    labels: [],
    data: [],
    title: "Popular Language",
    label: "Repository Count",
    repoArray: []
  }),

  computed: {
    ...mapState("github", ["loading", "languageList", "repoRankingList"]),
    darkMode() {
      return this.$vuetify.theme.dark;
    }
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

  methods: {
    async setGraphData() {
      if (this.repoRankingList[0]) {
        for (let i = 0; i < this.repoRankingList.length; i++) {
          this.repoArray.push(this.repoRankingList[i]);
        }
      }

      this.languageList.forEach(language => {
        this.labels.push(language.name);
        this.data.push(language.total_count);
      });

      // ローディング終了
      this.$nuxt.$loading.finish();
      this.loaded = true;
    },

    async handleSearch(language) {
      const axiosArray = [];
      try {
        axiosArray.push(Github.searchRepositoryCount(language));
        axiosArray.push(Github.searchRepoRanking(language));

        const result = await Promise.all(axiosArray);
        return Promise.resolve(result);
      } catch (error) {
        return Promise.reject("その言語は存在しません");
      }
    }
  },

  watch: {
    loading(val) {
      if (!val) {
        // グラフの設定
        this.setGraphData();
      }
    },
    repoRankingList(val) {
      for (let i = 0; i < val.length; i++) {
        this.repoArray.push(val[i]);
      }
    }
  }
};
</script>