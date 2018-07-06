const path = require('path');
const webpack = require('webpack');
const utils = require('./utils.js');
const config = require('../config/index.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const entryMap = {};
const SOURCE = utils.resolve('../src/');
const WEBPACK_ENTRY_FLOADER_NAME = "entry";
const WEBPACK_ENTRY_FLOADER = path.resolve(SOURCE, "./" + WEBPACK_ENTRY_FLOADER_NAME);
const HTML_FLOADER = path.resolve(SOURCE, "./html");

utils.interatorFolderFile(WEBPACK_ENTRY_FLOADER, (name, dir) => {
  let filePath = path.resolve(dir, "./" + name);
  // chunks 需要与html结构一一对应才能找到依赖模块
  let chunks = path.posix.join(...path.relative(WEBPACK_ENTRY_FLOADER, filePath).replace(".js", "").split(path.sep));
  entryMap[chunks] = filePath;
});
// 获取入口文件
let htmlWebpackPlugins = [];
let htmlFile = {};
const allowHtmlFileExt = /(\.ejs|\.html)$/;
utils.interatorFolderFile(HTML_FLOADER, (name, dir) => {
  // 非source目录和static目录下的文件
  if (allowHtmlFileExt.test(name)) {
    let filePath = path.resolve(dir, "./" + name);
    let fileName = path.relative(HTML_FLOADER, filePath);
    htmlFile[fileName] = filePath;
  }
});
// 生成html模板文件
console.log(entryMap, htmlFile);
Object.keys(htmlFile).forEach(name => {
  let chunks = [/*utils.assetsPath("vendor")*/"runtime", "vendors", "common"];
  let filename = path.relative(HTML_FLOADER, path.resolve(htmlFile[name]));
  let appChunk = path.posix.join(...path.relative(HTML_FLOADER, htmlFile[name]).replace(allowHtmlFileExt, "").split(path.sep));

  if (entryMap[appChunk]) { chunks.push(appChunk); }
  console.log(name, filename, chunks);
  htmlWebpackPlugins.push(new HtmlWebpackPlugin({
    filename: filename.replace(/\.\w+$/, ".html"),
    template: htmlFile[name],
    chunks: chunks,
    minify: true
  }));
});
module.exports = {
  entry: Object.assign({}, entryMap),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: config.dev.assetsPublicPath
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "..", 'src')
    }
  },
  plugins: [
    ...htmlWebpackPlugins,
    new webpack.ProvidePlugin({
        _: "lodash"
    })
  ],
  module: {
    rules: [
      {
        test: /static/,
        loader: 'file-loader',
        options: {
          limit: 0,
          name: (file) => {
            return utils.assetsPath(
              path.posix.join(...path.relative(path.resolve(SOURCE, "../static"), file).split(path.sep))
            );
          }
        }
      }, {
        test: /src.+\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [SOURCE],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }, {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: true,
        } 
      }, {
        test: /src.+\.js$/,
        loader: 'babel-loader',
        include: [SOURCE]
      }, {
        test: /src.+\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      }, { 
        test: /\.ejs$/, 
        loader: "ejs-loader",
        options: {
          minimize: true,
        } 
      }
    ]
  }
}