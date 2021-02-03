<template>
    <header>
        <a><div class="logo">E-Shop</div></a>
        <Search class="search" placeholder="Search..." id="search" @input="inputVal" />
        <button class="cart-button" @click="visible">Корзина</button>
        <Basket @remove = "remove" :basketGoods="vBasketGoods" v-show="vVisible"></Basket>
    </header>
</template>

<script>
    import Basket from './Basket.vue'
    import Search from './Search.vue'

    export default {
        name: 'Header',
        props: ['vBasketGoods', 'vVisible', 'search', 'total-price'],
        data() {
            return {
                vSearch: ''
            }
        },
        methods: {
            visible() {
                this.$emit('visible')
            },

            inputVal(data) {
                this.$emit('input', data)
            },
            remove(data) {
                this.$emit('remove', data)
            }
            
        },
        components: {
            Basket,
            Search
        }

    }

</script>
<style scoped>
</style>
