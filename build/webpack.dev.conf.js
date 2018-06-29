// webpack中配置了热替换，但是必须在入口文件处添加：
// if(module.hot){module.hot.accept();}
var webpack = require('webpack');
var merge = require('webpack-merge');
var fs = require('fs');
var path = require('path');
var webpackBaseConf = require('./webpack.base.conf.js');

var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';


// add hot-reload related code to entry chunks
Object.keys(webpackBaseConf.entry).forEach(function (name) {
  //webpackBaseConf.entry[name] = ['./build/dev-client'].concat(webpackBaseConf.entry[name])
  webpackBaseConf.entry[name] = [webpackBaseConf.entry[name], hotMiddlewareScript]
})
module.exports = merge(webpackBaseConf, {
  mode: "development",
  plugins: [
    //https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin()
  ]
});