import webpack from 'webpack';
import Config from 'webpack-config';

const ExtractTextPlugin = require("extract-text-webpack-plugin");

export default new Config().extend('config/webpack.base.config.js').merge({
	output: {
		filename: 'bundle.min.js'
	},
	devtool: 'source-map',
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
						localIdentName: "[hash:base64:10]",
						minimize: true,
						plugins: () => autoprefixer({
							browsers: ['last 3 versions', '> 1%']
						})
					}
				},
				{ loader: 'postcss-loader' },
			]
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
		  compress: {
				sourceMap: true,,
				warnings: true,
				drop_console: true,
				unsafe: true,
				mangle: false
		  }
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
	]
});