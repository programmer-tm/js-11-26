const goods = [{
  title: 'Ноутбук',
  price: 30000
}, {
  title: 'Клавиатура',
  price: 1000
}, {
  title: 'Мышь',
  price: 500
}, {
  title: 'Монитор',
  price: 10000
}, ];

const eachGoodsItem = (title, price = 'Под заказ') =>
  `
  <div class="uk-card item">
    <h5 class="uk-card-title">${title}</h5>
    <p>${price}</p>
    <button class="center uk-button uk-button-small">Купить</button>
  </div>
`;

const renderGoods = (list = []) => {
  const goodsList = list.map(item => eachGoodsItem(item.title, item.price));
  document.querySelector('.goods').innerHTML = goodsList.join('');
};

renderGoods(goods);