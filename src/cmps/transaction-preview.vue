<template>
  <article class="transaction-preview flex align-center">
   <h4>To: {{transaction.to}}</h4>
   <h4>At: {{transaction.at}}</h4>
   <h4>Amount: {{transaction.amount}}</h4>
  </article>
</template>

<script>
export default {
  props: ["transaction"],
  data() {
    return {};
  },
  methods: {},
  computed: {
   
  },
};
</script>
