const express = require('express');
const fs = require('fs');
const cors = require('cors');
const {
    clear
} = require('console');

const app = express();

app.use(express.static('./dist'));
app.use(express.json());
app.use(cors());

app.get('/api/data', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Read data.json error!', err);
            res.status(500).send('Server error');
            return;
        }
        res.send(rawData);
    });
});

app.get('/api/dataCart', (req, res) => {
    fs.readFile('./dataCart.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Read dataCart.json error!', err);
            res.status(500).send('Server error');
            return;
        }
        res.send(rawData);
    });
});

app.post('/api/dataCart', (req, res) => {
    fs.readFile('./dataCart.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Read dataCart.json error!', err);
            res.status(500).send('Server error');
            return;
        }

        const basket = JSON.parse(rawData);

        const item = req.body;

        const index = basket.findIndex((basketItem) => basketItem.id_product === item.id_product);
        if (index > -1) {
            basket[index].quantity += 1;
        } else {
            basket.push({
                ...item,
                quantity: 1
            });
        }

        fs.writeFile('./dataCart.json', JSON.stringify(basket), (err) => {
            if (err) {
                console.log('Write dataCart.json error!', err);
                res.status(500).send('Server error');
                return;
            }

            res.json({
                success: true
            });
        });
    });
});

app.delete('/api/dataCart/:id', (req, res) => {
    fs.readFile('./dataCart.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Read dataCart.json error!', err);
            res.status(500).send('Server error');
            return;
        }

        let basket = JSON.parse(rawData);

        const id = parseInt(req.params.id);

        if (id === 0) {
            basket = [];
        } else {
            basket = basket.filter((goodsItem) => goodsItem.id_product !== id);
        }

        fs.writeFile('./dataCart.json', JSON.stringify(basket), (err) => {
            if (err) {
                console.log('Write dataCart.json error!', err);
                res.status(500).send('Server error');
                return;
            }

            res.json({
                success: true
            });
        });
    });
});


app.listen(3000, () => {
    console.log('http://localhost:3000');
});