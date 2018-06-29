let utils = require('./utils.js');
let webpack = require('webpack');
let webpackConfig = require('./webpack.pro.conf');
let rm = require('rimraf');


rm(utils.resolve("../dist"), err => {
  if (err) throw err;
  webpack(webpackConfig, function(err, stats){
    if(err) throw err;
    console.log(stats.toString());
  });
});
