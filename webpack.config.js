const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const plugins = [
  new ExtractTextPlugin('bundle.css'),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env),
    },
  }),
  new CopyWebpackPlugin([{
    from: 'lib/',
    to: 'lib/',
  }]),
  new HtmlWebpackPlugin({
    hash: true,
    inject: true,
    filename: 'index.html',
    template: 'index.pug',
  }),
];
const publicPath = {
  development: '/admin/',
  dev: '/admin/',
  stable: '/admin/',
  online: '/admin/',
};

if (env === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: './src',
  output: {
    filename: 'bundle.js',
    publicPath: publicPath[env],
    path: './build',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0',
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=images/[name].[ext]',
      ],
    }, {
      test: /\.pug$/,
      loader: 'pug-loader',
    }],
  },
  externals: {
    react: 'var window.React',
    'react-dom': 'var window.ReactDOM',
    'react-router': 'var window.ReactRouter',
    reflux: 'var window.Reflux',
    antd: 'var window.antd',
  },
  devtool: 'cheap-source-map',
  plugins,
  devServer: {
    historyApiFallback: {
      index: '/admin/',
    },
  },
};
