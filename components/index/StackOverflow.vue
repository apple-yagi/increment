<template>
  <v-container>
    <v-card outlined>
      <v-row align="center">
        <v-col class="mx-auto" cols="12" sm="4">
          <a href="https://ja.stackoverflow.com/" target="_blank">
            <v-img
              src="https://cdn.icon-icons.com/icons2/1488/PNG/512/5333-stackoverflow_102532.png"
            />
          </a>
        </v-col>
        <v-col class="mx-auto" cols="12" sm="8">
          <v-card-title>Stack Overflow</v-card-title>
          <v-card-text
            >Stack Overflow（スタックオーバーフロー）はStack Exchange
            Networkの一つでコンピュータや情報技術、特にプログラミング技術に関するナレッジコミュニティである。</v-card-text
          >
          <h4 class="title">
            <a href="https://insights.stackoverflow.com/survey/2020"
              >2020 Developer Survey</a
            >
          </h4>
          <v-card-actions>
            <v-row>
              <v-col cols="12" sm="8">
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
                <v-layout class="mt-10" justify-center>
                  <v-img class="gear-img" max-width="100px" src="/gear.png" />
                </v-layout>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "StackOverflow",

  data: () => ({
    stackoverflow_items: [
      {
        title: "Most Popular Technologies",
        link:
          "https://insights.stackoverflow.com/survey/2020#most-popular-technologies"
      },
      {
        title: "Most Loved, Dreaded, and Wanted",
        link:
          "https://insights.stackoverflow.com/survey/2020#most-loved-dreaded-and-wanted"
      },
      {
        title: "Development Environments and Tools",
        link:
          "https://insights.stackoverflow.com/survey/2020#development-environments-and-tools"
      },
      {
        title: "Top Paying Technologies",
        link:
          "https://insights.stackoverflow.com/survey/2020#top-paying-technologies"
      },
      {
        title: "Correlated Technologies",
        link:
          "https://insights.stackoverflow.com/survey/2020#correlated-technologies"
      },
      {
        title: "Learning & Problem Solving",
        link:
          "https://insights.stackoverflow.com/survey/2020#learning--problem-solving"
      }
    ]
  })
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #aaa;
}

.gear-img {
  animation: 10s infinite alternate forwards running rotation;
}

@keyframes rotation {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
