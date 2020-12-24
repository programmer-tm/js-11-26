'use strict';

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(express.static('./static'));
app.use(express.json());
app.use(cors());

app.get('/api/products', (req, res) => {
    fs.readFile('./products.json', 'utf-8', (error, rawData) => {
        if (error) {
            console.log('Error reading products.json', error);
            res.status(500).send('Server error');
            return;
        }
        res.send(rawData);
    });
});

app.get('/api/basket', (req, res) => {
    fs.readFile('./basket_items.json', 'utf-8', (error, rawData) => {
        if (error) {
            console.log('Error reading products.json', error);
            res.status(500).send('Server error');
            return;
        }
        res.send(rawData);
    });
});

app.listen(3500, () => {
    console.log('http://localhost:3500/');
});