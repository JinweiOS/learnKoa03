import Koa from 'koa'
import router from './src/router.js'
import { valid } from './src/middleware/valid.js'

// 1. server即为文档中的application对象
const server = new Koa()

// 一、验证用户是否合法
server.use(valid)

// 二、处理业务逻辑
server.use(router.routes()).use(router.allowedMethods())


server.listen(3000, '0.0.0.0', () => {
  console.log("Server is listening on http://127.0.0.1:3000")
})