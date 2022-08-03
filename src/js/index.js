import data from '../data/webpack.txt'
import logo from '../img/logo.png'
import icon from '../img/icon.png'
// import '../css/style.css'
import '../scss/base.scss'
import User from './class/User.js'

document.body.insertAdjacentHTML('beforeend', `<p>${data}</p>`)
document.body.insertAdjacentHTML('afterbegin', `<img src="${logo}" alt="">`)
document.body.insertAdjacentHTML('beforeend', `<img src="${icon}" alt="">`)

const user = new User()
user.hello()
