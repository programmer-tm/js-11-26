'use strict';

import makeGETRequest from '../request_module.js';
import '../styles/style.scss';
import '../catalog.json';
import '../cart.json';
import '../server.js';

require('../v-header_component.js').init();
require('../v-error_component.js').init();
require('../v-search_component.js').init();
require('../v-cart_component.js').init();
require('../v-goods_component.js').init();
require('../v-item_component.js').init();

new Vue({
    el: '#app',
    data: {
        goods: [],
        cartGoods: [],
        searchLine: '',
        isVisibleCart: false,
        errorMessage: '',
    },
    mounted() {
        this.fetchData();
        this.fetchCartData();
    },
    methods: {
        fetchData() {
            return new Promise((resolve, reject) => {
                makeGETRequest('catalog')
                    .then((data) => {
                        this.goods = data;
                        resolve();
                    })
                    .catch((error) => {
                        this.errorMessage = 'Не удалось получить, список товаров!'
                    });
            });
        },
        fetchCartData() {
            return new Promise((resolve, reject) => {
                makeGETRequest('cart')
                    .then((data) => {
                        this.cartGoods = data;
                        // this.totalPrice = data.totalPrice;
                        // this.countGoods = data.countGoods;
                        resolve();
                    })
                    .catch((error) => {
                        this.errorMessage = 'Не удалось получить, содержимое корзины!'
                    });
            });
        },
        addToCart(item) {
            makeGETRequest('cart', 'POST', item)
                .then((result) => {
                    console.log('Result', result);
                    if(!result.success) {
                        console.log('addToCart Error');
                        return;
                    }
                    const index = this.cartGoods.findIndex((cartItem) => cartItem.id === item.id);
                    if(index > -1) {
                        this.cartGoods[index].quantity += 1;
                    } else{
                        this.cartGoods.push({ ...item, quantity: 1 });
                    }
                })
                .catch((error) => {
                    this.errorMessage = 'Не удалось добавить, список товаров!';
                });
        },
        removeItem(id) {
            makeGETRequest(`cart/${id}`, 'DELETE')
                .then((result) => {
                    console.log('Result', result);
                    if(!result.success) {
                        console.log('addToCart Error');
                        return;
                    }
                    this.cartGoods = this.cartGoods.filter((goodsItem) => goodsItem.id !== parseInt(id));
                    console.log(this.cartGoods);
                })
                .catch((error) => {
                    this.errorMessage = 'Не удалось удалить, элемент из корзины!';
                });
        },
    },
    computed: {
        filteredGoods() {
            const regexp = new RegExp(this.searchLine.trim(), 'i');
            return this.goods.filter((goodsItem) => 
            regexp.test(goodsItem.title));
        },
        totalPrice() {
            return this.goods.reduce((acc, curVal) => {
                return acc + curVal.price;
            }, 0);
        },
    },
})
