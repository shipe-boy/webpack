//引入css模块打包工具，将css打包成一个文件后引入页面中
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//压缩打包后的css文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//自动生成html，自动引入打包后的js、css
const HtmlWebpackPlugin = require('html-webpack-plugin')
//清空先前打包的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//引入webpcak
const webpack = require('webpack')
const {API} = require('../src/api.js')


module.exports = {
	entry: './src/index.js'	,//打包的入口文件
	output: {
		path: __dirname + '../dist',
		filename: 'js/[name].js'
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
		]
	},
	plugins: [
		//希望打包后生成a.html和b.html，同时引入对应的js和css
		new HtmlWebpackPlugin({
			filename: 'index.html',	//生成的文件名字
			template: './index.html', //以根目录的index.html为模板
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		}),
		new OptimizeCssAssetsPlugin(),
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
		  API11: JSON.stringify(API),	//官网中例子
		  API1: "'http://loaclhost:3000'"// 或者：引号中为变量
		})
	],
	optimization: {	//优化项
		splitChunks: {
			chunks: 'all'
		}
	}
}