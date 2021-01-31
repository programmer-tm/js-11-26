'use strict';

exports.init = function () {
    Vue.component('v-item', {
        props: ['element'],
        template: `
            <div class="item">
                <img class="product_img" :src="element.image" alt="product image" />
                <h4 class="product_name">{{element.title}}</h4>
                <div class="price_block">
                    <p class="product_price">{{element.price}}</p>
                    <p class="product_badge" v-html="'\u20bd'"></p>
                </div>
                <button class="buy_button" type="button" @click="addToCart(item)">Купить</button>
            </div>
        `,
        methods: {
            addToCart() {
                this.$emit('addToCart', this.element);
            }
        }  
    });
}