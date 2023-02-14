<template>
  <div v-if="contact" class="contact-details">
    <h2>{{ contact.name }}</h2>
    <p>{{ contact.email }}</p>
    <p>{{ contact.phone }}</p>
    <img :src="contact.imgUrl" alt="" />
    <div class="flex space-between align-center">
      <RouterLink to="/contact">
        <button class="action-btn">Back</button>
      </RouterLink>
      <button v-on:click="toggleTransactionModal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"
          />
        </svg>
      </button>
    </div>
  </div>
  <section v-if="transactionModalDisplay && contact" >
    <Transaction :contact="contact"/>
  </section>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
import  Transaction  from "../cmps/transactions.vue";
export default {
  data() {
    return {
      contact: null,
      transactionModalDisplay: false,
    };
  },
  async created() {
    const contactId = this.$route.params._id;
    this.contact = await contactService.getContactById(contactId);
  },
  methods: {
    toggleTransactionModal() {
      this.transactionModalDisplay
        ? (this.transactionModalDisplay = false)
        : (this.transactionModalDisplay = true);
    },
  },
  components: {
    Transaction
  }
};
</script>

