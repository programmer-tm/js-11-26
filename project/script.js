const goods = [
  { title: 'Ноутбук', price: 30000 },
  { title: 'Клавиатура', price: 1000 },
  { title: 'Мышь', price: 500 },
  { title: 'Монитор', price: 10000 },
];

const renderGoodsItem = (title = "Колонки", price = 3000) => `
    <div class="item">
    <h4>${title}</h4>
    <p>${price}</p></div>`;
// выше убрал return и {}, также установил значения по умолчани(правда, это не работает, рабочий вариант я так и не понял как сделать).

const renderGoods = (list) => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods').innerHTML = goodsList.join("");
    //так как за счет метода .map мы каждый div class="item" получаем в виде элемента массива, а эмементы массива разделяются запятыми. Применив к массиву метод join(""), мы получам строку и избавляемся от запятой.
};

renderGoods(goods);
