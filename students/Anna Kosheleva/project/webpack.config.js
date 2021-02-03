'use strict';

const path = require('path');

module.exports = {
    entry: './dist/script.js',
    output: {
        filename: './dist/bundle.js'
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: ['babel-loader']},
            {test: /\.(png|jpe?g|gif)$/, use: ['file-loader']},
            {test: /\.(scss)$/, use: ['style-loader', 'css-loader', 'sass-loader']}
        ]
    },
    mode: 'production'
}