<template v:if="marketPrice">
  <div class="barChart" v:if="marketPrice">
    <LineChart :marketPrice="marketPrice" />
  </div>
  <div class="barChart" v:if="marketPrice">
    <BarChart :marketPrice="marketPrice" />
  </div>
</template>

<script>
import LineChart from "../cmps/chart-js.vue";

import BarChart from "../cmps/chart-js-bars.vue";

import { bitcoinService } from "../services/bitcoin.service.js";
export default {
  data() {
    return {
      marketPrice: "",
      blockSize: "",
    };
  },
  async created() {
    try {
      (this.marketPrice = await bitcoinService.getMarketPriceHistory()),
        (this.blockSize = await bitcoinService.getAvgBlockSize());
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    LineChart,
    BarChart,
  },
};
</script>

<style scoped>
.barChart {
  max-width: 60%;
}
</style>
