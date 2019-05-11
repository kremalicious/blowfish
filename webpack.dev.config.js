const path = require('path')
const common = require('./webpack.common.config')
const { spawn } = require('child_process')

module.exports = Object.assign({}, common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    stats: 'minimal',
    before: () => {
      spawn('electron', ['.'], {
        shell: true,
        env: process.env,
        stdio: 'inherit'
      })
        .on('close', () => process.exit(0))
        .on('error', spawnError => console.error(spawnError)) // eslint-disable-line no-console
    }
  }
})
