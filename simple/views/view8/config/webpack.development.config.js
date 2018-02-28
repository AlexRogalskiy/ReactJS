"use strict";
/**
 * Module dependencies
 */
import webpack from 'webpack';
import Config from 'webpack-config';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const autoprefixer = require('autoprefixer');
const publicDir = path.join(__dirname, '..', 'public');

export default new Config().extend('config/webpack.base.config.js').merge({
	entry: [
		'webpack-hot-middleware/client?reload=true',
		'babel-polyfill',
		'react-hot-loader/patch',
		path.join(publicDir, 'js', 'app.js')
	],
	devtool: 'inline-source-map',
	output: {
		filename: "[name].js",
		chunkFilename: "[name].js",
		library: '[name]',
		sourceMapFilename: '[name].map'
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
						url: false,
						importLoaders: 1,
						localIdentName: "[local]__[hash:base64:5]",
						minimize: false,
						sourceMap: true,
						plugins: () => autoprefixer({
							browsers: ['last 3 versions', '> 1%']
						})
					}
				},
				{ loader: 'postcss-loader' },
			]
		},
		{ test: /\.less$/,
			loader: ExtractTextPlugin.extract(['css-loader',
			{
				loader: 'postcss-loader',
				options: {
					modules: true,
					url: false,
					importLoaders: 1,
					localIdentName: "[local]__[hash:base64:5]",
					minimize: false,
					sourceMap: true,
					plugins: () => autoprefixer({
						browsers: ['last 3 versions', '> 1%']
					})
				}
			}, 'less-loader'])
		},
		{ test: /\.scss$/,
			loader: ExtractTextPlugin.extract(['css-loader',
			{
				loader: 'postcss-loader',
				options: {
					modules: true,
					url: false,
					importLoaders: 1,
					localIdentName: "[local]__[hash:base64:5]",
					minimize: false,
					sourceMap: true,
					plugins: () => autoprefixer({
						browsers: ['last 3 versions', '> 1%']
					})
				}
			}, 'sass-loader'])
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			}
		}),
		new ExtractTextPlugin({
			filename: 'css/[name].css',
			disable: false,
			allChunks: true,
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "common",
			filename: "common.js"
			// chunks: ['common', 'button'],
			// minChunks: 2,
		}),
		// new webpack.ProvidePlugin({
		//     compact: 'lodash/compact',
		//     _: 'lodash'
		// })
		//new webpack.ProvidePlugin({
		//	'arrayutils': 'imports?this=>global!exports?global.arrayutils!arrayutils'
		//})
	],
	devServer: {
		inline: true,
		port: 8080,
     	historyApiFallback: true,
     	//stats: 'warnings-only',
   	},
	watchOptions: {
		poll: 1000,
		aggregateTimeout: 1000
	},
	// externals: {
     // "react": "React",
  //       "marked": "marked",
  //       "jquery": "jQuery",
  //       "react-dom": "ReactDOM",
		// "window": "window"
 //   	},
   //  postcss: [
    //   autoprefixer({
    //     browsers:['ie >= 8', 'last 4 version']
    //   })
    // ]
});