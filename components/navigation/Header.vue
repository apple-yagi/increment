<template>
  <v-app-bar height="60px" app>
    <v-toolbar-title>
      <v-btn to="/">
        <v-icon class="mr-2" style="padding-bottom: 2px;"
          >mdi-plus-circle-multiple-outline</v-icon
        >
        <span class="font-weight-black">Increment</span>
      </v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <div v-if="width > 767">
      <v-btn
        class="mr-3"
        v-for="(item, i) in items"
        :key="i"
        :to="item.link"
        text
      >
        <v-icon>{{ item.icon }}</v-icon>
        <span>{{ item.name }}</span>
      </v-btn>
    </div>

    <v-switch
      v-if="width > 414"
      class="pt-6"
      v-model="$vuetify.theme.dark"
      inset
      label="dark mode"
    ></v-switch>
    <v-checkbox
      v-else
      class="pt-6"
      v-model="$vuetify.theme.dark"
      label="dark mode"
    ></v-checkbox>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",

  props: {
    items: {
      type: Array,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  }
};
</script>
