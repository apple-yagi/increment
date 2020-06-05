<template>
  <v-card align="center">
    <v-card-title>{{ language }}&nbsp;Popular Repository</v-card-title>
    <v-row>
      <v-col cols="12" sm="4" v-for="(repo, i) in repositories" :key="i">
        <v-card-text>
          <v-img :src="repo.owner.avatar_url" width="100" />
          {{ repo.owner.login }}
          <br />
          <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
          <v-icon>mdi-star</v-icon>
          {{ repo.stargazers_count.toLocaleString() }}
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    repositories: {
      type: Array,
      required: true
    },
    language: {
      type: String,
      required: true
    }
  }
};
</script>