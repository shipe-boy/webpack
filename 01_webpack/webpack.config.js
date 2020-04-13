//webpack的运行环境是node，但他不仅可以解析import导入导出，也可以解析module.export导入导出
//怎么看在node环境中呢，打印__dirname、__filename，等node的常量
module.exports = {
	mode: 'development',	//打包后大代码不会被压缩，否则默认是生产环境，代码会压缩
	entry: './src/index.js'	,//打包的入口文件
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	}
}