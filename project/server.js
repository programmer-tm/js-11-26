const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(express.static('./dist'));
app.use(express.json());
app.use(cors());

app.get('/api/catalog', (req, res) => {
    fs.readFile('./catalog.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Read catalog.json error!', err);
            res.status(500).send('Server error');
            return;
        }
        res.send(rawData);
    });
});

app.get('/api/basket', (req, res) => {
    fs.readFile('./basket.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Read basket.json error!', err);
            res.status(500).send('Server error');
            return;
        }
        res.send(rawData);
    });
});

app.post('/api/basket', (req, res) => {
    fs.readFile('./basket.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Read basket.json error!', err);
            res.status(500).send('Server error');
            return;
        }

        const basket = JSON.parse(rawData);

        const item = req.body;
        
        const index = basket.findIndex((basketItem) => basketItem.id === item.id);
        if (index > -1) {
            basket[index].quantity += 1;
        } else {
            basket.push({ ...item, quantity: 1 });
        }

        fs.writeFile('./basket.json', JSON.stringify(basket), (err) => {
            if (err) {
                console.log('Write basket.json error!', err);
                res.status(500).send('Server error');
                return;
            }
            res.json({ success: true });
        });

    });
});
// addToBasket
// removeFromBasket

app.listen(3000, () => {
    console.log('http://localhost:3000');
});
