//引入css模块打包工具，将css打包成一个文件后引入页面中
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//压缩打包后的css文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//自动生成html，自动引入打包后的js、css
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',	//打包后大代码不会被压缩，否则默认是生产环境，代码会压缩
	// entry: './src/index.js'	,//打包的入口文件
	entry: {	//多个入口，属性名可任意，代表打包的chunk名（块名）
		a: './src/a.js',
		b: './src/b.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: 'js/[name].js'
	},
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
				'postcss-loader',	//兼容前缀
			]
		}]
	},
	plugins: [
		//希望打包后生成a.html和b.html，同时引入对应的js和css
		new HtmlWebpackPlugin({
			filename: 'a.html',	//生成的文件名字
			template: './index.html', //以根目录的index.html为模板
			chunks: ['a']	,//对应多入口块名，即键名
			// inject: false,	//不能自动注入才能设置title
			// title: '我是a页面'	,//支持ejs语法，动态设置页面title
			// date: new Date()
		}),
		new HtmlWebpackPlugin({
			filename: 'b.html',	//生成的文件名字
			template: './index.html', //以根目录的index.html为模板
			chunks: ['b']	,//对应多入口块名，即键名
			inject: false,
			title: '我是b页面'	//支持ejs语法，动态设置页面title
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		}),
		new OptimizeCssAssetsPlugin()
	],
	devServer: {
		open: false,	//是否自动打开浏览器
		port: 8080,	//监听的端口
		contentBase: './dist',	//默认可访问的资源是根目录下所有，也可以设置可访问资源的路径
		//前台 8080端口  后台 3000 端口
		/* proxy:{
			'/user':'http://localhost:3000'
		} */
		proxy:{	//前端接口：/api/user      后端接口：/api/user,可以配置pathRewrite
			'/api':{
				target: 'http://localhost:3000',
				pathRewrite: {'/api': ''}	//重写路径	后台配置就直接是'/user'
			}
		}
		// before(app){
		// 	app.get('/user', (req, res) => {
		// 		res.send({
		// 			name: '哈哈哈'
		// 		})
		// 	})
		// }
	}
}