<template>
  <v-card>
    <v-layout justify-center>
      <v-card-subtitle justify="center">{{ title }}</v-card-subtitle>
    </v-layout>
    <search-form @handleSearch="search" :message="message" :loading="loading" />
    <result-card
      class="pb-5"
      v-show="searchWord"
      :search-word="searchWord"
      :total-count="totalCount"
      :item-title="itemTitle"
      :image="image"
      :followers-count="followersCount"
    />
    <qiita-article-list v-show="articles[0]" :articles="articles" :subheader="subheader" />
  </v-card>
</template>

<script>
import SearchForm from "@/components/molecules/SearchForm.vue";
import ResultCard from "@/components/molecules/ResultCard.vue";
import QiitaArticleList from "@/components/organisms/QiitaArticleList.vue";

export default {
  components: {
    SearchForm,
    ResultCard,
    QiitaArticleList
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
    itemTitle: "記事数",
    message: "",
    image: "",
    followersCount: 0,
    loading: false,
    articles: []
  }),

  methods: {
    async search(word) {
      this.message = "";
      this.loading = true;
      this.articles.length = 0;

      try {
        const res = await this.handleSearch(word);
        Object.keys(res.articles).forEach(key => {
          let article = {
            title: res.articles[key].title,
            tags: res.articles[key].tags,
            id: res.articles[key].id,
            likesCount: null,
            author: {
              profileImageUrl: res.articles[key].user.profile_image_url,
              name: res.articles[key].user.id
            }
          };
          this.articles.push(article);
        });
        this.totalCount = res.tagInfo.items_count;
        this.followersCount = res.tagInfo.followers_count;
        this.searchWord = word;
      } catch (error) {
        this.message = error;
      }

      this.loading = false;
    }
  },

  computed: {
    subheader() {
      return this.searchWord + "の新着記事";
    }
  }
};
</script>