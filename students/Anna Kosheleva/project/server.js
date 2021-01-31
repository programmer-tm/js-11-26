'use strict';

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const logger = require('./logger');

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

app.get('/api/cart', (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Read cart.json error!', err);
            res.status(500).send('Server error');
            return;
        }
        res.send(rawData);
    });
});

app.post('/api/cart', (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Read cart.json error!', err);
            res.status(500).send('Server error');
            return;
        }

        const cart = JSON.parse(rawData);

        const item = req.body;

        const index = cart.findIndex((cartItem) => cartItem.id === item.id);
          if (index > -1) {
            cart[index].quantity += 1;
          } else {
            cart.push({ ...item, quantity: 1 });
          }

          fs.writeFile('./cart.json', JSON.stringify(cart), (err) => {
            if (err) {
                console.log('Write cart.json error!', err);
                res.status(500).send('Server error');
                return;
            }
            logger('ADD', item.id);

            res.json({ success: true });
          }); 
    });
});

app.delete('/api/cart/:id', (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Read basket.json error!', err);
            res.status(500).send('Server error');
            return;
        }

        let cart = JSON.parse(rawData);

        const id = parseInt(req.params.id);
        
        cart = cart.filter((goodsItem) => goodsItem.id !== id);

        fs.writeFile('./cart.json', JSON.stringify(cart), (err) => {
            if (err) {
                console.log('Write cart.json error!', err);
                res.status(500).send('Server error');
                return;
            }
            logger('REMOVE', id);

            res.json({ success: true });
        });

    });
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});