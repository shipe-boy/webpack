//图片打包： url-loader、file-loader
import imgUrl from './11.jpg'

let img = document.createElement('img');
img.src=imgUrl;
document.body.appendChild(img)


//css
import style from './index.css'

console.log(style)
/*
只使用css-loader：解析css
	后是一个数组["./src/index.css","body{background-color: antiquewhite;}",""]

还需要style-loader ：将css-loader生成了css取出来，生成一个style标签，插入页面中

npm i 安装其他
	less-loader 处理less文件 
	less  能写less代码
*/  


