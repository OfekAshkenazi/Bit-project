<template>
  <div class="main-container">
    <RouterLink :to="`/contact/edit`">
      <button class="action-btn">Add Contact</button>
    </RouterLink>
    <ContactFilter @filter="onSetFilterBy" />
    <ContactList @remove="removeContact" v-if="contacts" :contacts="contacts" />
  </div>
</template>

<script>
import ContactFilter from "@/cmps/contact-filter.vue";
import ContactList from "@/cmps/contact-list.vue";

import { showErrorMsg, showSuccessMsg } from "../services/eventBus.service";

import { contactService } from "../services/contact.service";

export default {
  data() {
    return {
      filterBy: {},
    };
  },
  async created() {
    this.loadContacts();
  },
  methods: {
    async loadContacts() {
      try {
        let contacts = await contactService.getContacts(this.filterBy);
        await this.$store.dispatch({ type: "loadContacts", contacts });
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot load contacts");
      }
    },
    async removeContact(contactId) {
      try {
        showSuccessMsg('Contact has been removed')
        this.$store.dispatch({ type: "removeContact", contactId });
      } catch (err) {
        showErrorMsg('Cannot remove contact')
      }
    },
    onSetFilterBy(filterBy) {
      this.filterBy = filterBy;
      this.loadContacts();
    },
  },
  computed: {
    contacts() {
      return this.$store.state.contactStore.contacts;
    },
  },
  components: {
    ContactList,
    ContactFilter,
  },
};
</script>


