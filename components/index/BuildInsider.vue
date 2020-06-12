<template>
  <v-row align="center">
    <v-col align="center" cols="12" sm="4">
      <v-sheet class="mx-auto" max-width="300">
        <a href="https://www.buildinsider.net/" target="_blank">
          <v-img v-if="darkMode" src="img/buildInsider-logo-white.png" />
          <v-img v-else src="img/buildInsider-logo-black.png" />
        </a>
      </v-sheet>
    </v-col>
    <v-col cols="12" sm="8">
      <v-card-title>Build Insider</v-card-title>
      <v-card-text class="text-responsive" align="center">
        「次世代Web開発技術」をメインテーマで取り扱い、
        現場で役立つプラクティカルな技術情報、および開発者の知的好奇心をくすぐるハイレベルな技術情報を発信することを目指しているサイト
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col cols="12" sm="8" align="center">
            <v-btn
              v-for="(item, i) in stackoverflow_items"
              :key="i"
              :href="item.link"
              target="_blank"
              text
            >
              <span class="body-2">{{ item.title }}</span>
              <v-icon>mdi-arrow-right-bold</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="4">
            <v-layout class="mt-5" justify-center>
              <div max-width="100px">
                <img v-if="darkMode" width="100" src="img/server-white.png" />
                <img v-else width="100" src="img/server-black.png" />
              </div>
            </v-layout>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "BuildInsider",

  props: {
    darkMode: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    stackoverflow_items: [
      {
        title: "Language",
        link: "https://www.buildinsider.net/language"
      },
      {
        title: "Web Technology",
        link: "https://www.buildinsider.net/web"
      },
      {
        title: "Mobile",
        link: "https://www.buildinsider.net/mobile"
      },
      {
        title: "Device & OSS",
        link: "https://www.buildinsider.net/small"
      },
      {
        title: "Enterprise",
        link: "https://www.buildinsider.net/enterprise"
      },
      {
        title: "Game",
        link: "https://www.buildinsider.net/consumer"
      },
      {
        title: "Hub",
        link: "https://www.buildinsider.net/hub"
      },
      {
        title: "Column",
        link: "https://www.buildinsider.net/column"
      }
    ]
  })
};
</script>