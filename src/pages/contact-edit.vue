<template  v-if="contactToEdit">
  <h1>{{ getWellcomePara }}</h1>
  <form @submit.prevent="onSave" class="contact-edit">
    <fieldset>
      <legend>Name</legend>
      <input type="text" v-model="contactToEdit.name"  />
    </fieldset>
    <fieldset>
      <legend>Email</legend>
      <input type="text" v-model="contactToEdit.email" />
    </fieldset>
    <fieldset>
      <legend>Phone</legend>
      <input
        type="text"
        v-model.number="contactToEdit.phone"
      />
    </fieldset>
    <button>Save</button>
  </form>
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

