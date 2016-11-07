var path = require('path');
var webpack = require('webpack');

var babelSettings = {
	cacheDirectory: true,
  'presets': [
    ['es2015', { modules: false }],
  ],
};

module.exports = {
	context: path.join(__dirname, 'src'),
	entry: {
		boot: './boot',
	},
	output: {
		// This is where images AND js will go
		path: path.join(__dirname, 'public'),
		filename: '[name].js'
	},
  // devtool: 'eval',
  devtool: 'source-map',
	module: {
		loaders: [
			{ test: /\.ts$/, loader: 'awesome-typescript' },  //‘ts’
			{ test: /\.html$/, loader: 'html' },
			{ test: /\.json$/, loader: 'json' },
			{ test: /\.pug$/, loader: 'pug-html' },
			{ test: /\.less$/, loader: 'style!css!less' },
			{ test: /\.css$/, loader: 'style!css' },
			{ test: /\.(jpe?g|png|gif|ttf|eot|svg|woff(2)?|wav|mp3)$/, loader: 'file' }
		],
	},
	resolve: {
		extensions: [ // you can now require('file') instead of require('file.coffee')
			'.js', '.ts', '.json', '.pug', '.css', '.less', '.sass', '.scss', '.html'
		]
		// modulesDirectories: ['node_modules', 'src'],
		// root: __dirname
	},
	node: {
		fs: 'empty',
		tls: 'empty',
		net: 'empty',
		dns: 'empty',
		setImmediate: true
	},
}
