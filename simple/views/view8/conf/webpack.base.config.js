import webpack from 'webpack';
import Config from 'webpack-config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import path from 'path';

const include = path.join(__dirname, '../client');

export default new Config().merge({
  entry: path.join(include, 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
    { test: /.jsx?$/, loaders: ['babel-loader'], exclude: /(node_modules|bower_components)/, include: [include] },
      { test: /\.less$/, loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 4 version!less-loader' },
      //{ test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=images/[hash].[ext]' },
      //{ test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, include: [include], loaders: ['react-hot-loader/webpack', 'babel-loader?presets[]=react,presets[]=es2015'] },
      { test: /\.json$/, loader: 'json-loader', include }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      inject: "body"
    }),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [precss, autoprefixer] } })
  ],
  resolve: {
    modules: [
      'node_modules',
      'bower_modules',
      'web_modules',
      //join(__dirname, '/')
    ],
    extensions: ['.js', '.json', '.jsx', '.less'],
    alias: {
      'appRoot': include,
      'vendor': 'appRoot/vendor'
    }
  },
});