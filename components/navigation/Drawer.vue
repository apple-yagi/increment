<template>
  <div>
    <v-btn class="toggle-btn" @click.stop="drawer = !drawer" fab dark :color="btnColor">
      <v-icon dark>mdi-format-list-bulleted-square</v-icon>
    </v-btn>
    <v-navigation-drawer v-model="drawer" :height="drawerHeight" fixed bottom temporary>
      <v-list dense>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Drawer",

  props: {
    items: {
      type: Array,
      required: true
    },
    darkMode: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    drawer: false
  }),

  computed: {
    drawerHeight() {
      return this.items.length * 50;
    },
    btnColor() {
      return this.darkMode ? "purple" : "indigo";
    }
  }
};
</script>
