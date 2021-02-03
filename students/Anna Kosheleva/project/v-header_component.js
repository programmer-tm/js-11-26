'use strict';

exports.init = function () {
    Vue.component('v-header', {
        props: ['isVisibleCart'],
        template: `
            <header class="header center">
                <a class="logo" href="#">E-Shop</a>
                <slot />
                <nav>
                <button class="cart_button" @click="handlerClick" type="button">Корзина</button>
                </nav>
                <slot name="cart" />
            </header>
        `,
        methods: {
            handlerClick() {
                this.$emit('change-is-cart-visible');
            }
        }
    });
}