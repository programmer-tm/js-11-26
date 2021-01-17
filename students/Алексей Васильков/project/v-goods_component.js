'use strict';

exports.init = function () {
    Vue.component('v-goods', {
        props: ['goods'],
        template: `
            <main>
                <section class="goods container">
                    <v-item v-for="item in goods" v-bind:element="item" v-on:addToCart="handlerAddToCart" />
                    <div class="goods_empty" v-if="!goods.length">
                        <p>Нет данных.</p>
                        <p>Информация, по Вашему запросу, отсутствует.</p>
                    </div>
                </section>
            </main>
        `,
        methods: {
            handlerAddToCart(data) {
                this.$emit('add', data);
            }
        }
    });
}
