<template>
  <v-card>
    <v-layout justify-center>
      <v-card-subtitle justify="center">{{ title }}</v-card-subtitle>
    </v-layout>
    <search-form @handleSearch="search" :message="message" :loading="loading" />
    <div v-show="totalCount">
      <result-card
        class="pb-5"
        :search-word="searchWord"
        :total-count="totalCount"
        :item-title="itemTitle"
      />
      <github-repo-card class="pb-5" :repositories="repositories" :language="searchWord" />
    </div>
  </v-card>
</template>

<script>
import SearchForm from "@/components/molecules/SearchForm.vue";
import ResultCard from "@/components/molecules/ResultCard.vue";
import GithubRepoCard from "@/components/molecules/GithubRepoCard.vue";

export default {
  components: {
    SearchForm,
    ResultCard,
    GithubRepoCard
  },

  props: {
    handleSearch: {
      type: Function,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },

  data: () => ({
    searchWord: "",
    totalCount: 0,
    repositories: [],
    itemTitle: "レポジトリ数",
    message: "",
    loading: false
  }),

  methods: {
    async search(word) {
      this.message = "";
      this.loading = true;

      try {
        const res = await this.handleSearch(word);
        this.totalCount = res[0];
        this.repositories = res[1].repo.items;
        this.searchWord = res[1].language;
      } catch (error) {
        this.message = error;
      }

      this.loading = false;
    }
  }
};
</script>