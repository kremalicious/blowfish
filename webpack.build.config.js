const common = require('./webpack.common.config')

module.exports = Object.assign({}, common, {
  mode: 'production',
  output: {
    publicPath: './'
  },
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  }
})
