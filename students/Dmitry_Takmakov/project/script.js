'use strict';

const products = [{
        title: "Alphazone - Rockin'",
        price: 500,
        cover: "static/images/alphazone-rockin.jpg"
    },
    {
        title: "Mayhem - Distorted Soul",
        price: 400,
        cover: "static/images/mayhem-distorted_soul.jpg"
    },
    {
        title: "Marcos & J K Walker - DayKeeper",
        price: 600,
        cover: "static/images/marcos_jk_walker-daykeeper.jpg"
    },
    {
        title: "Planet Punk - Troja.wav",
        price: 400,
        cover: "static/images/planet_punk-trojawav.jpg"
    },
    {
        title: "Cominotto - Species",
        price: 300,
        cover: "static/images/cominotto-species.jpg"
    }
];

const renderProduct = (title = 'no record', price = 0, cover = 'static/images/default.jpg') => {
    return `<div class="card" style="width: 18rem;">
                <img src="${cover}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">Record price: ${price}</p>
                    <a href="#" class="btn btn-primary"><i class="fas fa-cart-plus"></i> Add to cart</a>
                </div>
            </div>`;
};

const renderProductList = (list) => {
    let productsList = list.map(product => renderProduct(product.title, product.price, product.cover));
    document.querySelector('.products_list').innerHTML = productsList.join("");
};

renderProductList(products);