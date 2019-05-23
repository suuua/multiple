const fs = require("fs");
const path = require("path");
const config = require('../config/index.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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

exports.assetsPath = function (_path, env = "production") {
  var assetsSubDirectory = env === "production"
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}


// from vue-cli webpack
exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
      minimize: options.minimize
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const fileLoader = {
    loader: "file-loader",
    options: {
      name: options.filename || exports.assetsPath("[name].[hash:7].[ext]")
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    //const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    
    let loaders = [];
    if (options.usePostCSS) {
      loaders = [postcssLoader].concat(loaders);
    }
    if (!options.file) {
      loaders = [cssLoader].concat(loaders);
    }

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return [{
        loader: MiniCssExtractPlugin.loader,
      }].concat(loaders)
    } else if (options.file) {
      return [fileLoader].concat(loaders);
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      issuer: options.issuer || undefined,
      use: loader
    })
  }

  return output
}

exports.loaderReg = function (str) {
  return function (path) {
    var reg1 = /[\\/]static[\\/]/;
    var reg2 = new RegExp(str);
    return !reg1.test(path) && reg2.test(path);
  };
}


exports.hasPath = function(filePathArr, filepath) {
  let m = "\\", r = "/";
  // 兼容linux环境
  if (path.sep === m) { [m, r] = [r, m]; } 
  for (let i = 0; i < filePathArr.length; i++) {
    let value = filePathArr[i];
    if (value && (filepath.includes(value) || filepath.includes(value.replace(m, r)))) {
      return true;
    }
  }
  return false;
}