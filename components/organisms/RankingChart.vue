<template>
  <v-card>
    <v-card-subtitle class="font-weight-bold">
      <v-icon>mdi-chart-line</v-icon>
      <span class="ml-2">{{ title }}</span>
    </v-card-subtitle>
    <bar-chart v-if="width > 768" :data="chartdata" :options="options" />
    <horizontal-bar-chart v-else :data="chartdata" :options="options" />
  </v-card>
</template>

<script>
import BarChart from "@/components/graph/BarChart.vue";
import HorizontalBarChart from "@/components/graph/HorizontalBarChart.vue";

export default {
  components: {
    BarChart,
    HorizontalBarChart
  },

  props: {
    data: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    darkMode: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: 0
              }
            }
          ]
        }
      },
      width: process.client ? window.innerWidth : 0
    };
  },

  computed: {
    chartdata() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            backgroundColor: this.darkMode ? "#00BFA5" : "#9FA8DA",
            data: this.data
          }
        ]
      };
    }
  },

  created() {
    this.handleResize();
  },

  methods: {
    handleResize() {
      if (process.client) {
        this.width = window.innerWidth;
      }
    }
  },

  mounted() {
    if (process.client) {
      window.addEventListener("resize", this.handleResize);
    }
  },

  beforeDestroy() {
    if (process.client) {
      window.removeEventListener("resize", this.handleResize);
    }
  }
};
</script>
