const goods = [
    { title: 'Ноутбук', price: 30000 },
    { title: 'Клавиатура', price: 1000 },
    { title: 'Монитор', price: 10000 },
    { title: 'Мышь', price: 500 },
  ];
  
  const renderGoodsItem = (title = "title", price = "price", link = "#") => {
    return `<div class="goods-item">
    <a class="item__link" href="${link}">
    <img src="img/${title}.jpg" alt="#"></a>
    <h3>${title}</h3>
    <p>${price}</p>
    <button>В корзину</button></div>`;
  };
  
  const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
  }
    
  renderGoodsList(goods);