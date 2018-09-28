const merge = require('webpack-merge');
const webpack = require('webpack');

const base = require('./webpack.base.config');

module.exports = merge.smart(base, {});
