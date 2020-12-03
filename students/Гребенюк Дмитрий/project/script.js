const goods = [
  { title: 'Ноутбук', price: 30000 },
  { title: 'Клавиатура', price: 1000 },
  { title: 'Мышь', price: 500 },
  { title: 'Монитор', price: 10000 },
];

const renderGoodsItem = (title = "Название", price = "Цена") => {
    return `
      <div class="item">
        <h4>${title}</h4>
        <p>${price}</p>
      </div>
    `;
}

const renderGoods = (list = "Массив объектов") => {
    document.querySelector('.goods').innerHTML = list.map(item => renderGoodsItem(item.title, item.price)).join("");
    
    
}

renderGoods(goods);
