<template>
  <div align="center">
    <v-layout justify-center>
      <v-sheet max-width="100px">
        <v-img :src="langImage" />
      </v-sheet>
    </v-layout>
    <h2 class="mt-2">{{ searchWord }}</h2>
    <h1 class="mt-5">{{ itemTitle }}&nbsp;{{ totalCount.toLocaleString() }}</h1>
    <h1 class="my-5" v-if="followersCount">フォロワー数&nbsp;{{ followersCount.toLocaleString() }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    searchWord: {
      type: String,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    },
    itemTitle: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    followersCount: {
      type: Number
    }
  },

  computed: {
    langImage() {
      return process.env.LANGUAGE_IMAGE_URL + this.decodeLang + ".svg";
    },
    decodeLang() {
      if (this.searchWord == "C#") {
        return "c-sharp";
      } else if (this.searchWord == "C++") {
        return "c-plusplus";
      } else {
        return this.searchWord.toLowerCase().replace(".", "");
      }
    }
  }
};
</script>