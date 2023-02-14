<template>
  <TransitionGroup name="list" tag="ul" class="transaction-list">
    <h1>Recent transactions</h1>
    <li v-for="transaction in user.transactions" :key="transaction._id">
      <TransactionPreview :transaction="transaction" />
    </li>
  </TransitionGroup>
</template>

<script>
import { userService } from "../services/user.service";

import TransactionPreview from "../cmps/transaction-preview.vue";

export default {
  data() {
    return {
      user: "",
    };
  },
  async created() {
    let userId = userService.getLoggedinUser()._id;
    let user = await userService.getById(userId);
    this.user = user;
  },
  components: {
    TransactionPreview,
  },
};
</script>

