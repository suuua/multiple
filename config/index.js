let path = require("path");

module.exports = {
    build: {
        assetsRoot: path.resolve(__dirname, "../dist"),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        bundleAnalyzerReport: true
    },
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        port: 8500,
        proxyTable: {}
    }
};