import "@babel/polyfill";

import axios from 'axios'

/* const axios = () => import('axios')
import('axios') */

const a = 1;

class Person{
	constructor(name,age) {
	    this.name = name || "无名氏";
		this.age = age || 18;
	}
	sayInfo(){
		console.log(`我叫${this.name},今年${this.age}岁了！`)
	}
}
let person1 = new Person()
let person2 = new Person("哈哈", 20)
person1.sayInfo()
person2.sayInfo()

let str = "123456"

let fn = ()=>{
	console.log("箭头函数")
}

[1,2,3].map(item => {
	console.log(item)
})


console.log(API1)
console.log(API11)