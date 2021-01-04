const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './script.js',
    output: {
        filename: './bundle.js'
    },
    module: {
        rules: [
            // изображения
            // {
            //     test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
            //     type: 'asset/resource',
            //
            //
            // },

            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            // {
            //     test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
            //     type: 'asset/inline',
            // },

            // изображения
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],

    },
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: './dist',
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'E-Shop',
            template: './index.html', // шаблон
            filename: 'index.html', // название выходного файла
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],

};