
const path = require('path');
const webpack = require("webpack");


const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: '../micro-app-server/app/view/portal',
  assetsDir: 'static',
  lintOnSave: false,


  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7700',
        ws: true,
        changeOrigin: true,
      }
    },
    host: '0.0.0.0',
    port: 7701
  }

}
