//创建一个本地的服务，测试webpack-dev-server 的跨域请求
//前面我们了解到 webpack是基于node的   webpack-dev-server是基于express的

const express = require('express')

//引入webpack和webpack-dev-middleware
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
//引入webpack配置文件
const config = require('./webpack.config.js')
const compiler = webpack(config);


const app = express();

//使用webpack中间件
app.use(
  middleware(compiler)
);

//
app.get('/user',(req,res)=>{
	res.send({
		name: '哈哈哈'
	})
})




app.listen('3000', ()=>{
	console.log('3000端口已经启动！')
})






















