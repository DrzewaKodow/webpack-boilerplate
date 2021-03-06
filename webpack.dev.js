// Plugins
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devServer: {
    contentBase: './dist',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    host: 'localhost',
    // Open browser
    open: true,
    port: process.env.NODE_PORT,
    // This allow to make public the assets folder
    publicPath: '/assets/',
  },
  // Output app js
  output: {
    path: path.resolve(__dirname, process.env.ASSETS_OUTPUT_FOLDER),
    filename: 'js/bundle.js',
  },
  plugins: [
    // Load ExtractTextPlugin to be used on the rules and output app css
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    // Load Hot Module plugin to refresh the browser with any file change
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/assets/img',
        to: path.resolve(__dirname, 'dist/assets/img/'),
        ignore: ['.gitignore'],
      },
    ]),
  ],
});
