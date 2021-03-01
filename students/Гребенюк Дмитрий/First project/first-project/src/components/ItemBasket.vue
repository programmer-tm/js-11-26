<template>
    <div class="itemBasket">
        <h4>{{element.title}}</h4>
        <p>Стоимость - {{element.price}}</p>
        <p>Количество - {{element.quantity}}</p>
        <button @click="remove" class="remove"> Remove</button>
    </div>
</template>

<script>
    export default {
        name: 'ItemBasket',
        props: ['element'],
        methods: {
           remove() {
                this.$emit('remove', this.element)
            }
        }
    }

</script>
<style scoped>
   
</style>
