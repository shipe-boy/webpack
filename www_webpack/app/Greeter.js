//引入react后jsx写法
import React,{Component} from 'react'
import config from './config.json'

import styles from './greeter.css'	//测试css module

class Greeter extends Component{
	render(){
		return (
			<div className={styles.app}>{config.text}</div>
		)
	}
}

export default Greeter




//原写法
/* const config = require('./config.json')
module.exports = function(){
	var div = document.createElement('div');
	div.innerHTML = config.text
	return div
} */