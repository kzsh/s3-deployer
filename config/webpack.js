const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const BASE_DIR = path.resolve(__dirname, '../');

const PATHS = {
  src: `${BASE_DIR}/src`,
  dist: `${BASE_DIR}/dist`
};

const APP_PATHS = [
  'javascript'
].reduce((appPaths, srcPath) => (appPaths[srcPath] = `${PATHS.src}/${srcPath}`) && appPaths, {});

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  target: 'node',
  entry: {
    core: `${APP_PATHS.javascript}/core/index.js`
  },
  output: {
    path: PATHS.dist,
    filename: 'deployer.js',
    library: 'Deployer',
    libraryTarget: 'commonjs2'
  },
  externals: {
    'yargs': {
      commonjs: 'yargs',
      commonjs2: 'yargs'
    },
    'chalk': {
      commonjs: 'chalk',
      commonjs2: 'chalk'
    },
    'fs': {
      commonjs: 'fs',
      commonjs2: 'fs'
    },
    'process': {
      commonjs: 'process',
      commonjs2: 'process'
    },
    'util': {
      commonjs: 'util',
      commonjs2: 'util'
    }
  },
  plugins: [
    new CleanWebpackPlugin([PATHS.dist], {
      allowExternal: true
    }),
    new UglifyJsPlugin()
  ],
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              'targets': {
                'node': true
              }
            }]
          ],
          plugins: [
            require('@babel/plugin-transform-async-to-generator')
          ]
        }
      }, {
        loader: 'eslint-loader',
        options: {
          emitError: false
        }
      }]
    }]
  }
};
