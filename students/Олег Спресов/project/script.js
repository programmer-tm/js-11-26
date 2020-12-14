const API = 'https://raw.githubusercontent.com/spoliv/js-11-26/master/students/Олег%20Спресов/catalogData.json';


const sendRequest = (path) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.timeout = 10000;

    xhr.ontimeout = () => {
      console.log('timeout!');
    }

    xhr.onreadystatechange = () => {
      // console.log('ready state change', xhr.readyState);
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          console.log('Error!', xhr.responseText);
          reject(xhr.responseText);
        }
      }
    }

    xhr.open('GET', `${API}`);

    // xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();
  });
}

class GoodsItem {
    constructor({id_product, title, price, image}){
        this.id = id_product;
        this.title = title;
        this.price = price;
        this.image = image;
  }
  render() {
    return `<div class="item" data-id="${this.id}">
        <img src=${this.image} alt="product">
        <h4 class="prod_name">${this.title}</h4>
        <p class="prod_price">${this.price} <span>руб.</span></p>
        <button type="button" class="add_cart">Добавить в <i class="fa fa-shopping-cart"></i></button>
      </div>`;
  }
}




//   constructor({ id_product, product_name, price }) {
//     this.id = id_product;
//     this.title = product_name;
//     this.price = price;
//   }
//
//   render() {
//     return `
//       <div class="item" data-id="${this.id}">
//         <h4>${this.title}</h4>
//         <p>${this.price}</p>
//         <button type="button" name="add-to-basket">Add to basket</button>
//       </div>
//     `;
//   }
// }

class GoodsList {
  constructor(basket) {
    this.goods = [];
    this.basket = basket;

    document.querySelector('.goods').addEventListener('click', (event) => {
      if (event.target.name === 'add-to-basket') {
        const id = event.target.parentElement.dataset.id;
        const item = this.goods.find((goodsItem) => goodsItem.id_product === parseInt(id));
        if (item) {
          this.addToBasket(item);
        } else {
          console.error(`Can't find element with id ${id}`)
        }
      }
    });
  }

  fetchData() {
    return new Promise((resolve, reject) => {
      sendRequest(`${API}`)
        .then((data) => {
          this.goods = data;
          resolve();
        });
    });
  }

  newFetchData(callback) {
    fetch(`${API}/catalogData.json`)
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

  addToBasket(item) {
    this.basket.addItem(item);
  }

  getTotalPrice() {
    return this.goods.reduce((acc, curVal) => {
      return acc + curVal.price;
    }, 0);
  }

  render() {
    const goodsList = this.goods.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    });
    document.querySelector('.goods').innerHTML = goodsList.join('');
  }
}

class Basket {
  constructor() {
    this.basketGoods = [];
    this.amount = 0;
    this.countGoods = 0;
  }

  addItem(item) {
    this.basketGoods.push(item);
    console.log(this.basketGoods);
  }

  removeItem(id) {
    this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id_product !== parseInt(id));
    console.log(this.basketGoods);
  }

  changeQuantity() {

  }

  clear() {

  }

  fetchData() {
    return new Promise((resolve, reject) => {
      sendRequest('getBasket.json')
        .then((data) => {
          this.basketGoods = data.contents;
          this.amount = data.amount;
          this.countGoods = data.countGoods;
          console.log(this);
          resolve();
        });
    });
  }

  applyPromoCode() {

  }

  getDeliveryPrice() {

  }

  createOrder() {

  }

  getTotalPrice() {

  }

  render() {

  }
}

class BasketItem {
  constructor({ title }) {
    this.title = title;
  }

  changeQuantity() {

  }

  removeItem() {
  }

  changeType() {
  }

  render() {

  }
}

const basket = new Basket();
basket.fetchData();
const goodsList = new GoodsList(basket);
goodsList.fetchData()
  .then(() => {
    goodsList.render();
    goodsList.getTotalPrice();
  });











// class GoodsItem {
//   constructor(title, price, image) {
//     this.title = title;
//     this.price = price;
//     this.image = image;
//   }
//   render() {
//     return `<div class="item">
//         <img src=${this.image} alt="product">
//         <h4 class="prod_name">${this.title}</h4>
//         <p class="prod_price">${this.price} <span>руб.</span></p>
//         <button type="button" class="add_cart">Добавить в <i class="fa fa-shopping-cart"></i></button>
//       </div>`;
//   }
// }
//
//
// class GoodsList {
//     constructor() {
//         this.goods = [];
//     }
//
//     fetchGoods() {
//         this.goods = [
//             {title: 'Лампа', price: 3000, image: 'img/lamp.jpg'},
//             {title: 'Кресло', price: 13000, image: 'img/arm-chair.jpg'},
//             {title: 'Диван', price: 25000, image: 'img/divan.jpg'},
//             {title: 'Торшер', price: 9500, image: 'img/torsher.jpg'},
//             {title: 'Ваза', price: 2000, image: 'img/vase.jpg'},
//             {title: 'Часы', price: 2700, image: 'img/clock.jpg'},
//             {title: 'Ступка керамическая', price: 4300, image: 'img/stupka.jpg'},
//             {title: 'Чайник', price: 1350, image: 'img/kettle.jpg'},
//             {title: 'Стул', price: 2700, image: 'img/chair.jpg'},
//             {title: 'Подвесная лампа', price: 7230, image: 'img/suspended_lamp.jpg'},
//         ];
//     }
//
//     render() {
//         const goodsList = this.goods.map(item => {
//             const goodItem = new GoodsItem(item.title, item.price, item.image);
//             return goodItem.render();
//         });
//         document.querySelector('.goods').innerHTML = goodsList.join('');
//     }
//
//     calculateSumPrices() {
//         let sum_prices = 0;
//         this.goods.forEach(good => {
//             const goodItem = new GoodsItem(good.title, good.price, good.image);
//             sum_prices += goodItem.price;
//         })
//         //return sum_prices
//         console.log(sum_prices)
//     }
// }
//
// class Basket {
//     constructor() {
//         this.basketGoods = [];
//     }
//     render() {
//
//
//     }
//     addToBasket() {
//
//
//     }
//
//     removeFromBasket() {
//
//     }
//
//     editBasket() {
//
//
//     }
//     calculateBasketCost() {
//
//
//     }
// }
//
// class BasketItem {
//     constructor(title, price, quantity=1) {
//         this.title = title;
//         this.price = price;
//         this.quantity = quantity;
//     }
//     render() {
//
//     }
//     editQuantity() {
//
//
//     }
//     calculateItemCost() {
//
//     }
// }
//
//
//
// // const list = new GoodsList();
// // list.fetchGoods();
// // list.render();
// // list.calculateSumPrices();