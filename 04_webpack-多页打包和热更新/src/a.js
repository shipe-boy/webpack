
import './a.css'

import axios from 'axios'

//发起一个跨域的请求
axios.get('http://localhost:3000/user')
	.then((res)=>{
		console.log(res)
	})
	.catch(err => {
		conole.log(err)
	})

// axios.get('http://localhost:8080/user')
// 	.then((res)=>{
// 		console.log(res)
// 	})
// 	.catch(err => {
// 		conole.log(err)
// 	})

