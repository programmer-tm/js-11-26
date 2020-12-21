'use strict';

// 1. Привязать добавление товара в корзину к реальному API.
// 2. Добавить API для удаления товара из корзины.
// 3. *Добавить файл stats.json, в котором будет храниться статистика действий пользователя с корзиной. В файле должны быть поля с названием действия (добавлено/удалено), названием товара, с которым производилось действие и временем, когда оно было совершено.


const API_URL = 'https://raw.githubusercontent.com/Dragon-program-sib/js-11-26/master/students/%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B5%D0%B9%20%D0%92%D0%B0%D1%81%D0%B8%D0%BB%D1%8C%D0%BA%D0%BE%D0%B2/project/json/';

const makeGETRequest = (path) => {
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

        xhr.open('GET', `${API_URL}/${path}`);
        xhr.send();
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
        <div class="cart_drop">
            <div class="cart_drop__item" v-for="item in goods">
                <div>
                    <h4 class="cart_drop__item__product_name">{{item.title}}</h4>
                    <p class="cart_drop__item__product_price">{{item.quantity}} x {{item.price}}</p>
                    <p class="cart_drop__item__product_currency" v-html="'\u20bd'"></p>
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
                makeGETRequest('catalogData.json')
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
                makeGETRequest('getCart.json')
                    .then((data) => {
                        this.cartGoods = data.contents;
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
            const index = this.cartGoods.findIndex((cartItem) => cartItem.id_product === item.id_product);
            if(index > -1) {
                this.cartGoods[index].quantity +=1;
            } else{
                this.cartGoods.push(item);
            }
            console.log(this.cartGoods);
        },
        removeItem(id) {
            this.cartGoods = this.cartGoods.filter((goodsItem) =>
            goodsItem.id_product !== parseInt(id));
            console.log(this.cartGoods);
        }
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
});

/*
class GoodsItem {
    constructor({id_product, image, title, price}) {
        this.id = id_product;
        this.image = image;
        this.title = title;
        this.price = price;
    }

    render() {
        return `
            <div class="item" data-id="${this.id}">
                <img class='product_img' src="img/${this.image}" alt="product">
                <h4 class='product_name'>${this.title}</h4>
                <p class='product_price'>${this.price}\n\u20bd</p>
                <button type="button" class="buy_button" name="add-to-cart">Купить</button>
            </div>
        `;
    }
};

class GoodsList {
    constructor(cart) {
        this.goods = [null];
        this.filteredGoods = [null];
        this.cart = cart;

        document.querySelector('.goods').addEventListener('click', (event) => {
            if(event.target.name === 'add-to-cart') {
                const id = event.target.parentElement.dataset.id;
                const item = this.goods.find((goodsItem) => goodsItem.id_product === parseInt(id));
                if(item) {
                    this.addToCart(item);
                } else{
                    console.error(`Элемент, с id ${id}, не найден.`);
                }
            }
        });

        document.querySelector('.search').addEventListener('input', (event) => {
            this.search(event.target.value);
        });
    }

    fetchData() {
        return new Promise((resolve, reject) => {
            makeGETRequest('catalogData.json')
                .then((data) => {
                    this.goods = data;
                    this.filteredGoods = data;
                    resolve();
                });
        });
    }

    newFetchData(callback) {
        fetch(`${API_URL}/catalogData.json`)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.goods = data;
                callback();
            });
    }

    addToCart(item) {
        this.cart.addItem(item);
    }

    getTotalPrice() {
        return this.goods.reduce((acc, curVal) => {
            return acc + curVal.price;
        }, 0);
    }

    render() {
        const goodsList = this.filteredGoods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods').innerHTML = goodsList.join('');
    }

    search(value) {
        const regexp = new RegExp(value.trim(), 'i');
        this.filteredGoods = this.goods.filter((goodsItem) => 
        regexp.test(goodsItem.title));
        this.render();
    }
};

class Cart {
    constructor() {
        this.cartGoods = [null];
        this.totalPrice = 0;
        this.countGoods = 0;
}

    addItem(item) {
        const index = this.cartGoods.findIndex((cartItem) => cartItem.id_product === item.id_product);
        if(index > -1) {
            this.cartGoods[index].quantity +=1;
        } else{
            this.cartGoods.push(item);
        }
        console.log(this.cartGoods);
    }

    removeItem(id) {
        this.cartGoods = this.cartGoods.filter((goodsItem) =>
        goodsItem.id_product !== parseInt(id));
        console.log(this.cartGoods);
    }

    changeQuantity() {

    }

    clear() {

    }

    fetchData() {
        return new Promise((resolve, reject) => {
            makeGETRequest('getCart.json')
                .then((data) => {
                    this.cartGoods = data.contents;
                    this.totalPrice = data.totalPrice;
                    this.countGoods = data.countGoods;
                    console.log(this);
                    resolve();
                });
        });
    }

    applyPromoCode() {

    }

    getDeliverySum() {

    }

    createOrder() {

    }

    getTotalPrice() {

    }

    render() {

    }
};

class CartItem {
    constructor({title}) {
        this.title = title;
    }

    changeQuantity() {

    }

    removeItem() {

    }

    render() {

    }
};

const cart = new Cart();
cart.fetchData();
const goodsList = new GoodsList(cart);
goodsList.fetchData()
    .then(() => {
        goodsList.render();
        goodsList.getTotalPrice();
    });


*/