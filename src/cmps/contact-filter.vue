<template>
  <fieldset class="contact-filter">
    <legend>Search</legend>
    <input
      @input="onFilter"
      v-model="filterBy.txt"
      type="text"
      placeholder="By Name"
    />
  </fieldset>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        txt: "",
      },
    };
  },
  methods: {
    onFilter() {
      this.$emit("filter", this.filterBy);
    },
  },
};
</script>


