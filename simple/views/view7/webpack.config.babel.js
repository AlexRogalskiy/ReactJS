/**
 * Module dependencies
 */
import {join} from 'path';
import {HotModuleReplacementPlugin, NoEmitOnErrorsPlugin, DefinePlugin} from 'webpack';
// var autoprefixer = require('autoprefixer');

const include = join(__dirname, 'js');

export default {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'babel-polyfill',
		'react-hot-loader/patch',
		'./js/app'
	],
	output: {
		path: join(__dirname, 'dist'),
		filename: 'js/bundle.js',
		libraryTarget: 'umd',
		library: 'Test'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{test: /\.less$/, loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 4 version!less-loader'},
			{test: /\.css$/, loader: 'style-loader!css-loader'},
			{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=images/[hash].[ext]'},
			{test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, include: [include], loaders: ['react-hot-loader/webpack', 'babel-loader?presets[]=react,presets[]=es2015']},
			{test: /\.json$/, loader: 'json-loader', include}
		]
	},
	node: {
		fs: 'empty'
	},
	plugins: [
		new HotModuleReplacementPlugin(),
		new NoEmitOnErrorsPlugin()
		new DefinePlugin({
	      	"process.env": {
	        	NODE_ENV: JSON.stringify("production")
	      	}
	    })
		// new LoaderOptionsPlugin({
		//     options: {
		// 	      	postcss: [
		// 	        	autoprefixer(),
		// 	      	]
		//     	}
		//   	}),
		// new ProvidePlugin({
		// 	'arrayutils': 'imports?this=>global!exports?global.arrayutils!arrayutils'
		// })
	],
	resolve: {
		modules: [
			'node_modules'
			//join(__dirname, '/')
		],
		extensions: ['.js', '.json', '.jsx', '.less'],
		alias: {
			'appRoot': include,
			'vendor': 'appRoot/vendor'
		}
	},
	devServer: {
		//stats: 'warnings-only',
        port: 8080
    },
   //  postcss: [
	  //   autoprefixer({
	  //     browsers:['ie >= 8', 'last 4 version']
	  //   })
  	// ]
};