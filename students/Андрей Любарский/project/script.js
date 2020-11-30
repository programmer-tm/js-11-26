const goods = [
    {title: 'Ноутбук', price: 30000},
    {title: 'Клавиатура', price: 1000},
    {title: 'Мышь', price: 500},
    {title: 'Монитор', price: 10000},
];

const renderGoodsItem = (title = 'nameless', price = 100) => {
    return `
      <div class="item">
        <div class="pic"></div>
        <h4>${title}</h4>
        <p>Цена: ${price}</p>
      </div>
    `;
}

const renderGoods = (list) => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price)).join('');
    document.querySelector('.goods').innerHTML = goodsList;

    //goodsList.forEach((el) => document.querySelector('.goods').innerHTML += el); //вариант 2
}

document.querySelector('.cart-button').addEventListener('click', () => {
    renderGoods(goods);
})


