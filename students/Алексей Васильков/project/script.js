'use strict';

// 1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
// 2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.

const API = 'https://raw.githubusercontent.com/Dragon-program-sib/js-11-26/b1a82e65ae9e7f55ac17f6cf010531076b91ec3a/students/%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B5%D0%B9%20%D0%92%D0%B0%D1%81%D0%B8%D0%BB%D1%8C%D0%BA%D0%BE%D0%B2/project/data.json';

class GoodsItem {
    constructor({image, title, price}) {
        this.image = image;
        this.title = title;
        this.price = price;
    }

    render() {
        return `
            <div class="item">
                <img class='product_img' src="img/${this.image}" alt="">
                <h4 class='product_name'>${this.title}</h4>
                <p class='product_price'>${this.price}\n\u20bd</p>
                <button type="button" class="buy_button">Купить</button>
            </div>
        `;
        }
};

class GoodsList {
    constructor() {
        this.goods = [null];
        this.cart = cart;
    }

    fetchData() {
        this.goods = [
            {image: 'nout.jpg', title: 'Ноутбук', price: 30000},
            {image: 'keyboard.jpg', title: 'Клавиатура', price: 1000},
            {image: 'mouse.jpg', title: 'Мышь', price: 500},
            {image: 'monitor.jpg', title: 'Монитор', price: 10000}
    ];
    }

    addToCart(item) {
        this.cart.add(item);
    }

    getTotalPrice() {
        let total = 0;
        this.goods.forEach(function(elem) {
            return (total += elem.price);
        });
        console.log(total);
        return total;
    }

    render() {
        const goodsList = this.goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods').innerHTML = goodsList.join('');
    }
};

class Cart {
    constructor() {
        this.cartGoods = [null];
}

    addItem() {

    }

    removeItem() {

    }

    clear() {

    }

    applyPromoCode() {

    }

    getDeliverySum() {

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
const goodsList = new GoodsList(cart);
goodsList.fetchData();
goodsList.render();
goodsList.getTotalPrice();
