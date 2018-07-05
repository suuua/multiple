let path = require('path');
let merge = require('webpack-merge');
let config = require('../config/index.js');
let utils = require('./utils.js');
let webpack = require('webpack');
let webpackBaseConf = require('./webpack.base.conf.js');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(webpackBaseConf, {
  mode: "production",
  output: {
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[name].[chunkhash].js"),
    publicPath: config.build.assetsPublicPath
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      minSize: 0,
      minChunks: 1,
      name: "vendor",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: "vendors"//utils.assetsPath("vendor"),
        },
        common: {
          test: /[\\/]modules[\\/]/,
          chunks: "all",
          name: "common"
        }
      }
    }
  },
  plugins: [
    //instead of file-loader because ejs template 
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../static'),
    //     to: config.build.assetsSubDirectory,
    //     ignore: ['.*']
    //   }
    // ]),
    new BundleAnalyzerPlugin()
  ],
});