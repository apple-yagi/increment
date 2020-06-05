<template>
  <v-footer class="grey lighten-3" :class="{ 'blue-grey darken-3': darkMode }" app padless absolute>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        text
        rounded
        class="ma-2"
        :to="item.link"
      >{{ item.name }}</v-btn>
      <v-col
        class="py-4 text-center grey lighten-2"
        :class="{ 'blue-grey darken-4': darkMode }"
        cols="12"
      >
        {{ new Date().getFullYear() }} -
        <strong>Yagi</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",

  props: {
    darkMode: {
      type: Boolean,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  }
};
</script>