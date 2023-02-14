<template>
  <section class="home">
    <button
      class="btn-signup-login"
      style="width: 250px"
      v-on:click="toggleNeedToBeDisplay"
    >
      Geting start
    </button>

    <div class="user-info-home" v-if="user">
      <p>{{ user.fullname }}</p>
      <div class="flex space-between">
        <p>Balance</p>
        <p>{{ user.balance }}</p>
      </div>
      <div class="flex space-between">
        <p>Transactions That Made</p>
        <p>{{ user.transactions.length }}</p>
      </div>
      <div class="flex space-between">
        <p>Bitcoin Exchange Rate</p>
        <p>{{ exchangeRate }}</p>
      </div>
    </div>

    <section class="user-modal-area" v-if="needToBeDisplay">
      <UserModalInfo @logged="toggleNeedToBeDisplay" />
    </section>

    <section class="user-transactions" v-if="user">
      <UserTransactionsList :transactions="user.transactions" />
    </section>
  </section>
</template>

<script>
import { bitcoinService } from "../services/bitcoin.service.js";
import { userService } from "../services/user.service.js";

import UserModalInfo from "../cmps/login-signup-modal.vue";
import UserTransactionsList from "../cmps/user-transactions-List.vue";

export default {
  data() {
    return {
      user: "",
      exchangeRate: "",
      needToBeDisplay: false,
    };
  },
  async created() {
    this.exchangeRate = await bitcoinService.getRate();
    let userId = userService.getLoggedinUser()._id;
    let user = await userService.getById(userId);
    this.user = user;
  },
  methods: {
    toggleNeedToBeDisplay() {
      this.needToBeDisplay
        ? (this.needToBeDisplay = false)
        : (this.needToBeDisplay = true);
    },
  },
  components: {
    UserModalInfo,
    UserTransactionsList,
  },
};
</script>

<style>
</style>
