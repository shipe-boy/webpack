const path = require('path')

//生成html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'js/[name].js',
		path: __dirname + '/dist'
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/template.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				/* use:{
					loader: path.join(__dirname, 'loaders', 'my-babel-loader.js'),
					options: {
						presets: ['@babel/preset-env']
					}
				} */
				use: {
					loader: "my-babel-loader.js",
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.jpg$/,
				use: {
					// loader: "my-file-loader.js",
					loader: "my-url-loader.js",  //my-file-loader.js
					options: {
						limit: 8000   //小于  k打包成 base64
					}
				}
			}
		]
	},
	resolveLoader: {
		modules: ['node_modules',path.join(__dirname, 'loaders')],
	}
}