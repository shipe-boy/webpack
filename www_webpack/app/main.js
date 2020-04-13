//原写法
// const Greeter = require('./Greeter.js')
// document.getElementById('app').appendChild(Greeter())


//es6和jsx新写法
import React from 'react'
import {render} from 'react-dom'

import Greeter from './Greeter.js'
import './main.css'

render(<Greeter />, document.getElementById('app'))

