const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const log = require('./logger.js');

app.use(express.static('./dist'));
app.use(cors());
app.use(express.json());
app.get('/api/catalog', (req, res) => {
    fs.readFile('./catalog.json', 'utf-8', (error, data) => {
        if (error) {
            console.log('Ошибка чтения файла catalog.json', error);
            res.status(500).send('Server error');
            return;
        }
        
        res.send(data);
    })
})
app.get('/api/basket', (req, res) => {
    fs.readFile('./basket.json', 'utf-8', (error, data) => {
        if (error) {
            console.log('Ошибка чтения файла basket.json', error);
            res.status(500).send('Server error');
            return;
        }
        res.send(data)
    })
})
app.post('/api/basket', (req, res) => {
    fs.readFile('./basket.json', 'utf-8', (error, data) => {
        if (error) {
            console.log('Ошибка чтения файла basket.json', error);
            res.status(500).send('Server error');
            return;
        }
        const item = req.body;
        const basket = JSON.parse(data);
        const index = basket.findIndex((basketItem) => basketItem.id === item.id);
        if (index > -1) {
            basket[index].quantity += 1;

        } else {
            basket.push({
                ...item,
                quantity: 1
            });
        }

        fs.writeFile('./basket.json', JSON.stringify(basket), (error) => {
            if (error) {
                console.log('Ошибка записи файла basket.json', error);
                res.status(500).send('Server error');
                return;
            }
            log('ADD', item.id);
            res.send({
                success: true
            });
        });

    });
});
app.post('/api/basket-remove', (req, res) => {
    fs.readFile('./basket.json', 'utf-8', (error, data) => {
        if (error) {
            console.log('Ошибка чтения файла basket.json', error);
            res.status(500).send('Server error');
            return;
        }
        const item = req.body;
        let basket = JSON.parse(data);
        const index = basket.findIndex((basketItem) => basketItem.id === item.id);

        if (index > -1) {
            if (basket[index].quantity > 1) {
                basket[index].quantity -= 1;
            } else {
                basket = basket.filter((goodsItem) => goodsItem.id !== parseInt(item.id));
            }
            console.log(basket);

            // this.basketGoods[index] = { ...this.basketGoods[index], quantity: this.basketGoods[index].quantity + 1 };
        }


        fs.writeFile('./basket.json', JSON.stringify(basket), (error) => {
            if (error) {
                console.log('Ошибка записи файла basket.json', error);
                res.status(500).send('Server error');
                return;
            }
            log('DELETE', item.id);
            res.send({
                success: true
            });
        });

    });
});
app.listen('3000', () => {
    console.log('listening')
})

