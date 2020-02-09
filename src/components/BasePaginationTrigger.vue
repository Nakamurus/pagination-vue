<template>
<!-- this shows the page number passed from the BasePagination component
     and emit an event when the user clicks on a specific number.
-->
    <button
      class="base-pagination-trigger"
      @click="onClick"
    >
    {{ pageNumber }}
    </button>
</template>

<script>
export default {
    props: {
        pageNumber: {
            type: Number,
            required: true
        }
    },

    methods: {
        onClick() {
            // $emit is used for sending custom events from child components
            // to parents.
            // https://www.quora.com/What-s-the-purpose-of-emit-in-vue-js-Where-can-I-find-more-proper-examples-of-its-use
            this.$emit('loadPage', this.pageNumber);
        }
    }
};
</script>

<style lang="scss" module>
$c-primary-accent--dark: #dd8346;

.base-pagination-trigger {
    cursor: pointer;
    transition: all 300ms ease;

    &:hover {
        color: $c-primary-accent--dark;
    }
}
</style>