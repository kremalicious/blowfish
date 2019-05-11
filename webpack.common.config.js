const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = [path.resolve(__dirname, 'src')]

module.exports = {
  entry: path.resolve(__dirname, 'src') + '/app/index.js',
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
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
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
