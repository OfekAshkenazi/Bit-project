<script>
import AppHeader from "@/cmps/app-header.vue";
import AppFooter from "@/cmps/app-footer.vue";
import UserMsg from "@/cmps/user-msg.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    UserMsg
  },
};
</script>

<template>
  <section class="main-layout">
    <AppHeader />
    <main>
      <RouterView />
    </main>
    <UserMsg />
    <AppFooter />
  </section>
</template>

<style scoped>
main {
  min-height: calc(98vh - 4rem);
}
nav a.router-link-exact-active {
  color: darkolivegreen;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

</style>
