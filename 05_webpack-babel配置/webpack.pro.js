//引入插件，融合两个webpack配置文件
const merge = require('webpack-merge')

//引入基础配置
const baseConfig = require('./webpack.base.js')

//生产环境的配置
const proConfig = {
	mode: 'production',	//打包后大代码不会被压缩，否则默认是生产环境，代码会压缩
}
module.exports = merge(baseConfig, proConfig)