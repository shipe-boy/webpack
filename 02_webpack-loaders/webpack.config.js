//webpack的运行环境是node，但他不仅可以解析import导入导出，也可以解析module.export导入导出
//怎么看在node环境中呢，打印__dirname、__filename，等node的常量
module.exports = {
	mode: 'development',	//打包后大代码不会被压缩，否则默认是生产环境，代码会压缩
	entry: './src/index.js'	,//打包的入口文件
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	//处理各种要打包文件的规则
	module: {
		rules: [
			/* {
				test: /(\.png|\.jpg|\.gif)$/,
				use: ['url-loader']
			} */
			//配置loader其他选项时 use是数组 loader和options平级
			{
				test: /(\.png|\.jpg|\.gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {//使用该loader时使用的配置
							//limit: 8192	,//字节，也就是8K，小于8K解析成base64，大于则处理成图片多一次请求，大于了就需要file-loader，不用配置
							name: '[name].[ext]'//file-loader的配置，配置打包后的文件名. [name][hash:6].[ext]，hash后面冒号表示取的hash长度
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			}
		]
	}
}