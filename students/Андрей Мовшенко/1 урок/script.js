  const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

  const sendRequest = (path) => {
    return new Promise ((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.timeout = 10000;

      xhr.ontimeout = () => {
        console.log('timeout!');
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            console.log('Error!', xhr.responseText);
            reject(xhr.responseText);
          }
        }
      }

      xhr.open('GET', `${API}/${path}`)

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
      fetchData(){
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
          sendRequest('catalogData.json')
            .then((data) => {
              this.goods = data;
              resolve();
            });
        });
      },
      addToBasket(){
        const index = this.basketGoods.findIndex((basketItem) => basketItem.id_product === item.id_product);
        if (index > -1) {
          this.basketGoods[index].quantity += 1;
        } else {
          this.basketGoods.push (item);
        }
        console.log(this.basketGoods);
      },
      removeItem (id){
        this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id_product != parseInt(id));
      },
      handleCartButtonClick(){
        this.isVisible = !this.isVisible;
      }
    },
    computed: {
      filteredGoods() {
        const regexp = new RegExp(this.searchValue.trim(), 'i');
        return this.goods.filter((goodsItem) => regexp.test(goodsItem.product_name));
      },
      totalPrice() {
        return this.goods.reduce((acc, curVal) => {
        return acc + curVal.price;
    }, 0);

      }
    },
  })
 
