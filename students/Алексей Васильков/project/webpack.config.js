'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
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
            {test: /\.s[ac]ss$/, use: ['style-loader', 'css-loader', 'sass-loader']}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './dist/index.html',
            filename: './dist/dist/index.html'
        })
    ],
    mode: 'production'
}
