//... Declarations
var itemList = document.querySelector('.goods');
var filter = document.getElementById('filter');
var user = document.getElementById('user');
const API = 'https://raw.githubusercontent.com/vl-gbr/js-11-26/master/students/Vitaly%20Lenkin/pro/s03eshop/data';

filter.addEventListener('keyup', filterItems);
user.addEventListener('click', login);


//!
//... Data Base
var goods = [];

function getData (dataPath) {

   var xhttp = new XMLHttpRequest();
   //!... При синхронизации Таймаут устанавливать нельзя
   // xhttp.timeout = 10000;
   // xhttp.ontimeout = () => {
   //    console.log('timeout!');
   // }
   let responce = {};
   xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         // var response;
         response = JSON.parse(xhttp.response);
         // goods = response.goods;      
      } 
   };

   // xhttp.open("GET", "https://raw.githubusercontent.com/vl-gbr/js-11-26/master/students/Vitaly%20Lenkin/pro/s03eshop/data/goods.json", true);
   //! Параметр 'false' используется для синхронизации асинхронной функции (устаревший метод). [Deprecation] Synchronous XMLHttpRequest...
   xhttp.open("GET", `${API}/${dataPath}`, false);
   //!... При синхронизации responseType устанавливать нельзя
   // xhttp.responseType = 'json';         
   xhttp.send();
   
   return response.goods;
};

// Filter Items
function filterItems(e){
   // Convert to lowercase
   var text = e.target.value.toLowerCase();
   // Get list
   var items = itemList.querySelectorAll('.card');
   // Convert to an array
   Array.from(items).forEach(function(item){
      var itemName = item.querySelector('.card-title').textContent;
      if(itemName.toLowerCase().indexOf(text) != -1){
         item.style.display = 'block';
         // item.style.display = '';
      } else {
         item.style.display = 'none';
      }
   });
}

//
//... класс Продукт
class ProductClass {
   
   constructor({
      title,
      price,
      image
   }) {
      this.title = title;
      this.price = price ? price : 'Под заказ';
      this.image = image;
   }
   
   wrap() {
      return `
      <!-- Product -->
      <div class="card">
      <a class="card-link" href="#">
      <img src="images/${(this.image) ? this.image: 'nophoto.png'}" alt="photo product-1" class="card-img">
      </a>
      <div class="card-info">
      <a href="" class="card-title">${this.title}</a>
      <div class="card-descr"></div>
      <div class="card-price">${this.price}
      <img src="images/stars.png" alt="Raiting stars" class="card-stars">
      </div>
      </div>
      <a href="#" class="add-to-cart">Add to Cart</a>
      </div>
      `;
   }
}
//... класс Галерея продуктов
class ProductGalleryClass {
   constructor(list = []) {
      this.productList = list;
   }
   render() {
      
      const productList = this.productList.map(item => new ProductClass(item).wrap());
      document.querySelector('.goods').innerHTML += productList.join('');
      
   }
   getTotal() {
      return this.productList.reduce(
         (acc, curVal) => { return acc + curVal.price; }, 0);
      }
   }
   
   //... Main block
   var goods = getData("goods.json");
   // console.log(goods);
   const goodsList = new ProductGalleryClass(goods);
   goodsList.render();
   goodsList.getTotal();
   
   
//
//... Реализация корзины
const 
   selectedList = [],
   compareList = [],    //TODO нужен класс для объекта Сравнение товаров
   favorityList = [];   //TODO нужен класс для объекта Избранное


class Cart {
   constructor() {
      this.list = [];
      this.total = 0;
      this.pos = 0;
      this.id = null;   //reserved
      this.orderNo = null;
      this.orderId = null;
   }
 
   render() {}
   addItem() {}
   addSelected() {}
   deleteItem() {}
   deleteSelected() {}
   deleteAll() {}
   toShop() {}
   toOrder() {}
   showItem() {}
   createFromOrder() {}
   help() {}
   cancelCart() {}
   sortItems() {}
 }
 
class CartItem {
   constructor(product, qty) {
      this.product = product;
      this.qty = qty;
   }
   stockLimit() {}
   stockQty() {}
   stockDelay() {}
   stockCheck() {} 
   render() {}
}

function login(e) {

}