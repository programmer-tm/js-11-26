<template>
    <div class="basket">
        <section class="basketGoods">
           <ItemBasket v-for="item in basketGoods" :key="item.title" :element="item" @remove="remove" />
        </section>
    </div>
</template>

<script>
    import ItemBasket from './ItemBasket.vue'
    export default {
        name: 'Basket',
        props: ['basketGoods'],
        methods: {
            remove(data) {
                this.$emit('remove', data)
            }
        },
        components: {
            ItemBasket
        }
    }

</script>

<style scoped>


</style>
