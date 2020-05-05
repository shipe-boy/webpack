//引入插件，融合两个webpack配置文件
const merge = require('webpack-merge')

//引入基础配置
const baseConfig = require('./webpack.base.js')

//开发环境的配置
const devConfig = {
	mode: 'development',	//打包后大代码不会被压缩，否则默认是生产环境，代码会压缩
	devServer: {
		open: false,	//是否自动打开浏览器
		port: 8080,	//监听的端口
		contentBase: './dist',	//默认可访问的资源是根目录下所有，也可以设置可访问资源的路径
	}
}



module.exports = merge(baseConfig, devConfig)