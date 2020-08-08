const babel = require('@babel/core')
const loaderUtils = require('loader-utils')


//es6解析成es5
function loader(source){
	//解决异步执行，返回值问题
	const callBack = this.async()
	
	//source  就是源码
	//this就是loader的上下文
	/* 
	this.query  ---  使用 loader-utils 中提供的 getOptions 方法 来提取给定 loader 的 option
	 1、如果这个 loader 配置了 options 对象的话，this.query 就指向这个 option 对象。
	 2、如果 loader 中没有 options，而是以 query 字符串作为参数调用时，this.query 就是一个以 ? 开头的字符串
	 */
	const options = loaderUtils.getOptions(this)
	//这是一个异步过程
	babel.transform(source, {
		presets: options.presets
	}, function(err, result){	//解析源码过程是异步，解析完成执行该回调
		// console.log(err, result.code)
		//返回值
		if (err) return callback(err);
		callBack(null,result.code)
	})
	
	//必须要返回值
	// return source
}




module.exports = loader