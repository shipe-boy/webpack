# 一、初识webpack

## 1.1、webpack的下载和查看

全局下载或项目中下载

项目中下载查看方式：npx webpack -v 查看非全局装的webpack版本号

## 1.2、文件的引入方式

### 1.2.1、es6导入导出规范 ESModule

**参考：**<https://www.jianshu.com/p/e0427839f5e2> 

**导出：**

```
// good
export var firstName = 'Michael';
// bad
export 1; // 报错；因为没有提供对外的接口，两种错误其实都是因为直接导出值了
```

```
// good
var year = 1958;
export {year};
// bad
var m = 1;
export m; // 报错；因为没有提供对外的接口，两种错误其实都是因为直接导出值了
```

```
// good
export function multiply(x, y) {
  return x * y;
};
// bad
function f() {}
export f; // 报错；因为没有提供对外的接口，两种错误其实都是因为直接导出值了
```

```
// good
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
// bad
function foo() {
  export default 'bar' // SyntaxError
}
foo()
// 这种错误是因为export命令必须处于模块顶层才可以，也就是不能出现在代码块里面，这里涉及到import的编译时加载原理
```

**导入：**

```
import {a} from './a.js'	//命名导出的，即export
import b from './b.js'	//默认导出的，即export default

```

### 1.2.2、node导入导出规范 CommonJs

**参考：**<https://segmentfault.com/a/1190000007758631> 

**导出：**

```
//a.js
const a = "我是一段字符串"
const str = "12345678"
module.exports = {a,str}

//b.js
const b = [1, 2, 3]
exports.b = b
```

导入：

```
const a = require('./a.js')	
//默认导出的，即module.exports
//{a: "我是一段字符串",str: "12345678"}

const {b} = require('./b.js')	//默认导出的，即exports 
```

## 1.3、webpack运行环境

webpack的运行环境是node，但他不仅可以解析import导入导出，也可以解析module.export导入导出
怎么看在node环境中呢，打印____dirname、__filename，等node的常量

```
module.exports = {
	mode: 'development',	//打包后大代码不会被压缩，否则默认是生产环境，代码会压缩
	entry: './src/index.js'	,//打包的入口文件
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	}
}
```



# 二、loaders

## 2.1、图片打包

**loader：** url-loader、file-loader

一般使用url-loader，如果url-loader设置了options的limit限制打包图片大小时超过的图片要用file-loader

```
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
			}
		]
	}
```

## 2.2、css打包，插件中会介绍添加兼容前缀

1. css-loader：解析css，解析后是一个数组["./src/index.css","body{background-color: antiquewhite;}",""]
2. style-loader ：将css-loader生成了css取出来，生成一个style标签，插入页面中



**注：**打包时loader执行顺序是从右到左或从下到上



**扩展：**

npm i 安装其他
	less-loader 处理less文件 
	less  能写less代码



# 三、插件（plugins）

## 3.1、css添加兼容前缀

**下载：**

```

```

**配置：**

1.webpack.config.js

```
module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader', 'postcss-loader']	
			}
		]
	}
```

2.根目录新增postcss.config.js，后匹配

```
module.exports = {
    plugins: [
      require('autoprefixer')
    ]
}
//无效时：
module.exports = {
    plugins: [
        require('autoprefixer')({
            "browsers": [
                "defaults",
                "not ie < 11",
                "last 2 versions",
                "> 1%",
                "iOS 7",
                "last 3 iOS versions"
            ]
        })
    ]
};
```

参考： <https://www.cnblogs.com/hellowoeld/p/10571792.html> 

## 3.2、css作为link引入

之前的style-loader是将css作为style标签嵌入到页面中的，我们也可以将css打包成一个文件在link引入。（npm中看）

**安装：**

npm install --save-dev mini-css-extract-plugin 

**使用：**

```
//引入
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 
module.exports = {
	//...
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            }
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [	//使用插件
		new MiniCssExtractPlugin({
			filename: '[name].css'	//配置文件名
		})
	]
};
```

虽然打包成了单独css文件，但是你要手动的载页面中引入，后面我们会介绍更方便的方法。

## 3.3、压缩css代码

**插件：**optimize-css-assets-webpack-plugin （npm查看）

**安装：**

```
npm install --save-dev optimize-css-assets-webpack-plugin
```

**使用：**

```
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  module: {
    rules: [
      //...
    ]
  },
  plugins: [	//插件的引入部分先后顺序
    //...
    new OptimizeCssAssetsPlugin({	//直接new就可以，不用传参数
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    })
  ]
};
```

## 3.4、自动生成html，并且引入打包后的js和css

**插件：**html-webpack-plugin（npm看）（该插件支持ejs注入，查看下节）

**安装：**

```
npm i --save-dev html-webpack-plugin
```

**配置：**

```
const HtmlWebpackPlugin = require('html-webpack-plugin')
 
module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    //new HtmlWebpackPlugin(), // Generates default index.html
    new HtmlWebpackPlugin({  // Also generate a test.html
			filename: 'index.html',	//生成的文件名字
			template: './index.html'	,//以根目录的index.html为模板
			//inject: true  //默认生成的js、css资源注入，
			minify: {
				collapseWhitespace: true,	//是否压缩生成后的html，默认false
				removeComments: true,	//是否去掉注释，默认false
				// removeRedundantAttributes: true,
				// removeScriptTypeAttributes: true,	//是否去掉ScriptType
				// removeStyleLinkTypeAttributes: true,	//是否去掉LinkType
				// useShortDoctype: true
			}
		})
  ]
}
```

## 3.5、打包时清空先前打包的文件夹

**安装：**

```
npm install --save-dev clean-webpack-plugin
```

**使用：**

```
//引入
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
 
 //使用
const webpackConfig = {
    plugins: [
        new CleanWebpackPlugin(),
    ],
};
```

## 3.6、在模块中（js文件中）注入全局变量

webpack内置的，不需要另下插件。（可在webpack官网，插件，DefinePlugin）

**使用：**

```
//引入webpcak
const webpack = require('webpack')

new webpack.DefinePlugin({
	//要引入的全局变量 形式  API: '变量'
	 API11: JSON.stringify(API),	//官网中例子，API可外部引入
	API1: "'http://loaclhost:3000'"// 或者：引号中为变量
})

```



# 四、多页打包和热更新

## 4.1、多页打包

​	以对象形式设置多个入口文件

​	多次用new HtmlWebpackPlugin插件生成多个html，配置chunks引入对应js和css

```
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
			inject: false,	//不能自动注入才能设置title
			title: '我是a页面'	,//支持ejs语法，动态设置页面title
			date: new Date()
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
	]
}
```

**注：**关于new HtmlWebpackPlugin中配置ejs语法

配置了ejs就不能自动注入打包的js和css了

配置：只有inject为false，不自动注入，才能使用ejs语法

```
new HtmlWebpackPlugin({
			filename: 'a.html',	//生成的文件名字
			template: './index.html', //以根目录的index.html为模板
			chunks: ['a']	,//对应多入口块名，即键名
			inject: false,	//不能自动注入才能设置title
			title: '我是a页面'	,//支持ejs语法，动态设置页面title
			date: new Date()
		}),
```

页面引入：

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title><%= htmlWebpackPlugin.options.title %></title>
	</head>
	<body>
		参考模板
		<%= htmlWebpackPlugin.options.date %>
	</body>
</html>
```

vue脚手架3中有用到

## 4.2、热更新

**安装：**

```
npm i webpack-dev-server -D
```

**配置：**

新加devServer配置选项

```
devServer: {
		open: false,	//是否自动打开浏览器
		port: 8080,	//监听的端口
		contentBase: './dist',	//默认可访问的资源是根目录下所有，也可以设置可访问资源的路径
		proxy:{
			'/user':'http://localhost:3000'
		}
		/* proxy:{	//前端接口：/api/user      后端接口：/api/user,可以配置pathRewrite
			'/api'{
				target: 'http://localhost:3000',
				pathRewrite: {'/api': ''}	//重写路径	后台配置就直接是'/user'
			}
		} */
	}
```

注： webpack是基于node的，开启的端口服务是用express来搭建本地端口服务的，去node_module里可以找到express。

**启动：**

```
npx webpack-dev-server
```

注： 也可以在package.json中配置启动命令

**配置跨域：**

webpack-dev-server是基于express构建的，我们在根目录下创建server.js搭建本地3000端口服务，在a.js中发起请求。

webpack.config.js中配置跨域：

前台： 8080端口		后台： 3000端口

```
devServer: {
		open: false,	//是否自动打开浏览器
		port: 8080,	//监听的端口
		contentBase: './dist',	//默认可访问的资源是根目录下所有，也可以设置可访问资源的路径
		proxy:{	//跨域配置
			'/user':'http://localhost:3000'
		}
		/* proxy:{	//前端接口：/api/user      后端接口：/api/user,可以配置pathRewrite
			'/api'{
				target: 'http://localhost:3000',
				pathRewrite: {'/api': ''}	//重写路径	后台配置就直接是'/user'
			}
		} */
	}
```

另一种方式：

直接在当前地址下配置接口：

```
devServer: {
		open: false,	//是否自动打开浏览器
		port: 8080,	//监听的端口
		contentBase: './dist',	//默认可访问的资源是根目录下所有，也可以设置可访问资源的路径
		//前台 8080端口  当前地址下配置请求
		before(app){
			app.get('/user', (req, res) => {
				res.send({
					name: '哈哈哈'
				})
			})
		}
	}
```

## 4.3、node环境中启动webpack

插件：

```
npm install webpack-dev-middleware --save-dev
```

配置：

```
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

//监听的路由
app.get('/user',(req,res)=>{
	res.send({
		name: '哈哈哈'
	})
})




app.listen('3000', ()=>{
	console.log('3000端口已经启动！')
})

```

之后node运行文件时会自动运行webpack。端口是你node运行的端口，不再是webpack中配置的端口了

# 五、babel配置

## 5.1、babel

官网中有详细的配置流程：<https://www.babeljs.cn/setup#installation> 

打包后可以运行，但是比如数组的map方法，还是[].map，这样在（IE）低版本浏览器中没有该方法。

解决：（官网中搜索polyfill）

​	安装	npm install --save @babel/polyfill 

​	使用： 	import "@babel/polyfill"; （在js中引入，或者require("@babel/polyfill"); ）

babel/polyfill 填充高版本js语法，他将所有es6语法都用es5改写了。打包后代码体积会变很大。

​	优化： 配置.babelrc中的presets选项，进行按需引入

​		官网找presets写成数组来配置选项，然后配置targets运行的浏览器（官网搜targets）

```
{
  "presets": [
		["@babel/preset-env", {	//配置项
	        "targets": {
				"chrome": "75"，
    			"ie": "11"
	        }
		}]
  ]
}
```

​		想要targets生效，还需要配置`useBuiltIns`（官网搜）

```
{
  "presets": [
		["@babel/preset-env", {	
	        "targets": {
				"chrome": "75"
	        },
			"useBuiltIns": "usage"	// 选项： "entry"  false  "usage"
		}]
  ]
}
```

## 5.2、区分打包环境

### 一、文件分离

​	webpcak.base.js		//基础的打包配置

​	webpack.dev.js		//开发环境中的打包配置

​	webpack.pro.js		//生产环境中的打包配置

### 二、使用插件

​	**安装：**

```
npm i webpack-merge -D
```

​	**配置：**

```
//引入插件，融合两个webpack配置文件
const merge = require('webpack-merge')

//引入基础配置
const baseConfig = require('./webpack.base.js')

//生产环境的配置
const proConfig = {
	mode: 'production',	//打包后大代码不会被压缩，否则默认是生产环境，代码会压缩
}
module.exports = merge(baseConfig, proConfig)
```

### 三、打包

之前打包会去找webpack.config.js，现在没有了，如何打包呢？

更改package.json， --config 文件名

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.pro.js",
    "dev": "webpack-dev-server --config webpack.dev.js"
  },
```

