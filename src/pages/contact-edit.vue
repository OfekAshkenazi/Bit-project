<template  v-if="contactToEdit">
  <h1>{{ getWellcomePara }}</h1>
  <form @submit.prevent="onSave" class="contact-edit">
    <input type="text" v-model="contactToEdit.name" placeholder="name" />
    <input type="text" v-model="contactToEdit.email" placeholder="email" />
    <input
      type="text"
      v-model.number="contactToEdit.phone"
      placeholder="phone"
    />
    <button>Save</button>
  </form>
  <img :src="contactToEdit.imgUrl" alt="" />
</template>

<script>
import { contactService } from "@/services/contact.service.js";
export default {
  data() {
    return {
      contactToEdit: null,
    };
  },
  async created() {
    const contactId = this.$route.params._id;
    if (contactId) {
      this.contactToEdit = await contactService.getContactById(contactId);
    } else {
      this.contactToEdit = contactService.getEmptyContact();
    }
  },
  methods: {
    async onSave() {
      try {
        this.$store.dispatch({
          type: "saveContact",
          contact: this.contactToEdit,
        });
        this.$router.push("/contact");
      } catch (err) {
        console.log("Something went wrong");
        this.$router.push("/contact");
      }
    },
  },
  computed: {
    getWellcomePara() {
      return (this.contactToEdit._id ? "Edit" : "Add") + " Contact";
    },
  },
};
</script>

