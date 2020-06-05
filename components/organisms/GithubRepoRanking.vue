<template>
  <div>
    <github-repo-card
      class="mt-3"
      v-for="(repositories, i) in repoArray"
      :key="i"
      :repositories="repositories"
      :language="languageRanking[i]"
    />
  </div>
</template>

<script>
import GithubRepoCard from "@/components/molecules/GithubRepoCard";

export default {
  components: {
    GithubRepoCard
  },

  props: {
    repoArray: {
      type: Array,
      required: true
    },
    languageRanking: {
      type: Array,
      required: true
    }
  }
};
</script>