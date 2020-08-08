
const loaderUtils = require('loader-utils')


//es6解析成es5
function loader(source){
	
	//生成图片名
	const fileName = loaderUtils.interpolateName(this, '[hash].[ext]', { content: source });
	
	
	//基于图片名生成图片
	// name: string, content: Buffer|string, sourceMap: {...}
	this.emitFile(fileName,source)
	
	
	
	//返回值要能在eval中执行，单是字符串是不行的
	//JSON.stringify(fileName)  返回的是一个空对象
	//需要module.exports将其导出
	return `module.exports = ${JSON.stringify(fileName)}`
}

//解析二进制文件需要配置
loader.raw = true


module.exports = loader