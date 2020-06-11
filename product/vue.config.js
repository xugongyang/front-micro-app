
const path = require('path');
const packageName = require('./package.json').name;


const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: '../micro-app-server/app/view/product',
  assetsDir: 'static',
  lintOnSave: false,

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  },

  /**
   * [配置微应用的打包工具]
   * 除了代码中暴露出相应的生命周期钩子之外，为了让主应用能正确识别微应用暴露出来的一些信息，微应用的打包工具需要增加如下配置
   */
  configureWebpack: {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },

  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7700',
        ws: true,
        changeOrigin: true,
      }
    },
    host: '0.0.0.0',
    port: 7702
  }

}
