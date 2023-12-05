const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		main: './src/ha-nunjucks.ts',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'ha-nunjucks.js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
			},
		],
	},
};
