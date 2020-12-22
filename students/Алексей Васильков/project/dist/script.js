'use strict';

// 1. Привязать добавление товара в корзину к реальному API.
// 2. Добавить API для удаления товара из корзины.
// 3. *Добавить файл stats.json, в котором будет храниться статистика действий пользователя с корзиной. В файле должны быть поля с названием действия (добавлено/удалено), названием товара, с которым производилось действие и временем, когда оно было совершено.


const API_URL = 'http://localhost:3000/api';

const makeGETRequest = (path, method = 'GET', body = {}) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.timeout = 5000;

        xhr.ontimeout = () => {
            console.log('Timeout!');
        }

        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else{
                    console.log('Error!', xhr.responseText);
                    reject(xhr.responseText);
                }
            }
        }

        xhr.open(method, `${API_URL}/${path}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(body));
    });
};

Vue.component('v-header', {
    props: ['isVisibleCart'],
    template: `
        <header class="header center">
            <a class="logo" href="#">E-Shop</a>
            <slot />
            <button class="cart_button" @click="handlerClick" type="button">Корзина</button>
            <slot name="cart" />
        </header>
    `,
    methods: {
        handlerClick() {
            this.$emit('change-is-cart-visible');
        }
    }
});

Vue.component('v-error', {
    props: ['message'],
    template: `
        <div class="error">
            Ошибка! {{message}}
        </div>
    `,
});

Vue.component('v-search', {
    props: ['value'],
    template: `
        <form>
            <input class="search" :value="value" @input="$emit('input', $event.target.value)" type="text" placeholder="Что будем искать?">
            <button class="search_button" @click="filteredGoods()">Найти</button>
        </form>
    `,
});

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
