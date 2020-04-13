// webpack2的配置
/* module.exports = {
    entry:  __dirname + "/app/main.js", // 之前提到的唯一入口文件
    output: {
        path: __dirname + "/public", // 打包后的文件存放的地方
        filename: "bundle.js" // 打包后输出文件的文件名
    }
} */

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack4的配置
module.exports = {
    // webpack4需要添加这个配置，development为开发环境，production为生产环境
    mode: "development",
	
	//代码调试
	devtool: 'eval-source-map',
	
	//入口和出口
    entry:  __dirname + "/app/main.js", // 之前提到的唯一入口文件
    output: {
        path: __dirname + "/dist", // 打包后的文件存放的地方
        filename: "bundle.js" // 打包后输出文件的文件名
    },
	
	//热更新配置
	devServer: {
		contentBase: './public',
		port: "8080",
		inline: true,
		historyApiFallback: true
	},
	
	//配置Babel，
	module: {
		rules: [
			{
				test: /(\.js|\.jsx)$/,
				use: {
					loader: 'babel-loader',
					/* optios: {	//可以在.babelrc中配置
						preset: [
							'react', 'env'
						]
					} */
				},
				exclude: /node_modules/
			}, {	// 这里配置这两个工具
				test: /\.css$/,
				use: [	// 请注意这里对同一个文件引入多个loader的方法。loader执行顺序从右向左，从下至上
					{
						loader: 'style-loader'
					}, {
						loader: 'css-loader',
						options: {
							/* modules: true, // 指定启用css modules
						   // 指定css的hash类名格式
							localIdentName: '[name]__[local]--[hash:base64:5]', */
							modules: {
								localIdentName: '[path][name]__[local]--[hash:base64:5]'
							}
						}
					},
					{
						loader: "postcss-loader"
					}
				],
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin('版权所有，翻版必究'),
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
		}),
		new webpack.HotModuleReplacementPlugin()//热加载插件
	]
}
//	“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。