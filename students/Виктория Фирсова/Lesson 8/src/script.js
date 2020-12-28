const API = 'http://localhost:3000/api';

const sendRequest = (path, method = 'GET', body = {}) => {
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

    xhr.open(method, `${API}/${path}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(body));
  });
}

require('./v-basket-component.js').init();
require('./v-header-component.js').init();
require('./v-goods-component.js').init();
require('./v-item-component.js').init();
require('./v-search-component.js').init();
require('./v-error-component.js').init();

new Vue({
  el: '#app',
  data: {
    goods: [],
    basketGoods: [],
    searchValue: '',
    isVisible: false,
    errorMessage: '',
  },
  mounted() {
    this.fetchData();
    this.fetchBasketData();
  },
  methods: {
    fetchData() {
      return new Promise((resolve, reject) => {
        sendRequest('catalog')
          .then((data) => {
            this.goods = data;
            resolve();
          })
          .catch((error) => {
            this.errorMessage = 'Не удалось получить список товаров!';
          });
      });
    },
    fetchBasketData() {
      return new Promise((resolve, reject) => {
        sendRequest('basket')
          .then((data) => {
            this.basketGoods = data;
            resolve();
          })
          .catch((error) => {
            this.errorMessage = 'Не удалось получить содержимое корзины!';
          });
      });
    },
    addToBasket(item) {
      sendRequest('basket', 'POST', item)
        .then((result) => {
          console.log('Result', result);
          if (!result.success) {
            console.log('addToBasket Error');
            return;
          }

          const index = this.basketGoods.findIndex((basketItem) => basketItem.id === item.id);
          if (index > -1) {
            this.basketGoods[index].quantity += 1;
            // this.basketGoods[index] = { ...this.basketGoods[index], quantity: this.basketGoods[index].quantity + 1 };
          } else {
            this.basketGoods.push({ ...item, quantity: 1 });
          }
        })
        .catch((error) => {
          this.errorMessage = 'Не удалось добавить элемент в корзину!';
        });
    },
    removeItem(id) {
      sendRequest(`basket/${id}`, 'DELETE')
        .then((result) => {
          console.log('Result', result);
          if (!result.success) {
            console.log('addToBasket Error');
            return;
          }

          this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id !== parseInt(id));
          console.log(this.basketGoods);
        })
        .catch((error) => {
          this.errorMessage = 'Не удалось удалить элемент из корзины!';
        });
    },
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
