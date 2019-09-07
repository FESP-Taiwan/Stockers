// @flow

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  devtool: NODE_ENV !== 'production' ? 'source-map' : false,
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, 'entry.jsx'),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: `'${NODE_ENV || 'development'}'`,
      Colors: JSON.stringify({
        LAYER_FIRST: '#262626',
        LAYER_SECOND: '#464646',
        BULL_MARKET: '#FF7E72',
        BEAR_MARKET: '#5EF28F',
        PRIMARY: '#FF9500',
        SECONDARY: '#4D2D00',
      }),
    }),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'static/index.html'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  mode: NODE_ENV === 'production' ? 'production' : 'development',
  devServer: {
    hot: true,
    contentBase: [
      path.resolve(__dirname, 'static'),
    ],
    publicPath: '/',
    compress: true,
    port: 7000,
    filename: 'bundle.js',
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  resolve: {
    mainFields: [
      'browser',
      'main',
      'module',
    ],
    extensions: [
      '.jsx',
      '.js',
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [
        'react-hot-loader/webpack',
        'babel-loader',
      ],
      include: [
        __dirname,
      ],
    }, {
      test: /\.css$/i,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }],
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          hash: 'sha512',
          digest: 'hex',
          name: '[hash].[ext]',
        },
      }],
      include: /static/,
    }],
  },
};
