'use strict';

const webpack = require("webpack");


let renderConfig = {
    entry: {
        render: './render.js'
    },
    target: 'electron-renderer',
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015'] } },
        ]
    }
};

module.exports = [renderConfig];