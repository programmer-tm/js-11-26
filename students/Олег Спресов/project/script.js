const goods = [
  { title: 'Лампа', price: 3000, image: 'img/lamp.jpg' },
  { title: 'Кресло', price: 13000, image: 'img/arm-chair.jpg' },
  { title: 'Диван', price: 25000, image: 'img/divan.jpg' },
  { title: 'Торшер', price: 9500, image: 'img/torsher.jpg' },
  { title: 'Ваза', price: 2000, image: 'img/vase.jpg' },
  { title: 'Часы', price: 2700, image: 'img/clock.jpg' },
  { title: 'Ступка керамическая', price: 4300, image: 'img/stupka.jpg' },
  { title: 'Чайник', price: 1350, image: 'img/kettle.jpg' },
  { title: 'Стул', price: 2700, image: 'img/chair.jpg' },
  { title: 'Подвесная лампа', price: 7230, image: 'img/suspended_lamp.jpg' },
];

const renderGoodsItem = (title, price, image) => {
    return `
      <div class="item">
        <img src=${image} alt="product">
        <h4 class="prod_name">${title}</h4>
        <p class="prod_price">${price} <span>руб.</span></p>
        <button type="button" class="add_cart">Добавить в <i class="fa fa-shopping-cart"></i></button>
      </div>
    `;
}

const renderGoods = list => {
/* map вернет массив из div-ов, ссылка на который помещается в переменную goodsList*/
  const goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.image));
/* Далее  js неявно приводит массив к строке, используя запятую в качестве разделителя по умолчанию.
   Для приведения массива в строку без запятой перед установкой innerHTML добавляем join('')*/
  document.querySelector('.goods').innerHTML = goodsList.join('');
}

renderGoods(goods);
