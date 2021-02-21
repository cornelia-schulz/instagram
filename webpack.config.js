var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  "entry": ["babel-polyfill", "./src/index"],
  mode: "development",
  module: {
    rules: [
        { 
            test: /\.(js)$/, 
            use: 'babel-loader' 
        },
        { 
            test: /\.css$/, 
            use: ['style-loader', 'css-loader'] 
        }
      ]
  },
  resolve: {
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      "buffer": false,
    }
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ]
};