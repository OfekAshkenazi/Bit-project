<template>
  <header class="flex space space-between full">
    <h1>BitWallet</h1>
    <div class="user-info">
      <p>{{ user.name }}</p>
      <p>Balance: {{ user.balance }}</p>
    </div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/contact">Contacts</RouterLink>
      <RouterLink to="/statistics">Statistics</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
</template>

<script>
import { userService } from "../services/user.service.js";
export default {
  data() {
    return {
      user: userService.getUser(),
    };
  },
};
</script>
<style scoped>
a {
  padding: 10px 0px;
  color: whitesmoke;
  font-family: sans-serif;
  font-weight: bold;
}
.router-link-active {
  background-color: #ee7f17;
  color: black;
}
</style>
