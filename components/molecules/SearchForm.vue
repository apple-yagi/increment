<template>
  <div>
    <v-row v-if="message" justify="center">
      <v-col cols="12" sm="8" lg="6">
        <v-alert type="error">{{ message }}</v-alert>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10" sm="8" lg="6">
        <v-layout justify-space-between>
          <v-text-field
            v-model="searchWord"
            @keydown.enter="search"
            outlined
            required
          ></v-text-field>

          <v-btn
            :height="54"
            :loading="loading"
            :disabled="loading"
            @click="search"
          >
            <v-icon>mdi-magnify</v-icon>
            <span class="shrink ml-2 hidden-sm-and-down">検索</span>
          </v-btn>
        </v-layout>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "SearchFrom",

  props: {
    loading: {
      type: Boolean,
      required: true
    },
    message: {
      type: String
    }
  },

  data: () => ({
    searchWord: ""
  }),

  methods: {
    search() {
      if (this.searchWord) {
        this.$emit("handleSearch", this.searchWord);
      } else {
        return;
      }
    }
  }
};
</script>
