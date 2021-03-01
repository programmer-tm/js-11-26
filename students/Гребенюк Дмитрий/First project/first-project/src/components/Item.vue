<template>
    <div class="item">
        <h4>{{element.title}}</h4>
        <p>{{element.price}}</p>
        <button @click="addToBasket" class="add-to-basket"> Add to basket</button>
    </div>
</template>

<script>
    export default {
        name: 'Item',
        props: ['element'],
        methods: {
            addToBasket() {
                this.$emit('addTo', this.element)
            }
        }
    }

</script>
<style scoped>
   

</style>
