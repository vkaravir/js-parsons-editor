const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SOURCE_FOLDER = './src/';
const OUTPUT_PATH = path.join(__dirname, 'build/');

var entries = {
  'js-parsons-editor': SOURCE_FOLDER + 'js-parsons-editor'
};

module.exports = {
  entry: entries,
  output: {
    path: OUTPUT_PATH,
    filename: '[name].bundle.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src/'),
      'node_modules'
    ],
    extensions: ['.js']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
          options: {
            presets: ['es2015', 'react']
          }
        }]
      }
    ]
  }
};
