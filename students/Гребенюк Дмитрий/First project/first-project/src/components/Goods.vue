<template>
    <main>
        <section class="goods">
            <Item v-for="item in goods" :key="item.title" :element="item" @addTo="add" />
        </section>
    </main>
</template>

<script>
    import Item from './Item.vue'
    export default {
        name: 'Goods',
        props: ['goods'],
        methods: {
            add(data) {
                this.$emit('handle-add', data)
            }
        },
        components: {
            Item
        }
    }

</script>

<style scoped>


</style>
