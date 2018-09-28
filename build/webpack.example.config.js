const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const base = require('./webpack.base.config');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge.smart(base, {

  mode: 'development',
  entry: './src/example/index.js',
  output: {
    path: path.resolve(__dirname, '../public'),
    publicPath: '/',
    filename: 'app.js'
  },
  devServer: {
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    new HtmlWebpackPlugin({
      title: 'PaperFlowLink',
      filename: 'index.html',
      template: 'src/example/index.html'
    })
  ]
});
