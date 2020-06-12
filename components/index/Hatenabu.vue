<template>
  <v-row align="center">
    <v-col cols="12" sm="4">
      <v-sheet class="mx-auto" max-width="200px">
        <a href="https://b.hatena.ne.jp/hotentry/it" target="_blank">
          <v-img src="img/hatenabookmark-logomark.svg" />
        </a>
      </v-sheet>
    </v-col>
    <v-col class="mx-auto" cols="12" sm="8">
      <v-card-title class="font-weight-bold">はてなブックマーク テクノロジー</v-card-title>
      <v-card-text class="text-responsive" align="center">
        はてなブックマークは、オンラインにブックマークを保存・公開することで新しい体験ができる、ソーシャルブックマークです。
        はてなブックマークを利用すると、インターネットの情報をより深く理解でき、良質なページをより少ない時間で見つけられます。
      </v-card-text>
      <v-card-actions>
        <v-row class="mx-auto">
          <v-col cols="12" sm="6" align="center">
            <v-btn
              v-for="(item, i) in hatenabu_items"
              :key="i"
              :href="item.link"
              class="mt-3"
              target="_blank"
              text
            >
              <span class="subtitle-1">{{ item.title }}</span>
              <v-icon>mdi-arrow-right-bold</v-icon>
            </v-btn>
          </v-col>
          <v-col v-observe-visibility="visibilityChanged" cols="12" sm="6">
            <v-layout justify-center>
              <div class="article" :class="{dark: darkMode, light: !darkMode}">
                <div
                  class="box--landscape mt-3 mx-auto"
                  :class="{dark: darkMode, light: !darkMode}"
                />
                <v-row>
                  <v-col cols="6">
                    <div class="box--portrait" :class="{dark: darkMode, light: !darkMode}" />
                  </v-col>
                  <v-col cols="6">
                    <div
                      v-for="i of 5"
                      :key="i"
                      class="my-3"
                      :class="{ sentence: isVisible, dark: darkMode, light: !darkMode }"
                    />
                  </v-col>
                </v-row>
                <div class="mx-auto" style="width: 125px;">
                  <div
                    v-for="i of 3"
                    :key="i"
                    class="mb-2"
                    :class="{ 'sentence--long': isVisible,dark: darkMode, light: !darkMode }"
                  />
                </div>
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
  name: "StackOverflow",

  data: () => ({
    hatenabu_items: [
      {
        title: "人気エントリー",
        link: "https://b.hatena.ne.jp/hotentry/it"
      },
      { title: "新着エントリー", link: "https://b.hatena.ne.jp/entrylist/it" },
      {
        title: "総合の人気エントリー",
        link: "https://b.hatena.ne.jp/hotentry/all"
      },
      {
        title: "ゲームの人気エントリー",
        link: "https://b.hatena.ne.jp/hotentry/game"
      }
    ],
    isVisible: false
  }),
  methods: {
    visibilityChanged(isVisible) {
      this.isVisible = isVisible;
    }
  },

  computed: {
    darkMode() {
      return this.$vuetify.theme.dark;
    }
  }
};
</script>

<style scoped>
.article {
  width: 160px;
  height: 200px;
}

.box--landscape {
  width: 125px;
  height: 30px;
}

.box--portrait {
  width: 60px;
  height: 90px;
  margin-left: 14px;
}

.sentence {
  width: 48px;
  height: 1px;
  animation-name: write;
  animation-duration: 1s;
  animation-fill-mode: both;
}

.sentence--long {
  height: 1px;
  animation-name: write--long;
  animation-duration: 1s;
  animation-delay: 0.3s;
  animation-fill-mode: both;
}

.dark {
  border: solid 2px #aaa;
}

.light {
  border: solid 2px #000;
}

@keyframes write {
  from {
    width: 0px;
  }

  to {
    width: 48px;
  }
}

@keyframes write--long {
  from {
    width: 0px;
  }

  to {
    width: 125px;
  }
}
</style>
