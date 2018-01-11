import webpack from 'webpack';
import Config from 'webpack-config';
import path from 'path';

const include = path.join(__dirname, '../client');

export default new Config().extend('conf/webpack.base.config.js').merge({
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'babel-polyfill',
    'react-hot-loader/patch',
    path.join(include, 'index.js')
    // __dirname + '/../client/index.js'
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    library: '[name]'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: "[local]__[hash:base64:5]",
            minimize: false
          }
        },
        { loader: 'postcss-loader' },
      ]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ],
  devServer: {
    //stats: 'warnings-only',
        port: 8080
    },
   //  postcss: [
    //   autoprefixer({
    //     browsers:['ie >= 8', 'last 4 version']
    //   })
    // ]
});