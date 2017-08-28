const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin') // here so you can see what chunks are built
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')

const extractVue = new ExtractCssChunks()
const extractImported = new ExtractCssChunks()

module.exports = {
  name: 'client',
  target: 'web',
  // devtool: 'source-map',
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/index.js')
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../buildClient'),
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'react-vue-loader',
        options: {
          loaders: {
            stylus: extractVue.extract({
              use: 'css-loader!stylus-loader',
              fallback: 'vue-style-loader'
            })
          },
          vue: path.resolve(__dirname, '../vue.config.js'),
          cssModules: {
            localIdentName: '[name]-[local]'
          }
        }
      },
      {
        test: /\.styl$/,
        use: extractImported.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]-[local]'
              }
            },
            {
              loader: 'stylus-loader'
            }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.vue', '.js', '.css', '.styl']
  },
  plugins: [
    new WriteFilePlugin(),
    extractVue,
    extractImported,
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new AutoDllPlugin({
      context: path.join(__dirname, '..'),
      filename: '[name].js',
      entry: {
        vendor: ['react', 'react-dom', 'react-vue', 'react-vue-helper']
      }
    })
  ]
}
