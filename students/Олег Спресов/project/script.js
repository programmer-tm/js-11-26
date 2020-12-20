const API = 'https://raw.githubusercontent.com/spoliv/js-11-26/master/students/Олег%20Спресов/responses';


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

    xhr.open('GET', `${API}/${path}`);

    // xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();
  });
}

new Vue({
  el: '#app',
  data: {
    goods: [],
    basketGoods: [],
    searchValue: '',
    isVisible: false,
  },
  mounted() {
    this.fetchData();
    this.fetchBasketData();
  },
  methods: {
    fetchData() {
      return new Promise((resolve, reject) => {
        sendRequest('catalogData.json')
          .then((data) => {
            this.goods = data;
            resolve();
          });
      });
    },
    fetchBasketData() {
      return new Promise((resolve, reject) => {
        sendRequest('getBasket.json')
          .then((data) => {
            this.basketGoods = data.contents;
            // this.amount = data.amount;
            // this.countGoods = data.countGoods;
            resolve();
          });
      });
    },
    addToBasket(item) {
      const index = this.basketGoods.findIndex((basketItem) => basketItem.id_product === item.id_product);
      if (index > -1) {
        this.basketGoods[index].quantity += 1;
        // this.basketGoods[index] = { ...this.basketGoods[index], quantity: this.basketGoods[index].quantity + 1 };
      } else {
        item.quantity = 1;
        this.basketGoods.push(item);
      }
      console.log(this.basketGoods);
    },
    removeItem(id) {
      this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id_product !== parseInt(id));
      console.log(this.basketGoods);
    }
  },
  computed: {
    filteredGoods() {
      const regexp = new RegExp(this.searchValue.trim(), 'i');
      return this.goods.filter((goodsItem) => regexp.test(goodsItem.title));
    },
    totalPrice() {
      return this.goods.reduce((acc, curVal) => {
        return acc + curVal.price;
      }, 0);
    },
    // someComputedProp: {
    //   get() {
    //     return this.name.toUpperCaes();
    //   },
    //   set(value) {
    //     this.name = value.split('/');
    //   }
    // }
  },
})





// Часть кода к ДЗ_4. Вставлять после строки 32


// class GoodsItem {
//     constructor({id_product, title, price, image}){
//         this.id = id_product;
//         this.title = title;
//         this.price = price;
//         this.image = image;
//   }
//   render() {
//     return `<div class="item" data-id="${this.id}">
//         <img src=${this.image} alt="product">
//         <h4 class="prod_name">${this.title}</h4>
//         <p class="prod_price">${this.price} <span>руб.</span></p>
//         <button type="button" class="add_cart" name="add-to-basket">Добавить в <i class="fa fa-shopping-cart"></i></button>
//       </div>`;
//   }
// }
//
//
// class GoodsList {
//   constructor(basket) {
//     this.goods = [];
//     this.filteredGoods = [];
//     this.basket = basket;
//
//     document.querySelector('.goods').addEventListener('click', (event) => {
//       if (event.target.name === 'add-to-basket') {
//         const id = event.target.parentElement.dataset.id;
//         const item = this.goods.find((goodsItem) => goodsItem.id_product === parseInt(id));
//         console.log(item)
//         if (item) {
//           this.addToBasket(item);
//         } else {
//           console.error(`Can't find element with id ${id}`)
//         }
//       }
//     });
//
//     document.querySelector('.search').addEventListener('input', (event) => {
//       this.search(event.target.value);
//     });
//   }
//
//   fetchData() {
//     return new Promise((resolve, reject) => {
//       sendRequest('catalogData.json')
//         .then((data) => {
//           this.goods = data;
//           resolve();
//         });
//     });
//   }
//
//   newFetchData(callback) {
//     fetch(`${API}/catalogData.json`)
//       .then((response) => {
//         console.log(response);
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//         this.goods = data;
//         callback();
//       });
//   }
//
//   addToBasket(item) {
//     this.basket.addItem(item);
//   }
//
//   getTotalPrice() {
//     return this.goods.reduce((acc, curVal) => {
//       return acc + curVal.price;
//     }, 0);
//   }
//
//   render() {
//     const goodsList = this.filteredGoods.map(item => {
//       const goodsItem = new GoodsItem(item);
//       return goodsItem.render();
//     });
//     document.querySelector('.goods').innerHTML = goodsList.join('');
//   }
//   search(value) {
//     const regexp = new RegExp(value.trim(), 'i');
//     this.filteredGoods = this.goods.filter((goodsItem) => regexp.test(goodsItem.title));
//     this.render();
//   }
// }
//
// class Basket {
//   constructor() {
//     this.basketGoods = [];
//     this.amount = 0;
//     this.countGoods = 0;
//
//   }
//
//   addItem(item) {
//     const index = this.basketGoods.findIndex((basketItem) => basketItem.id_product === item.id_product);
//     if (index > -1) {
//       this.basketGoods[index].quantity += 1;
//     } else {
//       item.quantity = 1;
//       this.basketGoods.push(item);
//     }
//     console.log(this.basketGoods);
//   }
//
//   removeItem(id) {
//     this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id_product !== parseInt(id));
//     console.log(this.basketGoods);
//   }
//
//   changeQuantity() {
//
//   }
//
//   clear() {
//
//   }
//
//   fetchData() {
//     return new Promise((resolve, reject) => {
//       sendRequest('getBasket.json')
//         .then((data) => {
//           this.basketGoods = data.contents;
//           this.amount = data.amount;
//           this.countGoods = data.countGoods;
//           console.log(this);
//           resolve();
//         });
//     });
//   }
//
//   applyPromoCode() {
//
//   }
//
//   getDeliveryPrice() {
//
//   }
//
//   createOrder() {
//
//   }
//
//   getTotalPrice() {
//
//   }
//
//   render() {
//
//   }
// }
//
// class BasketItem {
//   constructor({ title }) {
//     this.title = title;
//   }
//
//   changeQuantity() {
//
//   }
//
//   removeItem() {
//   }
//
//   changeType() {
//   }
//
//   render() {
//
//   }
// }
//
// const basket = new Basket();
// basket.fetchData();
// const goodsList = new GoodsList(basket);
// goodsList.fetchData()
//   .then(() => {
//     goodsList.render();
//     goodsList.getTotalPrice();
//   });

