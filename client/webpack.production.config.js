// @flow weak

const webpack           = require('webpack');
const path              = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin    = require('uglifyjs-webpack-plugin')

const assetsDir       = path.resolve(__dirname, 'docs/assets');
const nodeModulesDir  = path.resolve(__dirname, 'node_modules');
const indexFile       = path.resolve(__dirname, 'src/app/index.js');

const SPLIT_STYLE = true;

const config = {
  entry: {
    app: [
      'babel-polyfill',
      indexFile
    ],
    vendor: [
      'apollo-client',
      'babel-polyfill',
      'classnames',
      'graphql-tag',
      'jquery',
      'js-base64',
      'moment',
      'numeral',
      'react',
      'react-apollo',
      'react-dom',
      'react-motion',
      'react-notification',
      'react-redux',
      'react-router',
      'react-router-dom',
      'history',
      'react-router-redux',
      'react-tap-event-plugin',
      'redux',
      'redux-thunk'
    ]
  },
  output: {
    path:     assetsDir,
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test:    /\.jsx?$/,
        exclude: [nodeModulesDir],
        loader:  'babel-loader',
        query: { compact: true }
      },
      {
        test:    /\.worker\.js$/,
        exclude: [nodeModulesDir],
        loaders: [
          {
            loader: 'babel-loader',
            query: { compact: true }
          },
          {
            loader: 'worker-loader',
            options: { inline: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use:  SPLIT_STYLE
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {loader: 'css-loader', options: { importLoaders: 1 }},
              'postcss-loader'
            ]
          })
          : [
            'style-loader',
            {loader: 'css-loader', options: { importLoaders: 1 }},
            'postcss-loader'
          ]
      },
      {
        test: /\.scss$/,
        use:  SPLIT_STYLE
        ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader', options: { importLoaders: 1 }},
            'postcss-loader',
            'sass-loader'
          ]
        })
        : [
          'style-loader',
          {loader: 'css-loader', options: { importLoaders: 1 }},
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        use: [
          {
            loader:  'url-loader',
            options: {
              limit: 100000,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    getImplicitGlobals(),
    setNodeEnv(),
    new ExtractTextPlugin('app.styles.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name:     'vendor',
      filename: 'app.vendor.bundle.js'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin()
  ]
};

/*
* here using hoisting so don't use `var NAME = function()...`
*/
function getImplicitGlobals() {
  return new webpack.ProvidePlugin({
    $:      'jquery',
    jQuery: 'jquery'
  });
}

function setNodeEnv() {
  return new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  });
}

module.exports = config;
