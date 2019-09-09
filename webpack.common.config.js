const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const defaultInclude = [path.resolve(__dirname, 'src', 'renderer')]

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'renderer', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: isDevelopment ? '/' : './'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: ['babel-loader'],
        include: defaultInclude
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
        include: defaultInclude
      },
      {
        test: /\.module\.css$/,
        include: defaultInclude,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]'
              },
              localsConvention: 'camelCase',
              sourceMap: isDevelopment
            }
          }
        ]
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
    extensions: ['*', '.js', '.jsx', '.css']
  },
  target: 'electron-renderer',
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    }),
    new CopyPlugin([
      { from: './src/renderer/images/icon.*', to: './', flatten: true }
    ])
  ]
}
