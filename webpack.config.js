var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  // babel-polyfill needs to be called otherwise async calls will result in error
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
        },
        {
          test: /\.(png|jp(e*)g|svg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[hash]-[name].[ext]',
              },
            },
          ],
        }
      ]
  },
  resolve: {
    fallback: {
      // add these fallbacks as these things are not included in webpack as of version 5
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
      // use inject false as it otherwise calls babel-polyfill again
      inject: false,
      template: 'src/index.html'
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ]
};