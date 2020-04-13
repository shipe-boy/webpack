//引入css模块打包工具，将css打包成一个文件后引入页面中
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//压缩打包后的css文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//自动生成html，自动引入打包后的js、css
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development', //打包后大代码不会被压缩，否则默认是生产环境，代码会压缩
	entry: './src/index.js', //打包的入口文件
	output: {
		path: __dirname + '/dist',
		filename: 'js/bundle.js'
	},
	//处理各种要打包文件的规则
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						esModule: true,
					}
				}, 
				'css-loader', 
				'postcss-loader',
			]
		}]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		}),
		new OptimizeCssAssetsPlugin(),	//里面可以传对象设置东西
		new HtmlWebpackPlugin({  // Also generate a test.html
			filename: 'index.html',	//生成的文件名字
			template: './index.html'	,//以根目录的index.html为模板
			//inject: true  //默认生成的js、css资源注入，
			minify: {
				collapseWhitespace: true,	//是否压缩生成后的html，默认false
				removeComments: true,	//是否去掉注释，默认false
				// removeRedundantAttributes: true,
				// removeScriptTypeAttributes: true,	//是否去掉ScriptType
				// removeStyleLinkTypeAttributes: true,	//是否去掉LinkType
				// useShortDoctype: true
			}
		})
	]
}



/*
postcss-loader，可以css3新增属性加上兼容前缀
	1.引入loader
	2.新增postcss.config.js，
	3.npm 查看 autoprefixer（选择webpack） 来配置postcss.config.js
	4.下载	autoprefixer



*/
