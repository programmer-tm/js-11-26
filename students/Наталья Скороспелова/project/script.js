class GoodsItems {
constructor({title, price}) {
  this.title = title;
  this.price = price;
}
render() {
  return `
  <div class="item">
    <h4>${this.title}</h4>
    <p>${this.price+ " \u20bd"}</p>
    <button class ="buy">${"Купить"}</button>
  </div>
`; 
}
}


class GoodList {
constructor(){
  this.goods = [];
  this.basket = basket;
}
fetchData(){
  this.goods = [
    { title: 'Ноутбук', price: 30000 },
    { title: 'Клавиатура', price: 1000 },
    { title: 'Мышь', price: 500 },
    { title: 'Монитор', price: 10000 },
  ];
}

addToBasket(item) {
  this.basket.add(item);
}

getTotalPrice() {
  const total = this.goods.reduce((acc, curVal) => acc + curVal.price, 0);

  // let total=0;
  // this.goods.forEach(item => {
  //     total+=item.price;
  //   });
  console.log(total);
  return total;
  
}

render(){
  const goodsList = this.goods.map(item => {
    const goodsItem = new GoodsItems(item);
    return goodsItem.render();

  });
  document.querySelector('.goods').innerHTML = goodsList.join('');

}
}


class Basket {
  constructor() {
    this.BasketGoods = [];
  }

  
  addItem() {

  }

  removeItem() {

  }

  changeQuantity() {

  }

  clear() {

  }

  fetchData() {

  }

  applyPromoCode() {

  }

  getDeliveryPrice() {

  }

  createOrder() {

  }

  getTotalPrice() {

  }
  render(){
  
  }
  
  }
  
  class BasketItem {
    constructor({title}){
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
const goodList = new GoodList(basket);
goodList.fetchData();
goodList.render();
goodList.getTotalPrice();




