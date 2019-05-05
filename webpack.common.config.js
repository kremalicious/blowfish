const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = [path.resolve(__dirname, 'src')]

module.exports = {
  entry: path.resolve(__dirname, 'src') + '/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
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
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: ['file-loader?name=font/[name]__[hash:base64:5].[ext]'],
        include: defaultInclude
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  target: 'electron-renderer',
  plugins: [new HtmlWebpackPlugin()]
}
