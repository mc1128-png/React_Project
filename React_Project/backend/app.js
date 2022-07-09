require('dotenv').config({path: '.env'})
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const app = express()
const initDB = require('./src/init/initDB')
const initServer = require('./src/init/initServer')
const initRoute = require('./src/init/initRoute')
const noMatchMiddleWare = require('./src/middleware/noMatchMiddleWare')
const errorMiddleWare = require('./src/middleware/errorMiddleWare')

// let bodyParser = require("body-parser")
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: false}));
//
// // parse application/json
// app.use(bodyParser.json());

// 中间件 跨域
app.use(cors())

// 内置body-parser

// json 数据解析
app.use(express.json())

// http请求日志
app.use(morgan('tiny')) // 最小限度输出

// 路由模块化,先挂载再启动
initRoute(app)

// 静态服务
app.use(express.static('public'))

// 404处理中间件
app.use(noMatchMiddleWare)

// 统一错误处理中间件
// 1）定义统一错误 2）统一处理错误
// 错误中间处理
app.use(errorMiddleWare)

// 先连接数据库在初始化服务
const main = async () => {
    await initDB()
    await initServer(app)
}
main()