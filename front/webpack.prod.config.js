const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Coding Assignment Evaluator',
      filename: 'index.html'
    })
  ],
  entry: {
    app: './app.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.json'],
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|Generated)/,
      loader: 'babel',
    }, {
      test: /\.json$/,
      loader: 'json',
    }, {
      test: /\.css$/,
      exclude: [/node_modules/],
      loader: 'style!css?modules'
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loader: 'style!css'
    }]
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './',
  },
}

module.exports = webpackConfig
