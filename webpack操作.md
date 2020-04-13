# 一、webpack操作指南

详细指南：https://segmentfault.com/a/1190000006178770

不同版本命令不太一样：<https://segmentfault.com/a/1190000006178770> 

​		其对应项目：www.webpack

# 二、webpack的全局引入

```
$ npm i webpack -g
$ npm i webpack-cli -g


//可使用 npx webpack -v 查看非全局装的webpack版本号，下面的非全局都可以用npx代替
```



# 三、webpack打包命令

## 3.1、通过终端命令打包

```
# {extry file}出填写入口文件的路径，本文中就是上述main.js的路径，
# {destination for bundled file}处填写打包文件的存放路径
# 填写路径的时候不用添加{}
webpack {entry file} {destination for bundled file}


//应用的是项目中的webpack，也可以用全局的webpack
// webpack2的命令
node_modules/.bin/webpack app/main.js common/index.js 
// webpack4的命令
node_modules/.bin/webpack app/main.js -o common/index.js
```



##3.2、通过配置文件打包

根目录下新增webpack.config.js

```
// webpack2的配置
module.exports = {
    entry:  __dirname + "/app/main.js", // 之前提到的唯一入口文件
    output: {
        path: __dirname + "/public", // 打包后的文件存放的地方
        filename: "bundle.js" // 打包后输出文件的文件名
    }
} 

// webpack4的配置
module.exports = {
    // webpack4需要添加这个配置，development为开发环境，production为生产环境
    mode: "development",
    entry:  __dirname + "/app/main.js", // 之前提到的唯一入口文件
    output: {
        path: __dirname + "/public", // 打包后的文件存放的地方
        filename: "bundle.js" // 打包后输出文件的文件名
    }
}
//	“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
```

只需在终端里运行`webpack(非全局安装需使用node_modules/.bin/webpack)`命令就可以了，这条命令会自动引用`webpack.config.js`文件中的配置选项 

### 3.2.1一种简便方法

​	直接在package.json中配置启动

​	"start": "webpack"

![1585643935516](C:\Users\shipe\AppData\Local\Temp\1585643935516.png)

​	然后直接在命令行	npm start 打包



# 四、生成Source Maps（使调试更容易）

通过简单的配置，`webpack`就可以在打包时为我们生成的`source maps`，这为我们提供了一种对应编译文件和源文件的方法，使得编译后的代码可读性更高，也更容易调试。 

在`webpack`的配置文件中配置`source maps`，需要配置`devtool`，它有以下四种不同的配置选项，各具优缺点，描述如下： 

| devtool选项                  | 描述                                                         |
| ---------------------------- | :----------------------------------------------------------- |
| source-map                   | 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是会减慢打包速度； |
| cheap-module-source-map      | 在一个单独文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使的浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便； |
| eval-source-map              | 使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的source map，但是对打包后输出的js文件的执行具有性能和安全隐患。在开发阶段是一个非常好的选项，在生产阶段则一定不要启用这个选项。 |
| cheap-module-eval-source-map | 这是在打包文件时最快生成source map的方法，生成的source map会和打包后的JavaScript文件同时显示，没有列映射，和eval-source-map选项具有相似的缺点。 |

注：正如上表所述，上述选项由上到下打包速度越来越快，不过同时也具有越来越多的负面作用，较快的打包速度的后果就是对打包后的文件的的执行有一定影响。 

对小到中型的项目中，`eval-source-map`是一个很好的选项，再次强调你只应该开发阶段使用它，我们继续对上文新建的`webpack.config.js`，进行如下配置: 

```
module.exports = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  }
}
```

`cheap-module-eval-source-map`方法构建速度更快，但是不利于调试，推荐在大型项目考虑时间成本时使用。 

# 五、构建本地服务器（热更新）

如果想让你的浏览器监听你的代码的修改，并自动刷新显示修改后的结果，那你就需要单独安装它作为项目依赖。 

```
npm install webpack-dev-server -g // 全局安装
npm install webpack-dev-server --save-dev // 项目内安装   此练习是在根目录下安装
```

**webpack-dev-server:**

- 是一个小型的node.js  express服务器
- 新建一个开发服务器，可以serve我们pack以后的代码，并且当代码更新的时候自动刷新浏览器
- 启动webpack-dev-seerver后，你在目标文件夹中看不到编译后的文件，实时编译后的文件都保存到了内存当中
- 注：如果要全局装这个命令，那么在全局装完webpack之后就可以执行这个命令，如果只是装到项目中，在项目跟目录下安装（不加-g，在项目根目录出现node_modules文件夹，内含webpack-dev-server及其依赖包）

**devserver作为webpack配置选项中的一项，以下是它的一些配置选项** 

| 配置选项           | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| contentBase        | 默认webpack-dev-server会为跟文件提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“common”目录） |
| port               | 设置默认监听端口，如果省略，默认为“8080”                     |
| inline             | 设置为true，当源文件改变时会自动刷新页面                     |
| historyApiFallback | 在开发单页应用时非常有用，它依赖于HTML5  history  API，如果设置为true，所有的跳转将指向index.html |

注：当使用 [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History) 时，任意的 `404` 响应都可能需要被替代为 `index.html`。 

把这些命令加到webpack的配置文件中，现在的配置文件`webpack.config.js`如下所示 ：

```
module.exports = {
  devtool: 'eval-source-map',

  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },

  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  } 
}
```

在`package.json`中的`scripts`对象中添加如下命令，用以开启本地服务器： 

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack",
    "server": "webpack-dev-server --open"
  },
  
  
   **2.0版本**
  "devDependencies": {
    "webpack": "^3.5.6", 
    "webpack-dev-server": "^2.5.1"
  }
  **4.0版本**
  "devDependencies": {
    "webpack": "^4.29.5",
    "webpack-cli": "^3.2.3",
    "webpack-dev-server": "^3.1.14"
  }
```

**注意：`webpack`版本与`webpack-dev-server`版本有兼容，注意查看版本号。 

在终端中输入`npm run server`即可在本地的`8080`端口查看结果 ，运行后会自动打开浏览器，在js中改变就会热更新

# 六、Loaders

通过使用不同的`loader`，`webpack`有能力调用外部的脚本或工具，实现对不同格式的文件的处理，比如说分析转换scss为css，或者把下一代的JS文件（ES6，ES7)转换为现代浏览器兼容的JS文件，对React的开发而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件。

Loaders需要单独安装  

```
npm install --save-dev babel-loader
// webpack4.0需要安装npm install --save-dev babel-loader@7
```

配置要在`webpack.config.js`文件中`modules`关键字下配置。 配置项如下： 

- test：一个用以匹配loaders所处理文件的扩展名的正则表达式（必须）
- loader：loader的名称（必须）
- include/exclude：手动添加必须处理的文件（文件夹）或屏蔽不需要处理文件（文件夹）（可选）
- query：为loaders提供额外的设置选项（可选）

在看如何具体使用loader之前我们先看看Babel是什么？ 

# 七、Babel

Babel其实是一个编译JavaScript的平台，它可以编译代码帮你达到以下目的：

- 让你能使用最新的JavaScript代码（ES6，ES7...），而不用管新标准是否被当前使用的浏览器完全支持；
- 让你能使用基于JavaScript进行了拓展的语言，比如React的JSX；

## 7.1Babel的安装与配置

### 7.1.1  安装

Babel其实是几个模块化的包，其核心功能位于称为`babel-core`的npm包中，webpack可以把其不同的包整合在一起使用，对于每一个你需要的功能或拓展，你都需要安装单独的包（用得最多的是解析Es6的`babel-env-preset`包和解析JSX的`babel-preset-react`包）。

```
npm install --save-dev babel-core
npm install --save-dev babel-preset-env
npm install --save-dev babel-preset-react
//或者一起装，npm一次性安装多个依赖模块，模块之间用空格隔开
npm install --save-dev babel-core babel-preset-env babel-preset-react
```

 ### 7.1.2  配置

先来看下在`webpack.config.js`文件中配置如下： 

```
module.exports = {
    ...
    module: { // 这里配置Bobal
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    }
}
```

 当然这样配置是完全没错的，但是在正式项目中需要在`webpack.config.js`文件中配置很多项配置，这样就使得这个文件有特别多配置，从而使得这个配置文件会特别复杂，因此为了使这个文件配置变得稍微简单点，一些开发者支持把babel的配置选项放在一个单独的名为 ".babelrc" 的配置文件中，webpack会自动调用.babelrc里的babel配置选项。
 接下来我们在来修改配置文件

 **第一步** 在项目根目录创建`.babelrc`如下： 

 **第二步** 在`.babelrc`中配置babel 。env是 babel-preset-env 将ES6的代码转为ES5 ，presets里的“env” 是模块名称，作为第一个参数，第二个参数是该模块的传入参数。 在.babelrc中先后不一样。

```
{
  "presets": ["react", "env"]
}
```

 **第三步** 修改`webpack.config.js` 

```
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            }
        ]
    }
}
```

在配置Babel过程中大家有没有注意到`react`，大家想到了什么，没错就是安装react，我们要先安装react才能用ES6以及JSX语法。 

```
npm install --save react react-dom
```

**第四步** 修改`Greeter.js`，让他以组件形式返回 。修改main.js，渲染组件。

 **第五步** 重新使用`npm start`打包，并且使用`npm run server`启动本地服务，如果之前打开的本地服务器没有关闭，你应该可以在localhost:8080下看到与之前一样的内容，这说明react和es6被正常打包了。

 # 八、模块化处理

 webpack可以将不同的文件都按照模块的方式进行处理，比如js，css等都可以通过不同的loader进行打包处理。

## 8.1.1、css

webpack为我们提供`css-loader`和 `style-loader`两个工具来处理样式表，他们二者处理的任务是不同的。
 `css-loader`使你能够使用类似@import 和 url(...)的方法实现 require()的功能。
 `style-loader`将所有的计算后的样式加入页面中。
 这二者组合在一起可以使你能够把样式表嵌入webpack打包后的JS文件中。

 **安装：**

```
npm install --save-dev css-loader
npm install --save-dev style-loader
```

 **配置：**

```
module.exports = {
    ...
    module: {
        rules: [
           ...
           { // 这里配置这两个工具
                test: /\.css$/,
                exclude: /node_modules/,
                use: [ // 请注意这里对同一个文件引入多个loader的方法。
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    }

```

 **通常情况下，css会和js打包到同一个文件中，并不会打包为一个单独的css文件，不过通过合适的配置webpack也可以把css打包为单独的文件的。**

***<u>注：loader的执行顺序</u>***

1、一般情况下，loader的执行顺序为从右往左，从下往上。
2、可以通过enforce属性去改变执行顺序。

- enforce:‘pre’ 前置 权重最高
- enforce:‘normal’ 不变 权重第二
- enforce:‘inline’ 行内 权重第三
- enforce:‘post’ 后置 权重第四

```
rules:[
{
 test:/\.js$/,
 use:{
  loader:'loader3'
 },
 enforce:'pre'	//直接控制先后
}]
```



 ## 8.1.2、CSS module

CSS的规则都是全局的，任何一个组件的样式规则，都对整个页面有效，那么如果我们设置的相同class名称较多的时候，那么可想而知页面会从在声明现象，用一个比较官方的词就是它会造成全局污染。
 `CSS module`功能就是将JS的模块化思想带入CSS中来，通过CSS模块，所有的类名，动画名默认都只作用于当前模块，这样做有效避免了全局污染。

我们在app文件夹下创建一个`Greeter.css`文件来进行一下测试 ，导入`.root`到Greeter.js中 （react导入方法）

```
import React, {Component} from 'react';
import config from './config.json';
import styles from './Greeter.css';//导入，react一定要这么做

class Greeter extends Component{
  render() {
    return (
      <div className={styles.root}> //使用cssModule添加类名的方法
        {config.greetText}
      </div>
    );
  }
}

export default Greeter
```

vue中导入方法： <https://vue-loader-v14.vuejs.org/zh-cn/features/css-modules.html> 

接下来我们在来改动下`webpack.config.js`配置文件 ：

```
module.exports = {

    ...

    module: {
        rules: [
            ...
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                          /* modules: true, // 指定启用css modules
                           // 指定css的hash类名格式
                            localIdentName: '[name]__[local]--[hash:base64:5]'*/
                            //新写法
                            modules: {
								localIdentName: '[path][name]__[local]--[hash:base64:5]'
							}
						}
                        }
                    }
                ]
            }
        ]
    }
}
```

 ## 8.1.3、CSS预处理器

`Sass`和 `Less`之类的预处理器是对原生CSS的拓展，它们允许你使用类似于`variables`,`nesting`,`mixins`,`inheritance`等不存在于CSS中的特性来写CSS，CSS预处理器可以这些特殊类型的语句转化为浏览器可识别的CSS语句。

 **以下是常用的CSS 处理`loaders`** 

- `Less Loader`
- `Sass Loader`
- `Stylus Loader`

 不过其实也存在一个CSS的处理平台`-PostCSS`，它可以帮助你的CSS实现更多的功能，在其[官方文档](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fpostcss%2Fpostcss)可了解更多相关知识。 

举例来说如何使用PostCSS，我们使用PostCSS来为CSS代码自动添加适应不同浏览器的CSS前缀 

**第一步** 安装`postcss-loader` 和 `autoprefixer`（自动添加前缀的插件） 

```
npm install --save-dev postcss-loader
npm install --save-dev autoprefixer
```

 **第二步** 在根目录新建`postcss.config.js`并添加如下代码 

```
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```

 **第三步** 在`webpack.config.js`中配置loader 

```
module.exports = {

    ...

    module: {
        rules: [
            ...
            {
                test: /\.css$/,
                use: [
                    ...
                    {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    }
}
```

 **最后** 重新使用`npm start`打包，你写的css会自动根据Can i use里的数据添加不同前缀了。 

# 九、插件（Plugins）

Webpack有很多内置插件，同时也有很多第三方插件，可以让我们完成很多丰富的功能。
 如果我们需要在webpack中引入插件时，首先我们需要`npm/cnpm`安装需要的插件(内置插件不用安装)，其次要在webpack配置文件`webpack.config.js`中的plugins关键字部分添加该插件的一个实例去配置这个插件，需要注意的是：“plugins是一个数组”

 插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。

 Loaders和Plugins常常被弄混，但是他们其实是完全不同的东西，可以这么来说，loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用。 

## 9.1、使用插件的方法

 要使用某个插件，我们需要通过`npm`安装它，然后要做的就是在webpack配置中的plugins关键字部分添加该插件的一个实例（plugins是一个数组）继续上面的例子，我们添加了一个给打包后代码[添加版权声明的插件](https://webpack.js.org/plugins/banner-plugin/)。 

```
const webpack = require('webpack');

module.exports = {
...
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究')
    ],
};
```

打包后：

![1586244230849](C:\Users\shipe\AppData\Local\Temp\1586244230849.png)

 ## 9.2、webpack插件，几个常用的插件 

 ### 9.2.1、HtmlWebpackPlugin

这个插件的作用是依据一个简单的`index.html`模板，生成一个自动引用你打包后的JS文件的新`index.html`。这在每次生成的js文件名称不同时非常有用（比如添加了`hash`值）。 

**安装** 

```
npm install --save-dev html-webpack-plugin
```

 这个插件自动完成了我们之前手动做的一些事情，在正式使用之前需要对一直以来的项目结构做一些更改： 

1. 移除public文件夹，利用此插件，`index.html`文件会自动生成，此外CSS已经通过前面的操作打包到JS中了。

2. 在app目录下，创建一个`index.tmpl.html`文件模板，这个模板包含`title`等必须元素，在编译过程中，插件会依据此模板生成最终的html页面，会自动添加所依赖的 css, js，favicon等文件，`index.tmpl.html`中的模板源代码如下：

   ```
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="utf-8">
       <title>Webpack Sample Project</title>
     </head>
     <body>
       <div id='root'>
       </div>
     </body>
   </html>
   ```

 3.更新`webpack`的配置文件，方法同上,新建一个`build`文件夹用来存放最终的输出文件 

```
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        })
    ],
};
```

 再次执行`npm start`你会发现，build文件夹下面生成了`bundle.js`和`index.html`。 

### 9.2.2、Hot Module Replacement

`Hot Module Replacement`（HMR）也是webpack里很有用的一个插件，它允许你在修改组件代码后，自动刷新实时预览修改后的效果。 

在webpack中实现HMR也很简单，只需要做两项配置 

1. 在webpack配置文件中添加HMR插件；
2. 在Webpack Dev Server中添加“hot”参数；

不过配置完这些后，JS模块其实还是不能自动热加载的，还需要在你的JS模块中执行一个Webpack提供的API才能实现热加载，虽然这个API不难使用，但是如果是React模块，使用我们已经熟悉的Babel可以更方便的实现功能热加载。 

整理下我们的思路，具体实现方法如下 

- `Babel`和`webpack`是独立的工具
- 二者可以一起工作
- 二者都可以通过插件拓展功能
- HMR是一个webpack插件，它让你能浏览器中实时观察模块修改后的效果，但是如果你想让它工作，需要对模块进行额外的配额；
- Babel有一个叫做`react-transform-hrm`的插件，可以在不对React模块进行额外的配置的前提下让HMR正常工作；

还是继续上例来实际看看如何配置 

```
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ],
};
```

配置Babel 

```
// .babelrc
{
  "presets": ["react", "env"],
  "env": {
    "development": {
    "plugins": [["react-transform", {
       "transforms": [{
         "transform": "react-transform-hmr",
         
         "imports": ["react"],
         
         "locals": ["module"]
       }]
     }]]
    }
  }
}
```

现在当你使用React时，可以热加载模块了,每次保存就能在浏览器上看到更新内容。 

# 十、产品阶段的构建

目前为止，我们已经使用webpack构建了一个完整的开发环境。但是在产品阶段，可能还需要对打包的文件进行额外的处理，比如说优化，压缩，缓存以及分离CSS和JS 。

对于复杂的项目来说，需要复杂的配置，这时候分解配置文件为多个小的文件可以使得事情井井有条，以上面的例子来说，我们创建一个`webpack.production.config.js`的文件，在里面加上基本的配置,它和原始的webpack.config.js很像，如下 ：

**因为development是开发环境，production是生产环境，开发环境的一些配置在生产环境中不需要，所以需要将以下配置项删除** 

```
devtool: 'eval-source-map'
devServer: {
    contentBase: "./common", // 本地服务器所加载的页面所在的目录
    historyApiFallback: true, // 不跳转
    inline: true, // 实时刷新
    hot: true // 在这里配置hot
}
```

修改后的配置如下 

```
// webpack.production.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "production", // 4.0版本需要配置这项，并且产品阶段需要把development改为production
    entry:  __dirname + "/app/main.js", // 之前提到的唯一入口文件
    output: {
        path: __dirname + "/common", // 打包后的文件存放的地方
        filename: "index.js" // 打包后输出文件的文件名
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            //new 一个这个插件的实例，并传入相关的参数
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.HotModuleReplacementPlugin() // 热加载插件
    ]
}
```



```
//package.json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack",
    "server": "webpack-dev-server --open",
    "build": "NODE_ENV=production webpack --config ./webpack.production.config.js --progress"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
...
  },
  "dependencies": {
    "react": "^15.6.1",
    "react-dom": "^15.6.1"
  }
}
```

**注意:**

- 如果是window电脑，build需要配置为`"build": "set NODE_ENV=production && webpack --config ./webpack.production.config.js --progress"`。
- 如果是Mac电脑，build可以直接配置为`"build": "NODE_ENV=production webpack --config ./webpack.production.config.js --progress"`。

### 10.2、优化插件

 webpack提供了一些在发布阶段非常有用的优化插件，它们大多来自于webpack社区，可以通过npm安装，通过以下插件可以完成产品发布阶段所需的功能 .

- `OccurenceOrderPlugin` :为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
-  `UglifyJsPlugin`：压缩JS代码（注意：webpack4已经不支持使用`webpack.optimize.UglifyJsPlugin`压缩配置了, 推荐使用 [optimization.minimize](https://links.jianshu.com/go?to=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foptimization%2F%23optimization-minimize) ）
-  `ExtractTextPlugin`：分离CSS和JS文件（注意：webpack4已经不支持使用`new ExtractTextPlugin("style.css")`这种方式了）

 `OccurenceOrder`和`UglifyJS plugins`都是内置插件，你需要做的只是安装其它非内置插件

 ***以下的配置只适用于webpack2，webpack4的配置请点击[这里**](https://webpack.docschina.org/concepts/) * 

```
npm install --save-dev extract-text-webpack-plugin
```

 在配置文件`webpack.production.config.js`中的`plugins`字段下配置如下： 

```
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    ...
    plugins: [
        ...
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(), 
        new ExtractTextPlugin("style.css") 
    ]
}
```

 **在说最后一遍注意：需要导入** 

此时执行`npm run build`可以看见被压缩后的代码

 ### 10.3、缓存

缓存无处不在，使用缓存的最好方法是保证你的文件名和文件内容是匹配的（内容改变，名称相应改变） 。

webpack可以把一个哈希值添加到打包的文件名中，使用方法如下,添加特殊的字符串混合体（[name], [id] and [hash]）到输出文件名前
 我们来修改`webpack.production.config.js`文件。

```
...
module.exports = {
    ...
    entry:  __dirname + "/app/main.js", // 之前提到的唯一入口文件
    output: {
        path: __dirname + "/common", // 打包后的文件存放的地方
        filename: "index-[hash].js" // 打包后输出文件的文件名
    },
    ...
}
```

#### 10.3.1 **clean-webpack-plugin**

添加了hash之后，会导致改变文件内容后重新打包时，文件名不同而内容越来越多，因此我们可以用`clean-webpack-plugin`。 

 **安装**

```
 npm install --save-dev clean-webpack-plugin
```

 同样需要在`webpack.production.config.js`文件中的`plugins`字段下配置 

```
...
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    ...
    plugins: [
        ...
        new CleanWebpackPlugin('common/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
}
```

 注意：上面的clean-webpack-plugin配置在`npm run build`时可能会报`clean-webpack-plugin only accepts an options object`错，意思是新版clean-webpack-plugin只接受options一个对象，解决办法是将参数全部删除掉，不传参数。

```
new CleanWebpackPlugin()
```

 **每次打包都会清除之前的打包文件然后重新去生成打包文件** 

关于`clean-webpack-plugin`的详细使用可参考[这里](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fjohnagan%2Fclean-webpack-plugin) 

 



# 十一、webpack常见错误

参考地址：<https://www.cnblogs.com/jinzhaozhao/p/10006131.html> 

## 一、mode警告

![1585627510602](C:\Users\shipe\AppData\Local\Temp\1585627510602.png)

解决方法：在package.json中的script里新增

​	"dev": "webpack --mode development",
	"build": "webpack -mode production"

运行时：node_modules/.bin/webpack {入口} -o {打包后} --mode development

![1585627595176](C:\Users\shipe\AppData\Local\Temp\1585627595176.png)