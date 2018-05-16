const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          'url-loader',
        ],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: {
          chunks: 'all',
          test: ({ resource }) => resource && /node_modules\/react*/.test(resource),
          name: 'react',
          enforce: true,
          priority: 10,
        },
        lib: {
          chunks: 'all',
          test: ({ resource }) => resource && /node_modules\/(moment|lodash)/.test(resource),
          name: 'lib',
          enforce: true,
          priority: 9,
        },
        d3: {
          chunks: 'all',
          test: ({ resource }) => resource && /node_modules\/d3*/.test(resource),
          name: 'd3',
          enforce: true,
          priority: 8,
        },
        vendor: {
          chunks: 'all',
          test: ({ resource }) => resource && /\/node_modules\//.test(resource),
          name: 'vender',
          enforce: true,
          priority: 7,
        },
      },
    },
    runtimeChunk: true,
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '宁波智慧交通',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: !isProd,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        PROXY_PREFIX: isProd ? false : JSON.stringify(''),
        mapViewType: '"openlayers"',
      },
    }),
  ],
};
