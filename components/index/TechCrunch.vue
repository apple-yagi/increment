<template>
  <v-row align="center">
    <v-col cols="12" sm="4">
      <v-sheet class="mx-auto" max-width="200px">
        <a href="https://jp.techcrunch.com/" target="_blank">
          <v-img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TechCrunch_logo.svg/440px-TechCrunch_logo.svg.png"
          />
        </a>
      </v-sheet>
    </v-col>
    <v-col class="mx-auto" cols="12" sm="8">
      <v-card-title class="font-weight-bold">TechCrunch Japan</v-card-title>
      <v-card-text>TechCrunch（テッククランチ）は、アメリカのブログサイト（ニュースサイト）であり、主にIT系のスタートアップ（ベンチャー）やWebに関するニュースを配信している</v-card-text>
      <v-card-actions>
        <v-row class="mx-auto">
          <v-col align="center" cols="12" sm="6">
            <v-btn
              v-for="(item, i) in techcrunch_items"
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
          <v-col cols="12" sm="4">
            <div class="mx-auto">
              <v-layout class="mt-10" justify-space-around>
                <v-btn
                  icon
                  color="blue lighten-2"
                  href="https://twitter.com/jptechcrunch"
                  target="_blank"
                >
                  <v-icon x-large>mdi-twitter</v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="indigo"
                  href="https://www.facebook.com/techcrunchjapan"
                  target="_blank"
                >
                  <v-icon x-large>mdi-facebook</v-icon>
                </v-btn>
              </v-layout>
            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "TechCrunch",

  data: () => ({
    techcrunch_items: [
      { title: "新着記事", link: "https://jp.techcrunch.com/" },
      { title: "人気記事", link: "https://jp.techcrunch.com/popular/" },
      { title: "連載記事", link: "https://jp.techcrunch.com/series/" },
      {
        title: "フィンテック",
        link: "https://jp.techcrunch.com/news/fintech/"
      },
      {
        title: "ブロックチェーン",
        link: "https://jp.techcrunch.com/news/blockchain/"
      },
      { title: "人工知能・AI", link: "https://jp.techcrunch.com/news/ai/" }
    ]
  })
};
</script>