let fs = require("fs");
let path = require("path");
let config = require('../config/index.js');

exports.interatorFolderFile = function(folder, handler) {
  function readDirSync(dir, depFlag) {
    let matchArr, regDir = /^[^\.]+$/;
    let files = fs.readdirSync(dir);
    if (files) {
      files.forEach(name => {
        if (!name.match(regDir)) {
          handler && handler(name, dir);
        } else {
          readDirSync(path.resolve(dir, "./" + name), depFlag);
        }
      });
    }
  }
  return readDirSync(folder, true);
}

exports.resolve = function (str) {
  return path.resolve(__dirname, str);
}

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}