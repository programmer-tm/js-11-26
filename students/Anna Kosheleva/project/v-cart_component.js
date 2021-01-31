'use strict';

exports.init = function () {
    Vue.component('v-cart', {
        props: ['goods'],
        template: `
            <div class="cart_container">
                <div class="cart_drop">
                    <div class="cart_drop__item" v-for="item in goods">
                            <h4 class="cart_drop__item__product_name">{{item.title}}</h4>
                            <p class="cart_drop__item__product_price">{{item.quantity}} x {{item.price}}</p>
                            <p class="cart_drop__item__product_currency" v-html="'\u20bd'"></p>
                            <button class="cart_drop__item__button_delete" @click="$emit('delete', item.id)">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
    });
}