<template>
  <v-col class="py-0" cols="12" sm="6">
    <v-divider />
    <v-list-item :href="articleUrl" target="_blank" two-line color="primary">
      <v-list-item-icon>
        <a :href="authorProfileUrl" target="_blank">
          <v-img :src="article.author.profileImageUrl" width="40" style="border-radius: 50%;"></v-img>
        </a>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold" v-text="article.title"></v-list-item-title>
        <v-list-item-subtitle v-if="article.tags">
          <span class="pl-2" v-for="(tag, i) in article.tags" :key="i">{{ tag.name }}</span>
        </v-list-item-subtitle>
        <v-list-item-subtitle v-if="article.likesCount">
          <span>LGTM&nbsp;{{ article.likesCount }}</span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-col>
</template>

<script>
export default {
  name: "articleItem",

  props: {
    article: {
      type: Object,
      required: true
    }
  },

  computed: {
    authorProfileUrl() {
      return "https://qiita.com/" + this.article.author.name;
    },
    articleUrl() {
      return (
        "https://qiita.com/" +
        this.article.author.name +
        "/items/" +
        this.article.id
      );
    }
  }
};
</script>