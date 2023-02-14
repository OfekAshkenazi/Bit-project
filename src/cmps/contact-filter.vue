<template>
    <div class="contact-filter">
        <p>Search</p>
        <input @input="onFilter" v-model="filterBy.txt" type="text" placeholder="By Name">
    </div>
</template>

<script>
export default {
    data() {
        return {
            filterBy: {
                txt: '',
            }
        }
    },
    methods: {
        onFilter() {
            this.$emit('filter', this.filterBy)
        }
    }
}
</script>


