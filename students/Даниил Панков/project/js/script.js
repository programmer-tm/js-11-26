"use sctrict"

const goods = [
    { title: "ACUVUE OASYS", price: 25 },
    { title: "ACUVUE Moist", price: 20 },
    { title: "Cooper Vision", price: 28 },
    { title: "CooperVision Biofinity", price: 28 },
    { title: "CooperVision XR toric", price: 35 },
];

const renderGoodsItem = (title = 'Название товара', price = 'Цена товара') => {
    return `<div class="card mt-3 mr-3 mb-3 ml-3" style="width: 18rem;">
                <img src="..." class="card-img-top item-preview" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <h6 class="card-subtitle mb-2 text-muted">Цена: ${price}$</h6>
                    <a href="#" class="btn btn-primary float-right">Добавить</a>
                </div>
            </div>`;
};

const renderGoodsList = (list = []) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price)).join("");
    document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodsList(goods);