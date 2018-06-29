/**
 * 只watch了js文件变换，html，css文件变化需要手动刷新页面
 */
let express = require('express');
let proxyMiddleware = require('http-proxy-middleware');
let path = require('path');
let webpack = require('webpack');
let devConfig = require("./webpack.dev.conf.js");
let config = require("../config/index.js");

let app = express();
let compiler = webpack(devConfig);

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath: devConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));


app.use(express.static(path.join(__dirname, '../src')));

const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));
// proxy api requests
Object.keys(config.dev.proxyTable).forEach(function (context) {
  var options = config.dev.proxyTable[context];
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
});

app.listen(config.dev.port);