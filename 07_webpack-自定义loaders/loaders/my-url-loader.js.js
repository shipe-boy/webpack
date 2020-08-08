
const loaderUtils = require('loader-utils')
const path = require('path')

//es6解析成es5
function loader(source){
	
	
	//获取limit
	const {limit} = loaderUtils.getOptions(this)
	
	//获取资源路径
	console.log(this.resourcePath)
	//获取文件后缀名
	const extname = path.extname(this.resourcePath).slice(1)
	
	// console.log(source.length)	//图片生成的buffer大小
	
	if(source.length < limit){	//打包成base64
		const base64 = source.toString('base64')	//buffer转base64
		
		/* 
			data:image/jpeg;base64,/9j/4AAQSkZJRg.......
		 
		 */
		return `module.exports = "data:image/${extname};base64,${base64})}"`
	}else{
		return require('./my-file-loader.js').call(this, source)
	}
	
}

//解析二进制文件需要配置
loader.raw = true


module.exports = loader