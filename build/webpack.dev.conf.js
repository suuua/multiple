// webpack中配置了热替换，但是必须在入口文件处添加：
// if(module.hot){module.hot.accept();}
const webpack = require('webpack');
const merge = require('webpack-merge');
const fs = require('fs');
const path = require('path');
const webpackBaseConf = require('./webpack.base.conf.js');
const utils = require('./utils.js');

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';


// add hot-reload related code to entry chunks
Object.keys(webpackBaseConf.entry).forEach(function (name) {
  //webpackBaseConf.entry[name] = ['./build/dev-client'].concat(webpackBaseConf.entry[name])
  webpackBaseConf.entry[name] = [webpackBaseConf.entry[name], hotMiddlewareScript]
})
module.exports = merge(webpackBaseConf, {
  mode: "development",
  module: {
    rules: utils.styleLoaders({ 
      sourceMap: false, 
      usePostCSS: false,
      issuer: (path) => {
        return !path.match(/[\\/]src[\\/]html/);
      }
    }).concat(utils.styleLoaders({ // 此处是为了支持直接在html文件中引入css文件
      sourceMap: false, 
      usePostCSS: false, 
      file: true, 
      issuer: /[\\/]src[\\/]html/ 
    }))
  },
  plugins: [
    //https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin()
  ]
});