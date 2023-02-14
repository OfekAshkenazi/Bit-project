<template>
  <div class="" v:if="marketPrice">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  components: { Bar },
  props: ["marketPrice"],
  data() {
    return {
      chartData: {
        labels: this.marketPrice.values.map((price) =>
          new Date(price.x * 1000).toLocaleDateString()
        ),
        datasets: [
          {
            label: this.marketPrice.name,
            data: this.marketPrice.values.map((price) => price.y),
            backgroundColor: "orange",
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>

<style>
#my-chart-id {
  margin: 0 auto;
  width: 90%;
  max-height: 350px;
}
</style>