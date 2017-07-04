'use strict';

const webpack = require('webpack');

module.exports = {
  entry: './src/joi-browser.js',
  output: {
    library: 'Joi',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: __dirname + '/dist',
    filename: 'joi-browser.js'
  },
  module: {
    loaders: [
      {
        // need to babelify joi, isemail, hoek, and topo's lib
        test: /[\\\/]node_modules[\\\/](joi[\\\/]lib[\\\/]|isemail[\\\/]lib[\\\/]|hoek[\\\/]lib[\\\/]|topo[\\\/]lib[\\\/])/,
        use: [
          {
            loader: 'babel-loader',
            options: {
                babelrc: false,
                presets: [['es2015', {modules: false}]],
                plugins: [
                    "transform-es2015-modules-commonjs",
                    "transform-object-assign",
                    "transform-proto-to-assign",
                    [
                      "transform-es2015-classes",
                      {
                        "loose": true
                      }
                    ]
                ]
            }
          }
        ]
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
                babelrc: false,
                presets: [['es2015', {modules: false}]],
                plugins: [
                    "transform-es2015-modules-commonjs",
                    "transform-object-assign",
                    "transform-proto-to-assign",
                    [
                      "transform-es2015-classes",
                      {
                        "loose": true
                      }
                    ]
                ]
            }
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  node: {
    global: false,
    crypto: 'empty',
    net: 'empty',
    dns: 'empty'
  }
};
