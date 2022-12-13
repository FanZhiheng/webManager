// 项目部署基础 
// process.env.NODE_ENV === 'production' 生产环境
// process.env.NODE_ENV === 'development' 开发环境
const BASE_URL = process.env.NODE_ENV === 'production'
  ? './'
  : '/examSystem';

const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  outputDir: "examSystem",
  publicPath: BASE_URL,
  assetsDir: 'static',
  productionSourceMap: false,

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('_j', resolve('src/json'))
  },


  publicPath: BASE_URL,
  assetsDir: 'static',

  // 设为false打包时不生成.map文件
  productionSourceMap: false,

  devServer: {
    port: 8090,
    proxy: {
      '/': {
        target: 'http://36.156.144.193:10085/',
        // target: 'http://192.168.10.242:8080/',
        changeOrigin: true
      }
    }
  }
}
