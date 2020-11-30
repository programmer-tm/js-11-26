/*const goods = [
    { title: 'Ноутбук', price: 30000 },
    { title: 'Клавиатура', price: 1000 },
    { title: 'Мышь', price: 500 },
    { title: 'Монитор', price: 10000 },
  ];
  */
  const renderGoodsItem = (title = 'product', price = 100) => 
       `<div class="item">
          <h4>${title}</h4>
          <p>${price} рублей</p>
          <button class = 'buy'>купить</button>
        </div>
      `;
  
  
  const renderGoods = (list) => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods').innerHTML = goodsList.join('');
  }
  
  renderGoods([
    { title: 'Ноутбук', price: 30000 },
    { title: 'Клавиатура', price: 1000 },
    { title: 'Мышь', price: 500 },
    { title: 'Монитор', price: 10000 },
  ]);
  