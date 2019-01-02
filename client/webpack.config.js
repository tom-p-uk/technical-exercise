const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        bundle: './src/index.js',
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 4000 }
                    },
                    'image-webpack-loader'
                ],
                test: /\.(jpe?g|png|gif|svg)$/
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    devServer: {
        historyApiFallback: true,
        host: '0.0.0.0',
        port: 8090,
    },
};
