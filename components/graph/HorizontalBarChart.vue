<script>
import { HorizontalBar } from "vue-chartjs";

export default {
  extends: HorizontalBar,

  props: ["data", "options"],

  mounted() {
    this.$refs.canvas.height = 20 * 30;
    this.renderChart(this.data, this.options);
  }
};
</script>
