'use strict';

// 1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
// 2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.

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
