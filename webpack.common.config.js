const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const defaultInclude = [path.resolve(__dirname, 'src', 'renderer')]

module.exports = {
  entry: path.resolve(__dirname, 'src', 'renderer', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: defaultInclude
      },
      {
        test: /\.(js|jsx)?$/,
        use: ['babel-loader'],
        include: defaultInclude
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: ['file-loader?name=img/[name]__[hash:base64:5].[ext]'],
        include: defaultInclude
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
        include: defaultInclude
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  target: 'electron-renderer',
  plugins: [
    new HtmlWebpackPlugin(),
    new CopyPlugin([
      { from: './src/renderer/images/icon.*', to: './', flatten: true }
    ])
  ]
}
