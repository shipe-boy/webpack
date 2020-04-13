//可使用 npx webpack -v 查看非全局装的webpack版本号

//es6导入导出规范 ESModule
/* import {a} from './a.js'
import {b} from './b.js'

console.log(a,b) */


//node导入导出规范 CommonJs
const a = require('./a.js')
const {b} = require('./b.js')

console.log(a, b)

