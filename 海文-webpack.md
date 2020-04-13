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