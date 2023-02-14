<template>
<div class="" v:if="marketPrice">
  <Line :data="lineChartData" :options="lineChartOptions" />
</div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
export default {
  components: {
    Line
  },
  props: ['marketPrice'],
  data() {
    return {
      lineChartOptions: {
        responsive: true,
      },
      lineChartData: {
        labels: this.marketPrice.values.map((d: { x: number }) => new Date(d.x * 1000).toLocaleDateString()),
        datasets: [
          {
            label: this.marketPrice.name,
            data: this.marketPrice.values.map((d: { y: any }) => d.y ),
            borderColor: 'blue',
          }
        ]
      }
    }
  },
}
</script>
