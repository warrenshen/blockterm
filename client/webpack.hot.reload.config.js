// @flow weak

const path       = require('path');
const webpack    = require('webpack');

const assetsDir  = path.join(__dirname, 'docs/assets');
const srcInclude = path.join(__dirname, 'src/app');
const indexFile  = path.join(__dirname, 'src/app/index.js');

const config = {
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    indexFile
  ],
  output: {
    path: assetsDir,
    filename: 'bundle.js',
    publicPath: '/tv/'
  },
  module: {
    rules: [
      {
        test:    /\.jsx?$/,
        include: srcInclude,
        loader:  'babel-loader'
      },
      {
        test:    /\.worker\.js$/,
        include: srcInclude,
        loaders: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'worker-loader',
            options: { inline: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use:  [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      },
      {
        test:  /\.scss$/,
        use:  [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    getImplicitGlobals(),
    setNodeEnv()
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
      'NODE_ENV': JSON.stringify('dev')
    }
  });
}

module.exports = config;
