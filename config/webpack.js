const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const BASE_DIR = path.resolve(__dirname, '../');

const PATHS = {
  src: `${BASE_DIR}/src`,
  dist: `${BASE_DIR}/dist`
};

const APP_PATHS = [
  'javascript',
  'html',
  'stylesheets'
].reduce((appPaths, srcPath) => (appPaths[srcPath] = `${PATHS.src}/${srcPath}`) && appPaths, {});

const ExtractCSSPlugin = new ExtractTextPlugin({
  allChunks: true,
  filename: 'bundle.[chunkhash].css'
});

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    main: `${APP_PATHS.javascript}/app.js`
  },
  output: {
    path: PATHS.dist,
    filename: 'bundle.[chunkhash].js'
  },
  plugins: [
    new CleanWebpackPlugin([PATHS.dist]),
    ExtractCSSPlugin,
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${APP_PATHS.html}/index.html`,
      minify: {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeOptionalTags: true
      },
      inlineSource: '.(js|css)$',
      title: 'Andrew Hunt | Software Developer'
    }),
    new HtmlWebpackInlineSourcePlugin()
  ],
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractCSSPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true
          }
        }, {
          loader: 'sass-loader'
        }]
      })
    }, {
      test: /\.js?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: []
        }
      }, {
        loader: 'eslint-loader'
      }]
    }]
  }
};
