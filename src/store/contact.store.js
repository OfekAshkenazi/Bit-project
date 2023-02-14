
import { contactService } from '../services/contact.service'

export const contactStore = {
    state: {
        contacts: [],
        lastRemoveContact: null
    },
    getters: {
        contacts({ contacts }) {
            return contacts
        },
    },
    mutations: {
        setContacts(state, { contacts }) {
            state.contacts = contacts
        },
        removeContact(state, { contactId }) {
            const idx = state.contacts.findIndex(c => c._id === contactId)
            state.lastRemoveContact = state.contacts[idx]
            state.contacts.splice(idx, 1)
        },
        undoRemoveContact(state) {
            state.contacts.unshift(state.lastRemoveContact)
            state.lastRemoveContact = null
        },
        clearRemoveContact(state) {
            state.lastRemoveContact = null
        },
        addContact(state, { contact }) {
            state.contacts.unshift(contact)
        },
        updateContact(state, { contact }) {
            const idx = state.contacts.findIndex(c => c._id === contact._id)
            state.contacts.splice(idx, 1, contact)
        },
    },
    actions: {
        async loadContacts({ commit }, payload) {
            try {
                let contacts = payload.contacts
                commit({ type: 'setContacts', contacts })
            } catch (err) {
                console.log('something went wrong..')
                throw err
            }

        },
        async removeContact({ commit }, payload) {
            commit(payload)
            try {
                await contactService.deleteContact(payload.contactId)
                commit({ type: 'clearRemoveContact' })
            } catch (err) {
                commit({ type: 'clearRemoveContact' })
                throw err
            }
        },
        async saveContact({ commit }, { contact }) {
            const type = (contact._id) ? 'updateContact' : 'addContact'
            try {
                const saveContact = await contactService.saveContact(contact)
                commit({ type, contact:saveContact })
            } catch (err) {
                console.log('Something went wrong')
                throw err
            }
        }
    }
}